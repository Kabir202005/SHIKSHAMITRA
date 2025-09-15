import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { ImageWithFallback } from "./Fallback/ImageWithFallback"
import { InstallPrompt, OfflineFeaturesBanner } from "./InstallPrompt"
import { useLanguage } from "../contexts/LanguageContext"
import { 
  BookOpen, 
  Play, 
  Trophy, 
  Clock,
  TrendingUp,
  Calendar,
  Target
} from 'lucide-react'

export function Dashboard() {
  const { t } = useLanguage()
  
  const recentVideos = [
    { id: 1, title: "Introduction to Algebra", subject: "Mathematics", duration: "15 min" },
    { id: 2, title: "Photosynthesis Process", subject: "Science", duration: "12 min" },
    { id: 3, title: "Indian History - Mughal Era", subject: "History", duration: "20 min" },
  ]

  const upcomingAssignments = [
    { id: 1, title: "Math Problem Set 5", subject: "Mathematics", dueDate: "Tomorrow" },
    { id: 2, title: "Science Lab Report", subject: "Science", dueDate: "2 days" },
    { id: 3, title: "English Essay", subject: "English", dueDate: "5 days" },
  ]

  return (
    <div className="space-y-6">
      <InstallPrompt />
      <OfflineFeaturesBanner />
      
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border">
        <div className="flex items-center gap-4">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1589395937658-0557e7d89fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzU3Nzc1ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Learning"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">Welcome back, {t('default.studentName').split(' ')[0]}!</h2>
            <p className="text-muted-foreground">{t('dashboard.welcome')}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.coursesEnrolled')}</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">+2 this semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.videosWatched')}</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.assignmentsDone')}</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8/10</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.averageScore')}</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {t('dashboard.currentProgress')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Mathematics - Class 10</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Science - Physics</span>
              <span>60%</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>English Literature</span>
              <span>90%</span>
            </div>
            <Progress value={90} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Videos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              {t('dashboard.continueWatching')}
            </CardTitle>
            <CardDescription>{t('dashboard.continueWatchingDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentVideos.map((video) => (
              <div key={video.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <h4 className="font-medium">{video.title}</h4>
                  <p className="text-sm text-muted-foreground">{video.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {video.duration}
                  </span>
                  <Button size="sm">
                    <Play className="h-3 w-3 mr-1" />
                    {t('common.watch')}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {t('dashboard.upcomingAssignments')}
            </CardTitle>
            <CardDescription>{t('dashboard.upcomingAssignmentsDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-orange-600">Due {assignment.dueDate}</p>
                  <Button size="sm" variant="outline">{t('common.view')}</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}