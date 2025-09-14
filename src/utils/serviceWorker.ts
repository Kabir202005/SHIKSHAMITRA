// Service Worker registration and management utilities

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

export function registerSW() {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL('/', window.location.href)
    if (publicUrl.origin !== window.location.origin) {
      return
    }

    window.addEventListener('load', () => {
      const swUrl = '/sw.js'

      if (isLocalhost) {
        checkValidServiceWorker(swUrl)
        navigator.serviceWorker.ready.then(() => {
          console.log('SHIKSHA MITRA is ready for offline use')
        })
      } else {
        registerValidSW(swUrl)
      }
    })
  }
}

function registerValidSW(swUrl: string) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('SW registered: ', registration)
      
      registration.onupdatefound = () => {
        const installingWorker = registration.installing
        if (installingWorker == null) {
          return
        }
        
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content is available, please refresh.')
              // Show update available notification
              showUpdateAvailable()
            } else {
              console.log('Content is cached for offline use.')
              // Show offline ready notification
              showOfflineReady()
            }
          }
        }
      }
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error)
    })
}

function checkValidServiceWorker(swUrl: string) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type')
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        registerValidSW(swUrl)
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.')
    })
}

function showUpdateAvailable() {
  // Create a custom event for update available
  window.dispatchEvent(new CustomEvent('sw-update-available'))
}

function showOfflineReady() {
  // Create a custom event for offline ready
  window.dispatchEvent(new CustomEvent('sw-offline-ready'))
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister()
      })
      .catch((error) => {
        console.error(error.message)
      })
  }
}

// Request permission for push notifications
export async function requestNotificationPermission(): Promise<boolean> {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }
  return false
}

// Install app prompt handling
let deferredPrompt: any

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e
  // Show install button
  window.dispatchEvent(new CustomEvent('pwa-install-available'))
})

export async function installApp(): Promise<boolean> {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    deferredPrompt = null
    return outcome === 'accepted'
  }
  return false
}

// Background sync registration
export function registerBackgroundSync(tag: string): Promise<void> {
  return navigator.serviceWorker.ready.then((registration) => {
    return (registration as any).sync.register(tag)
  })
}

// Connection status monitoring
export function onConnectionChange(callback: (isOnline: boolean) => void) {
  window.addEventListener('online', () => callback(true))
  window.addEventListener('offline', () => callback(false))
  // Initial status
  callback(navigator.onLine)
}