import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { useLanguage } from '../contexts/LanguageContext'
import { useOffline } from '../contexts/OfflineContext'
import { installApp } from '../utils/serviceWorker'
import { 
  Download, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  X,
  CheckCircle
} from 'lucide-react'

export function InstallPrompt() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const { t } = useLanguage()
  const { isOnline } = useOffline()

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isInStandaloneMode = isIOS && (window.navigator as any).standalone
    
    setIsInstalled(isStandalone || isInStandaloneMode)

    // Listen for install prompt availability
    const handleInstallPrompt = () => {
      if (!isInstalled) {
        setShowInstallPrompt(true)
      }
    }

    window.addEventListener('pwa-install-available', handleInstallPrompt)
    
    // Show install prompt for rural users (always available)
    if (!isInstalled) {
      setTimeout(() => setShowInstallPrompt(true), 3000)
    }

    return () => {
      window.removeEventListener('pwa-install-available', handleInstallPrompt)
    }
  }, [isInstalled])

  const handleInstall = async () => {
    try {
      const installed = await installApp()
      if (installed) {
        setIsInstalled(true)
        setShowInstallPrompt(false)
      }
    } catch (error) {
      console.error('Installation failed:', error)
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    // Don't show again for this session
    sessionStorage.setItem('install-prompt-dismissed', 'true')
  }

  // Don't show if already dismissed this session
  if (sessionStorage.getItem('install-prompt-dismissed') === 'true') {
    return null
  }

  if (isInstalled || !showInstallPrompt) {
    return null
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <Card className="border-2 border-primary shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Install SHIKSHA MITRA</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-sm">
            Install our app for the best offline learning experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              <Download className="h-3 w-3 mr-1" />
              Offline Learning
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {isOnline ? (
                <Wifi className="h-3 w-3 mr-1" />
              ) : (
                <WifiOff className="h-3 w-3 mr-1" />
              )}
              Works Offline
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Rural Optimized
            </Badge>
          </div>
          
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Access lessons without internet</li>
            <li>• Faster loading and better performance</li>
            <li>• Save data with offline content</li>
            <li>• Get notifications for assignments</li>
          </ul>
          
          <div className="flex gap-2">
            <Button onClick={handleInstall} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Install App
            </Button>
            <Button variant="outline" onClick={handleDismiss}>
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function OfflineFeaturesBanner() {
  const { isOnline, hasOfflineData } = useOffline()
  const { t } = useLanguage()

  if (isOnline && !hasOfflineData) {
    return (
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Download className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-blue-900 dark:text-blue-100">
              Prepare for Offline Learning
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
              Download lessons now to continue learning even without internet. Perfect for rural areas with limited connectivity.
            </p>
            <Button size="sm" className="mt-2">
              <Download className="h-4 w-4 mr-2" />
              Download Content
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!isOnline) {
    return (
      <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <WifiOff className="h-5 w-5 text-orange-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-orange-900 dark:text-orange-100">
              You're Learning Offline
            </h3>
            <p className="text-sm text-orange-700 dark:text-orange-200 mt-1">
              {hasOfflineData 
                ? "Your downloaded content is available. Progress will sync when you're back online."
                : "Limited content available offline. Download lessons when you have internet."
              }
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}