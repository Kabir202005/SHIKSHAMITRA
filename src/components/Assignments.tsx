import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Progress } from "./ui/progress"
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  BookOpen,
  Upload,
  Download,
  Eye
} from 'lucide-react'

export function Assignments() {
  const [selectedTab, setSelectedTab] = useState('pending')

  const assignments = [
    {
      id: 1,
      title: "Quadratic Equations Problem Set",
      subject: "Mathematics",
      dueDate: "2025-01-15",
      status: "pending",
      difficulty: "Medium",
      totalMarks: 50,
      submittedMarks: null,
      description: "Solve 10 quadratic equation problems using different methods including factoring, completing the square, and quadratic formula.",
      timeLeft: "2 days",
      instructor: "Dr. Rajesh Sharma"
    },
    {
      id: 2,
      title: "Photosynthesis Lab Report",
      subject: "Science",
      dueDate: "2025-01-18",
      status: "pending",
      difficulty: "Easy",
      totalMarks: 30,
      submittedMarks: null,
      description: "Write a detailed lab report on the photosynthesis experiment conducted in class. Include observations, results, and conclusions.",
      timeLeft: "5 days",
      instructor: "Prof. Meena Gupta"
    },
    {
      id: 3,
      title: "Essay on Climate Change",
      subject: "English",
      dueDate: "2025-01-20",
      status: "pending",
      difficulty: "Medium",
      totalMarks: 40,
      submittedMarks: null,
      description: "Write a 500-word essay on the impact of climate change on rural communities. Use proper grammar and cite your sources.",
      timeLeft: "7 days",
      instructor: "Ms. Priya Kaur"
    },
    {
      id: 4,
      title: "Algebra Basics Quiz",
      subject: "Mathematics",
      dueDate: "2025-01-10",
      status: "completed",
      difficulty: "Easy",
      totalMarks: 25,
      submittedMarks: 23,
      description: "Basic algebra operations and equation solving.",
      timeLeft: "Completed",
      instructor: "Dr. Rajesh Sharma",
      feedback: "Excellent work! You've shown good understanding of algebraic concepts."
    },
    {
      id: 5,
      title: "Indian History Timeline",
      subject: "History",
      dueDate: "2025-01-08",
      status: "completed",
      difficulty: "Medium",
      totalMarks: 35,
      submittedMarks: 32,
      description: "Create a timeline of major events in Indian history from 1857 to 1947.",
      timeLeft: "Completed",
      instructor: "Dr. Vikram Singh",
      feedback: "Good effort! Include more details about the independence movement."
    },
    {
      id: 6,
      title: "Physics Motion Problems",
      subject: "Science",
      dueDate: "2025-01-05",
      status: "overdue",
      difficulty: "Hard",
      totalMarks: 45,
      submittedMarks: null,
      description: "Solve problems related to motion, velocity, and acceleration.",
      timeLeft: "8 days overdue",
      instructor: "Prof. Meena Gupta"
    }
  ]

  const pendingAssignments = assignments.filter(a => a.status === 'pending')
  const completedAssignments = assignments.filter(a => a.status === 'completed')
  const overdueAssignments = assignments.filter(a => a.status === 'overdue')

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-50'
      case 'completed': return 'text-green-600 bg-green-50'
      case 'overdue': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const AssignmentCard = ({ assignment }) => (
    <Card key={assignment.id} className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg">{assignment.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{assignment.subject}</Badge>
              <Badge variant="outline" className={getDifficultyColor(assignment.difficulty)}>
                {assignment.difficulty}
              </Badge>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription>{assignment.description}</CardDescription>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{assignment.timeLeft}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>Marks: {assignment.totalMarks}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>{assignment.instructor}</span>
          </div>
        </div>

        {assignment.status === 'completed' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Score:</span>
              <span className="text-lg font-bold text-green-600">
                {assignment.submittedMarks}/{assignment.totalMarks} ({Math.round((assignment.submittedMarks / assignment.totalMarks) * 100)}%)
              </span>
            </div>
            <Progress value={(assignment.submittedMarks / assignment.totalMarks) * 100} className="h-2" />
            {assignment.feedback && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Teacher's Feedback:</p>
                <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          {assignment.status === 'pending' && (
            <>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Submit
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </>
          )}
          {assignment.status === 'completed' && (
            <>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Submission
              </Button>
            </>
          )}
          {assignment.status === 'overdue' && (
            <>
              <Button size="sm" variant="destructive">
                <Upload className="h-4 w-4 mr-2" />
                Submit Late
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-orange-500" />
              <span className="text-2xl font-bold">{pendingAssignments.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{completedAssignments.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-2xl font-bold">{overdueAssignments.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{assignments.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending ({pendingAssignments.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Completed ({completedAssignments.length})
          </TabsTrigger>
          <TabsTrigger value="overdue" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Overdue ({overdueAssignments.length})
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            All ({assignments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingAssignments.length > 0 ? (
            <div className="space-y-4">
              {pendingAssignments.map(assignment => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">All caught up!</h3>
              <p className="text-muted-foreground">You have no pending assignments.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedAssignments.length > 0 ? (
            <div className="space-y-4">
              {completedAssignments.map(assignment => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No completed assignments</h3>
              <p className="text-muted-foreground">Complete some assignments to see them here.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          {overdueAssignments.length > 0 ? (
            <div className="space-y-4">
              {overdueAssignments.map(assignment => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Great job!</h3>
              <p className="text-muted-foreground">You have no overdue assignments.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {assignments.map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}