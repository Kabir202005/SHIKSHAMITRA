import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { useOffline } from '../contexts/OfflineContext'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Download, 
  CheckCircle, 
  Video, 
  BookOpen, 
  FileText,
  Trash2,
  AlertCircle
} from 'lucide-react'

interface ContentItem {
  id: string
  title: string
  type: 'video' | 'course' | 'document'
  size: string
  description: string
  isDownloaded: boolean
}

// Mock data for demonstration
const availableContent: ContentItem[] = [
  {
    id: 'math-class8-1',
    title: 'Mathematics - Class 8 - Algebra Basics',
    type: 'video',
    size: '45 MB',
    description: 'Introduction to algebraic expressions and equations',
    isDownloaded: false
  },
  {
    id: 'science-class8-1',
    title: 'Science - Class 8 - Cell Structure',
    type: 'video', 
    size: '52 MB',
    description: 'Understanding plant and animal cell structures',
    isDownloaded: false
  },
  {
    id: 'hindi-class8-course',
    title: 'Hindi Literature Course - Class 8',
    type: 'course',
    size: '15 MB',
    description: 'Complete course with lessons and exercises',
    isDownloaded: false
  },
  {
    id: 'math-worksheet-1',
    title: 'Algebra Practice Worksheet',
    type: 'document',
    size: '2 MB',
    description: 'Practice problems for algebraic expressions',
    isDownloaded: false
  },
  {
    id: 'physics-class9-1',
    title: 'Physics - Class 9 - Motion and Force',
    type: 'video',
    size: '38 MB',
    description: 'Laws of motion and force interactions',
    isDownloaded: false
  }
]

export function ContentDownloader() {
  const { downloadContent, downloadProgress, clearOfflineData, isOnline } = useOffline()
  const { t } = useLanguage()
  const [content, setContent] = useState<ContentItem[]>(availableContent)

  const handleDownload = async (item: ContentItem) => {
    if (!isOnline) return
    
    await downloadContent(item.id, item.type)
    setContent(prev => prev.map(c => 
      c.id === item.id ? { ...c, isDownloaded: true } : c
    ))
  }

  const handleClearAll = async () => {
    await clearOfflineData()
    setContent(prev => prev.map(c => ({ ...c, isDownloaded: false })))
  }

  const getIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />
      case 'course': return <BookOpen className="h-4 w-4" />
      case 'document': return <FileText className="h-4 w-4" />
    }
  }

  const downloadedCount = content.filter(c => c.isDownloaded).length
  const totalSize = content.filter(c => c.isDownloaded).reduce((acc, c) => {
    const size = parseInt(c.size.split(' ')[0])
    return acc + size
  }, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Offline Content Manager
          </CardTitle>
          <CardDescription>
            Download content for offline learning. Content will be available without internet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              {downloadedCount} items downloaded • {totalSize} MB used
            </div>
            {downloadedCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {!isOnline && (
            <div className="bg-muted p-3 rounded-md mb-4 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                You're offline. Downloaded content is available below.
              </span>
            </div>
          )}

          <div className="space-y-3">
            {content.map((item) => (
              <Card key={item.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 bg-muted rounded">
                        {getIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm leading-5">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-muted px-2 py-1 rounded capitalize">
                            {item.type}
                          </span>
                          <span className="text-xs text-muted-foreground">{item.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {downloadProgress[item.id] !== undefined ? (
                        <div className="w-24">
                          <Progress value={downloadProgress[item.id]} className="h-2" />
                          <div className="text-xs text-center text-muted-foreground mt-1">
                            {downloadProgress[item.id]}%
                          </div>
                        </div>
                      ) : item.isDownloaded ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-xs">Downloaded</span>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(item)}
                          disabled={!isOnline}
                          className="whitespace-nowrap"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}