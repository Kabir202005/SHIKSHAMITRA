import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Search, Filter, Download as DownloadIcon, ExternalLink } from 'lucide-react'

function getYouTubeID(url: string) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : null
}

export function VideoSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [recentlyWatched, setRecentlyWatched] = useState<any[]>([])
  const [downloadedVideos, setDownloadedVideos] = useState<any[]>([])
  const [featuredVideos, setFeaturedVideos] = useState([
    {
      id: 1,
      title: "Advanced Algebra - Quadratic Equations",
      instructor: "Viral Maths",
      duration: "25 min",
      subject: "Mathematics",
      difficulty: "Intermediate",
      rating: 4.8,
      link: "https://www.youtube.com/watch?v=s_S4J2vArUE",
      description: "Learn to solve quadratic equations using multiple methods"
    },
    {
      id: 2,
      title: "Plant Biology - Photosynthesis",
      instructor: "Competition Wallah",
      duration: "18 min",
      subject: "Science",
      difficulty: "Beginner",
      rating: 4.9,
      link: "https://www.youtube.com/watch?v=d6pfq-0CwZc",
      description: "Understanding how plants make their own food through photosynthesis"
    },
    {
      id: 3,
      title: "English Grammar - Tenses Explained",
      instructor: "Dear Sir",
      duration: "22 min",
      subject: "English",
      difficulty: "Beginner",
      rating: 4.7,
      link: "https://www.youtube.com/watch?v=pXZtRXpGNck",
      description: "Master the use of past, present, and future tenses in English"
    }
  ])

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography']

  const handleWatch = (video: any) => {
    setRecentlyWatched(prev => {
      if (!prev.find(v => v.link === video.link)) return [video, ...prev]
      return prev
    })
    setFeaturedVideos(prev => {
      const filtered = prev.filter(v => v.link !== video.link)
      return [video, ...filtered]
    })
    window.open(video.link, '_blank')
  }

  const handleDownload = (video: any) => {
    if (!downloadedVideos.find(v => v.link === video.link)) {
      setDownloadedVideos(prev => [video, ...prev])
      alert(`"${video.title}" added to Downloaded Videos!`)
    }
  }

  const filteredVideos = featuredVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || video.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search videos..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="recent">Recently Watched</TabsTrigger>
          <TabsTrigger value="downloaded">Downloaded</TabsTrigger>
        </TabsList>

       {/* Featured Videos */}
        <TabsContent value="featured" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => {
              const videoId = getYouTubeID(video.link)
              const thumbnail = videoId
                ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                : 'https://via.placeholder.com/480x360?text=No+Thumbnail'
              return (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center gap-2">
                      <Button size="sm" onClick={() => handleWatch(video)}>Play</Button>
                      <Button size="sm" onClick={() => handleDownload(video)}>
                        <DownloadIcon className="h-4 w-4" /> Download
                      </Button>
                    </div>
                    <Badge variant="secondary" className="absolute top-2 right-2">{video.subject}</Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </TabsContent>


        {/* Recently Watched */}
        <TabsContent value="recent" className="space-y-4">
          {recentlyWatched.length === 0 ? (
            <p className="text-center text-muted-foreground">No recently watched videos</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyWatched.map(video => {
                const videoId = getYouTubeID(video.link)
                const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''
                return (
                  <Card key={video.id}>
                    <img src={thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                    <CardContent className="pt-2 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">{video.subject}</p>
                      </div>
                      <Button size="sm" onClick={() => handleDownload(video)}><DownloadIcon className="h-4 w-4" /></Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        {/* Downloaded Videos */}
        <TabsContent value="downloaded" className="space-y-4">
          {downloadedVideos.length === 0 ? (
            <p className="text-center text-muted-foreground">No downloaded videos</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloadedVideos.map(video => {
                const videoId = getYouTubeID(video.link)
                const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''
                return (
                  <Card key={video.id}>
                    <img src={thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                    <CardContent className="pt-2">
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">{video.subject}</p>
                      <Button size="sm" onClick={() => window.open(video.link, '_blank')}>Watch</Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
