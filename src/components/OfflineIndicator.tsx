import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useOffline } from '../contexts/OfflineContext'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Wifi, 
  WifiOff, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Smartphone
} from 'lucide-react'

export function OfflineIndicator() {
  const { isOnline, syncStatus, hasOfflineData, syncData } = useOffline()
  const { t } = useLanguage()

  const getStatusIcon = () => {
    if (!isOnline) return <WifiOff className="h-4 w-4" />
    if (syncStatus === 'syncing') return <Loader2 className="h-4 w-4 animate-spin" />
    if (syncStatus === 'success') return <CheckCircle className="h-4 w-4" />
    if (syncStatus === 'error') return <AlertCircle className="h-4 w-4" />
    return <Wifi className="h-4 w-4" />
  }

  const getStatusText = () => {
    if (!isOnline) return 'Offline Mode'
    if (syncStatus === 'syncing') return 'Syncing...'
    if (syncStatus === 'success') return 'Synced'
    if (syncStatus === 'error') return 'Sync Failed'
    return 'Online'
  }

  const getStatusVariant = () => {
    if (!isOnline) return 'secondary' as const
    if (syncStatus === 'syncing') return 'outline' as const
    if (syncStatus === 'success') return 'default' as const
    if (syncStatus === 'error') return 'destructive' as const
    return 'default' as const
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant={getStatusVariant()} className="flex items-center gap-1">
        {getStatusIcon()}
        <span className="text-xs">{getStatusText()}</span>
      </Badge>
      
      {hasOfflineData && (
        <Badge variant="outline" className="flex items-center gap-1">
          <Download className="h-3 w-3" />
          <span className="text-xs">Offline Ready</span>
        </Badge>
      )}
      
      {isOnline && syncStatus === 'idle' && (
        <Button
          variant="ghost"
          size="sm"
          onClick={syncData}
          className="h-6 px-2 text-xs"
        >
          Sync Now
        </Button>
      )}
    </div>
  )
}

export function MobileOfflineIndicator() {
  const { isOnline, hasOfflineData } = useOffline()

  if (isOnline && !hasOfflineData) return null

  return (
    <div className="fixed top-2 left-2 z-50 md:hidden">
      <Badge 
        variant={isOnline ? "outline" : "secondary"} 
        className="flex items-center gap-1 text-xs"
      >
        {isOnline ? (
          <>
            <Download className="h-3 w-3" />
            Offline Ready
          </>
        ) : (
          <>
            <Smartphone className="h-3 w-3" />
            Offline Mode
          </>
        )}
      </Badge>
    </div>
  )
}