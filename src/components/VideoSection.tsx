import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { 
  Play, 
  Search, 
  Filter, 
  Clock, 
  BookOpen,
  Star,
  User,
  Download
} from 'lucide-react'

export function VideoSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography']
  
  const featuredVideos = [
    {
      id: 1,
      title: "Advanced Algebra - Quadratic Equations",
      instructor: "Dr. Sharma",
      duration: "25 min",
      subject: "Mathematics",
      difficulty: "Intermediate",
      rating: 4.8,
      thumbnail: "https://images.unsplash.com/photo-1612251018789-6dcc3b631f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYXRoZW1hdGljcyUyMGJvb2tzJTIwc3R1ZHl8ZW58MXx8fHwxNzU3Nzc1ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Learn to solve quadratic equations using multiple methods"
    },
    {
      id: 2,
      title: "Plant Biology - Photosynthesis",
      instructor: "Prof. Gupta",
      duration: "18 min",
      subject: "Science",
      difficulty: "Beginner",
      rating: 4.9,
      thumbnail: "https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHN0dWRlbnR8ZW58MXx8fHwxNzU3Nzc1ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Understanding how plants make their own food through photosynthesis"
    },
    {
      id: 3,
      title: "English Grammar - Tenses Explained",
      instructor: "Ms. Priya",
      duration: "22 min",
      subject: "English",
      difficulty: "Beginner",
      rating: 4.7,
      thumbnail: "https://images.unsplash.com/photo-1589395937658-0557e7d89fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzU3Nzc1ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Master the use of past, present, and future tenses in English"
    }
  ]

  const recentlyWatched = [
    {
      id: 4,
      title: "Geometry - Circle Properties",
      progress: 75,
      duration: "20 min",
      subject: "Mathematics"
    },
    {
      id: 5,
      title: "Indian Independence Movement",
      progress: 100,
      duration: "30 min",
      subject: "History"
    },
    {
      id: 6,
      title: "Chemical Reactions",
      progress: 45,
      duration: "15 min",
      subject: "Science"
    }
  ]

  const filteredVideos = featuredVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || video.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="recent">Recently Watched</TabsTrigger>
          <TabsTrigger value="downloaded">Downloaded</TabsTrigger>
        </TabsList>
        
        <TabsContent value="featured" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                    <Button size="sm" className="opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                  </div>
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    {video.subject}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {video.instructor}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={video.difficulty === 'Beginner' ? 'default' : 'secondary'}>
                        {video.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{video.rating}</span>
                      </div>
                    </div>
                    <Button size="sm">
                      <Play className="h-3 w-3 mr-1" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="space-y-4">
            {recentlyWatched.map((video) => (
              <Card key={video.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">{video.subject}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {video.duration}
                        </div>
                        <div className="text-sm">
                          Progress: {video.progress}%
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${video.progress}%` }}
                        />
                      </div>
                    </div>
                    <Button variant={video.progress === 100 ? "outline" : "default"}>
                      {video.progress === 100 ? "Rewatch" : "Continue"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="downloaded" className="space-y-4">
          <div className="text-center py-12">
            <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Downloaded Videos</h3>
            <p className="text-muted-foreground mb-4">
              Download videos to watch them offline
            </p>
            <Button>Browse Videos to Download</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}