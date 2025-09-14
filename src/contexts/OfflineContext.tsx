import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface OfflineContextType {
  isOnline: boolean
  hasOfflineData: boolean
  syncStatus: 'idle' | 'syncing' | 'success' | 'error'
  offlineStorage: OfflineStorageManager
  downloadProgress: { [key: string]: number }
  syncData: () => Promise<void>
  downloadContent: (contentId: string, contentType: 'video' | 'document' | 'course') => Promise<void>
  clearOfflineData: () => Promise<void>
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined)

class OfflineStorageManager {
  private dbName = 'shikshamitra_offline'
  private dbVersion = 1
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        
        // Create object stores
        if (!db.objectStoreNames.contains('videos')) {
          db.createObjectStore('videos', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('courses')) {
          db.createObjectStore('courses', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('assignments')) {
          db.createObjectStore('assignments', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('userProgress')) {
          db.createObjectStore('userProgress', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' })
        }
      }
    })
  }

  async save(storeName: string, data: any): Promise<void> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.put(data)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async get(storeName: string, id: string): Promise<any> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(id)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async getAll(storeName: string): Promise<any[]> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.getAll()
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async delete(storeName: string, id: string): Promise<void> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.delete(id)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async clear(storeName: string): Promise<void> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.clear()
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }
}

interface OfflineProviderProps {
  children: ReactNode
}

export function OfflineProvider({ children }: OfflineProviderProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [hasOfflineData, setHasOfflineData] = useState(false)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle')
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({})
  const [offlineStorage] = useState(() => new OfflineStorageManager())

  useEffect(() => {
    // Initialize offline storage
    offlineStorage.init().then(() => {
      checkOfflineData()
    })

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true)
      // Auto-sync when coming back online
      setTimeout(() => syncData(), 1000)
    }
    
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const checkOfflineData = async () => {
    try {
      const courses = await offlineStorage.getAll('courses')
      const videos = await offlineStorage.getAll('videos')
      setHasOfflineData(courses.length > 0 || videos.length > 0)
    } catch (error) {
      console.error('Error checking offline data:', error)
    }
  }

  const syncData = async () => {
    if (!isOnline) return
    
    setSyncStatus('syncing')
    try {
      // Simulate API sync - in real app, sync with backend
      const userProgress = await offlineStorage.getAll('userProgress')
      const assignments = await offlineStorage.getAll('assignments')
      
      // Here you would send data to your backend API
      console.log('Syncing progress:', userProgress)
      console.log('Syncing assignments:', assignments)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSyncStatus('success')
      setTimeout(() => setSyncStatus('idle'), 3000)
    } catch (error) {
      console.error('Sync error:', error)
      setSyncStatus('error')
      setTimeout(() => setSyncStatus('idle'), 3000)
    }
  }

  const downloadContent = async (contentId: string, contentType: 'video' | 'document' | 'course') => {
    setDownloadProgress(prev => ({ ...prev, [contentId]: 0 }))
    
    try {
      // Simulate download progress
      for (let i = 0; i <= 100; i += 10) {
        setDownloadProgress(prev => ({ ...prev, [contentId]: i }))
        await new Promise(resolve => setTimeout(resolve, 200))
      }
      
      // Save content to offline storage
      const content = {
        id: contentId,
        type: contentType,
        downloadedAt: new Date().toISOString(),
        // In real app, this would be the actual content data
        data: `Mock ${contentType} content for ${contentId}`
      }
      
      const storeName = contentType === 'video' ? 'videos' : 
                       contentType === 'course' ? 'courses' : 'assignments'
      
      await offlineStorage.save(storeName, content)
      
      setDownloadProgress(prev => {
        const newProgress = { ...prev }
        delete newProgress[contentId]
        return newProgress
      })
      
      await checkOfflineData()
    } catch (error) {
      console.error('Download error:', error)
      setDownloadProgress(prev => {
        const newProgress = { ...prev }
        delete newProgress[contentId]
        return newProgress
      })
    }
  }

  const clearOfflineData = async () => {
    try {
      await offlineStorage.clear('videos')
      await offlineStorage.clear('courses')
      await offlineStorage.clear('assignments')
      await checkOfflineData()
    } catch (error) {
      console.error('Error clearing offline data:', error)
    }
  }

  return (
    <OfflineContext.Provider value={{
      isOnline,
      hasOfflineData,
      syncStatus,
      offlineStorage,
      downloadProgress,
      syncData,
      downloadContent,
      clearOfflineData
    }}>
      {children}
    </OfflineContext.Provider>
  )
}

export function useOffline() {
  const context = useContext(OfflineContext)
  if (context === undefined) {
    throw new Error('useOffline must be used within an OfflineProvider')
  }
  return context
}