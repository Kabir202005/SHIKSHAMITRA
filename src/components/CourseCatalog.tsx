import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  Search,
  Filter,
  PlayCircle,
  FileText,
  Award
} from 'lucide-react'

export function CourseCatalog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const courses = [
    {
      id: 1,
      title: "Complete Mathematics for Class 10",
      instructor: "Dr. Rajesh Sharma",
      category: "Mathematics",
      level: "Intermediate",
      duration: "8 weeks",
      students: 1205,
      rating: 4.8,
      lessons: 45,
      assignments: 12,
      price: "Free",
      thumbnail: "https://images.unsplash.com/photo-1612251018789-6dcc3b631f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYXRoZW1hdGljcyUyMGJvb2tzJTIwc3R1ZHl8ZW58MXx8fHwxNzU3Nzc1ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Master algebra, geometry, trigonometry and more with comprehensive video lessons and practice problems.",
      enrolled: true
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      instructor: "Prof. Meena Gupta",
      category: "Science",
      level: "Beginner",
      duration: "6 weeks",
      students: 890,
      rating: 4.9,
      lessons: 32,
      assignments: 8,
      price: "Free",
      thumbnail: "https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHN0dWRlbnR8ZW58MXx8fHwxNzU3Nzc1ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Explore the basic principles of physics through interactive experiments and real-world examples.",
      enrolled: false
    },
    {
      id: 3,
      title: "English Literature & Grammar",
      instructor: "Ms. Priya Kaur",
      category: "English",
      level: "Intermediate",
      duration: "10 weeks",
      students: 2156,
      rating: 4.7,
      lessons: 52,
      assignments: 15,
      price: "Free",
      thumbnail: "https://images.unsplash.com/photo-1589395937658-0557e7d89fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzU3Nzc1ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Improve your English skills with comprehensive grammar lessons and literature analysis.",
      enrolled: true
    },
    {
      id: 4,
      title: "Indian History - Ancient to Modern",
      instructor: "Dr. Vikram Singh",
      category: "History",
      level: "Beginner",
      duration: "12 weeks",
      students: 756,
      rating: 4.6,
      lessons: 48,
      assignments: 10,
      price: "Free",
      thumbnail: "https://images.unsplash.com/photo-1589395937658-0557e7d89fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzU3Nzc1ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Journey through India's rich history from ancient civilizations to independence movement.",
      enrolled: false
    },
    {
      id: 5,
      title: "Geography & Environmental Science",
      instructor: "Prof. Sunita Devi",
      category: "Geography",
      level: "Intermediate",
      duration: "8 weeks",
      students: 634,
      rating: 4.5,
      lessons: 36,
      assignments: 9,
      price: "Free",
      thumbnail: "https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHN0dWRlbnR8ZW58MXx8fHwxNzU3Nzc1ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Learn about Earth's physical features, climate patterns, and environmental conservation.",
      enrolled: false
    },
    {
      id: 6,
      title: "Computer Science Basics",
      instructor: "Mr. Amit Kumar",
      category: "Technology",
      level: "Beginner",
      duration: "6 weeks",
      students: 1420,
      rating: 4.8,
      lessons: 28,
      assignments: 6,
      price: "Free",
      thumbnail: "https://images.unsplash.com/photo-1589395937658-0557e7d89fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzU3Nzc1ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Introduction to programming concepts, algorithms, and basic computer applications.",
      enrolled: true
    }
  ]

  const categories = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Technology']

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Course Catalog</h1>
        <p className="text-muted-foreground">Discover and enroll in courses designed for rural students</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search courses, instructors, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">{courses.length}</p>
            <p className="text-sm text-muted-foreground">Total Courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">{courses.filter(c => c.enrolled).length}</p>
            <p className="text-sm text-muted-foreground">Enrolled Courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">100%</p>
            <p className="text-sm text-muted-foreground">Free Courses</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-48">
                <ImageWithFallback
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 sm:h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-xs">
                        {course.category}
                      </Badge>
                      <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                    </div>
                    {course.enrolled && (
                      <Badge variant="default" className="ml-2">Enrolled</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="line-clamp-2 mb-3">
                    {course.description}
                  </CardDescription>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <PlayCircle className="h-3 w-3" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>{course.assignments} assignments</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <Badge variant={course.level === 'Beginner' ? 'default' : 'secondary'}>
                        {course.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-green-600">{course.price}</span>
                      <Button size="sm" variant={course.enrolled ? "outline" : "default"}>
                        {course.enrolled ? "Continue" : "Enroll Now"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No courses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or browse all courses
          </p>
        </div>
      )}
    </div>
  )
}