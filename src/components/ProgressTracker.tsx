import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { 
  TrendingUp, 
  Calendar, 
  Target,
  BookOpen,
  Clock,
  Trophy,
  Star,
  BarChart3
} from 'lucide-react'

export function ProgressTracker() {
  const overallProgress = {
    currentGrade: "85%",
    improvement: "+5%",
    studyStreak: 15,
    totalHours: 89,
    completedAssignments: 24,
    totalAssignments: 30
  }

  const subjectProgress = [
    {
      subject: "Mathematics",
      progress: 85,
      grade: "A",
      studyHours: 24,
      lastActivity: "2 hours ago",
      color: "bg-blue-500",
      trend: "+3%"
    },
    {
      subject: "Science",
      progress: 78,
      grade: "B+",
      studyHours: 20,
      lastActivity: "1 day ago",
      color: "bg-green-500",
      trend: "+7%"
    },
    {
      subject: "English",
      progress: 92,
      grade: "A+",
      studyHours: 18,
      lastActivity: "3 hours ago",
      color: "bg-purple-500",
      trend: "+2%"
    },
    {
      subject: "History",
      progress: 70,
      grade: "B",
      studyHours: 15,
      lastActivity: "2 days ago",
      color: "bg-orange-500",
      trend: "+4%"
    },
    {
      subject: "Geography",
      progress: 75,
      grade: "B+",
      studyHours: 12,
      lastActivity: "1 day ago",
      color: "bg-teal-500",
      trend: "+6%"
    }
  ]

  const weeklyActivity = [
    { day: "Mon", hours: 2.5, completed: true },
    { day: "Tue", hours: 3.0, completed: true },
    { day: "Wed", hours: 2.0, completed: true },
    { day: "Thu", hours: 3.5, completed: true },
    { day: "Fri", hours: 2.5, completed: true },
    { day: "Sat", hours: 1.5, completed: true },
    { day: "Sun", hours: 2.0, completed: false }
  ]

  const achievements = [
    { title: "Math Mastery", description: "Scored 95% in Mathematics", date: "Dec 2024", icon: Trophy },
    { title: "Consistent Learner", description: "15-day study streak", date: "Jan 2025", icon: Target },
    { title: "Science Explorer", description: "Completed all experiments", date: "Nov 2024", icon: Star }
  ]

  const monthlyGoals = [
    { goal: "Study 100 hours", current: 89, target: 100, progress: 89 },
    { goal: "Complete all assignments", current: 24, target: 30, progress: 80 },
    { goal: "Maintain 85% average", current: 85, target: 85, progress: 100 },
    { goal: "Watch 50 educational videos", current: 42, target: 50, progress: 84 }
  ]

  return (
    <div className="space-y-6">
      {/* Overall Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Grade</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{overallProgress.currentGrade}</p>
                  <Badge variant="outline" className="text-green-600">
                    {overallProgress.improvement}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Study Streak</p>
                <p className="text-2xl font-bold">{overallProgress.studyStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Study Hours</p>
                <p className="text-2xl font-bold">{overallProgress.totalHours}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <BookOpen className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Assignments</p>
                <p className="text-2xl font-bold">
                  {overallProgress.completedAssignments}/{overallProgress.totalAssignments}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Subject-wise Progress
          </CardTitle>
          <CardDescription>Your performance across different subjects this month</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {subjectProgress.map((subject, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                  <span className="font-medium">{subject.subject}</span>
                  <Badge variant="outline">{subject.grade}</Badge>
                  <Badge variant="outline" className="text-green-600">
                    {subject.trend}
                  </Badge>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold">{subject.progress}%</span>
                  <p className="text-xs text-muted-foreground">{subject.studyHours}h studied</p>
                </div>
              </div>
              <Progress value={subject.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Last activity: {subject.lastActivity}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              This Week's Activity
            </CardTitle>
            <CardDescription>Daily study hours and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyActivity.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-sm font-medium">{day.day}</span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{day.hours}h</span>
                    </div>
                  </div>
                  <div className={`p-1 rounded-full ${
                    day.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {day.completed ? '✓' : '○'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Monthly Goals
            </CardTitle>
            <CardDescription>Track your progress towards monthly targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {monthlyGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{goal.goal}</span>
                  <span className="text-sm text-muted-foreground">
                    {goal.current}/{goal.target}
                  </span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Recent Achievements
          </CardTitle>
          <CardDescription>Your latest accomplishments and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg border">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <achievement.icon className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{achievement.description}</p>
                  <p className="text-xs text-muted-foreground">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}