import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Progress } from "./ui/progress"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Trophy,
  Star,
  Award,
  TrendingUp,
  BookOpen,
  Target,
  Edit
} from 'lucide-react'

export function StudentProfile() {
  const studentInfo = {
    name: "Priya Sharma",
    class: "Class 10",
    school: "Government High School, Nabha",
    email: "priya.sharma@student.edu",
    phone: "+91 98765 43210",
    address: "Village Nabha, Punjab",
    joinDate: "August 2023",
    studentId: "NHS2023001"
  }

  const achievements = [
    {
      id: 1,
      title: "Math Wizard",
      description: "Scored 95% in Mathematics",
      icon: Trophy,
      color: "text-yellow-500",
      date: "December 2024"
    },
    {
      id: 2,
      title: "Science Explorer",
      description: "Completed all Science experiments",
      icon: Award,
      color: "text-blue-500",
      date: "November 2024"
    },
    {
      id: 3,
      title: "Regular Learner",
      description: "30 days learning streak",
      icon: Target,
      color: "text-green-500",
      date: "January 2025"
    }
  ]

  const subjectProgress = [
    { subject: "Mathematics", progress: 85, grade: "A", totalHours: 24 },
    { subject: "Science", progress: 78, grade: "B+", totalHours: 20 },
    { subject: "English", progress: 92, grade: "A+", totalHours: 18 },
    { subject: "History", progress: 70, grade: "B", totalHours: 15 },
    { subject: "Geography", progress: 75, grade: "B+", totalHours: 12 }
  ]

  const recentActivities = [
    {
      id: 1,
      activity: "Completed Mathematics Assignment 5",
      date: "2 hours ago",
      type: "assignment"
    },
    {
      id: 2,
      activity: "Watched 'Photosynthesis Process' video",
      date: "1 day ago",
      type: "video"
    },
    {
      id: 3,
      activity: "Scored 88% in Science Quiz",
      date: "3 days ago",
      type: "quiz"
    },
    {
      id: 4,
      activity: "Submitted English Essay",
      date: "5 days ago",
      type: "assignment"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-avatar.jpg" alt={studentInfo.name} />
                <AvatarFallback className="text-xl">PS</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Photo
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl font-bold">{studentInfo.name}</h1>
                <p className="text-muted-foreground">{studentInfo.class} • {studentInfo.school}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{studentInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{studentInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{studentInfo.address}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Student ID: {studentInfo.studentId}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined: {studentInfo.joinDate}</span>
                  </div>
                </div>
              </div>
              
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="progress">Academic Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Subject-wise Progress
              </CardTitle>
              <CardDescription>Your performance across different subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjectProgress.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{subject.subject}</span>
                      <Badge variant="outline">{subject.grade}</Badge>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{subject.progress}%</span>
                      <p className="text-xs text-muted-foreground">{subject.totalHours}h studied</p>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full bg-muted ${achievement.color}`}>
                      <achievement.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Learning Activity</CardTitle>
              <CardDescription>Your latest actions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg border">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'video' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {activity.type === 'assignment' && <BookOpen className="h-4 w-4" />}
                      {activity.type === 'video' && <User className="h-4 w-4" />}
                      {activity.type === 'quiz' && <Trophy className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.activity}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">6</p>
                    <p className="text-sm text-muted-foreground">Subjects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">Achievements</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">85%</p>
                    <p className="text-sm text-muted-foreground">Avg Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">89h</p>
                    <p className="text-sm text-muted-foreground">Study Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}