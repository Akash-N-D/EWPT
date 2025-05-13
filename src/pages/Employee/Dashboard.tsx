
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, Bell, Calendar, FileText, BarChart2, User, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

// Mock data
const MOCK_PROJECTS = [
  { 
    id: 1, 
    name: "Website Redesign", 
    description: "Redesign the company website with modern UI/UX principles", 
    deadline: "2025-06-15", 
    status: "In Progress",
    completionRate: 30
  },
  { 
    id: 2, 
    name: "Mobile App Development", 
    description: "Develop a cross-platform mobile application for client", 
    deadline: "2025-07-20", 
    status: "Completed",
    completionRate: 100
  }
];

const MOCK_NOTIFICATIONS = [
  { 
    id: 1, 
    title: "Project Update", 
    message: "The deadline for Website Redesign has been extended by one week.", 
    date: "2025-05-08",
    read: false
  },
  { 
    id: 2, 
    title: "Meeting Scheduled", 
    message: "Team meeting scheduled for tomorrow at 10:00 AM.", 
    date: "2025-05-09",
    read: true
  },
  { 
    id: 3, 
    title: "Review Feedback", 
    message: "Your team leader has provided feedback on your latest submission.", 
    date: "2025-05-07",
    read: true
  }
];

const MOCK_MEETINGS = [
  { id: 1, title: "Weekly Team Sync", date: "2025-05-15", time: "10:00 AM", location: "Conference Room A" },
  { id: 2, title: "Project Planning", date: "2025-05-18", time: "2:00 PM", location: "Virtual - Zoom" },
  { id: 3, title: "Client Review", date: "2025-05-20", time: "11:30 AM", location: "Client Office" },
];

// Updated to use skills instead of months
const MOCK_PERFORMANCE_DATA = [
  { skill: "Quality of Work", score: 85 },
  { skill: "Meeting Deadlines", score: 75 },
  { skill: "Communication", score: 90 },
  { skill: "Problem Solving", score: 65 },
  { skill: "Team Work", score: 80 }
];

const MOCK_USER_PROFILE = {
  name: "John Doe",
  email: "johndoe@techm.com",
  avatar: "/placeholder.svg",
  position: "Software Developer",
  department: "Engineering",
  joinDate: "2023-01-10",
  phone: "123-456-7890",
  address: "123 Main St, Anytown, USA",
  skills: ["React", "TypeScript", "Node.js", "CSS", "Git"],
  education: "Bachelor of Science in Computer Science",
  experience: "3+ years of professional development experience"
};

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [reportData, setReportData] = useState({
    project: "",
    week: "",
    description: "",
    hours: "",
    clientFeedback: ""
  });
  const [meetingsInCalendar, setMeetingsInCalendar] = useState<number[]>([]);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [progressUpdate, setProgressUpdate] = useState({
    completedWork: "",
    queries: "",
    expectedCompletion: "",
    percentage: 10
  });
  const [profile, setProfile] = useState(MOCK_USER_PROFILE);
  const [editingProfile, setEditingProfile] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(MOCK_USER_PROFILE);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeFileRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Check if user is logged in and is an employee
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === "employee") {
        setUser(parsedUser);
      } else {
        // Redirect if not an employee
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} has been selected.`,
      });
    }
  };
  
  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setResumeFile(file);
      toast({
        title: "Resume Selected",
        description: `${file.name} has been selected.`,
      });
    }
  };

  const handleBrowseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleBrowseResume = () => {
    if (resumeFileRef.current) {
      resumeFileRef.current.click();
    }
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation would happen here
    if (reportData.project && reportData.description) {
      toast({
        title: "Report Submitted",
        description: "Your work report has been submitted successfully.",
      });
      
      // Reset form
      setReportData({
        project: "",
        week: "",
        description: "",
        hours: "",
        clientFeedback: ""
      });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleOpenProgressDialog = (projectId: number) => {
    setSelectedProjectId(projectId);
    setShowProgressDialog(true);
    
    // Initialize with current project's completion rate
    const currentProject = projects.find(p => p.id === projectId);
    if (currentProject) {
      setProgressUpdate({
        completedWork: "",
        queries: "",
        expectedCompletion: "",
        percentage: currentProject.completionRate
      });
    }
  };

  const handleCloseProgressDialog = () => {
    setShowProgressDialog(false);
    setSelectedProjectId(null);
    setProgressUpdate({
      completedWork: "",
      queries: "",
      expectedCompletion: "",
      percentage: 10
    });
  };

  const handleUpdateProgress = () => {
    if (selectedProjectId === null) return;
    
    if (!progressUpdate.completedWork) {
      toast({
        title: "Input Required",
        description: "Please describe the work completed.",
        variant: "destructive"
      });
      return;
    }

    const updatedProjects = projects.map(project => 
      project.id === selectedProjectId 
        ? {...project, completionRate: progressUpdate.percentage} 
        : project
    );
    
    setProjects(updatedProjects);
    
    toast({
      title: "Progress Updated",
      description: "Project progress has been updated successfully.",
    });
    
    handleCloseProgressDialog();
  };

  const handleAddToCalendar = (meetingId: number) => {
    if (!meetingsInCalendar.includes(meetingId)) {
      setMeetingsInCalendar([...meetingsInCalendar, meetingId]);
      
      toast({
        title: "Added to Calendar",
        description: "Meeting has been added to your calendar.",
      });
    }
  };
  
  const handleMarkAsRead = (notificationId: number) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId 
        ? {...notification, read: true} 
        : notification
    );
    
    setNotifications(updatedNotifications);
    
    toast({
      title: "Notification Marked as Read",
      description: "Notification has been marked as read.",
    });
  };

  const handleUpdateProfile = () => {
    setProfile(updatedProfile);
    setEditingProfile(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Employee Dashboard</h1>
        
        <Tabs defaultValue="profile">
          <TabsList className="mb-6 w-full max-w-2xl grid grid-cols-6 h-auto">
            <TabsTrigger value="profile" className="flex flex-col items-center py-2 px-4">
              <User className="h-5 w-5 mb-1" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex flex-col items-center py-2 px-4">
              <Briefcase className="h-5 w-5 mb-1" />
              <span>Projects</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex flex-col items-center py-2 px-4">
              <Bell className="h-5 w-5 mb-1" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex flex-col items-center py-2 px-4">
              <Calendar className="h-5 w-5 mb-1" />
              <span>Meetings</span>
            </TabsTrigger>
            <TabsTrigger value="reporting" className="flex flex-col items-center py-2 px-4">
              <FileText className="h-5 w-5 mb-1" />
              <span>Reporting</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex flex-col items-center py-2 px-4">
              <BarChart2 className="h-5 w-5 mb-1" />
              <span>Performance</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Profile</CardTitle>
                {!editingProfile ? (
                  <Button onClick={() => setEditingProfile(true)}>Edit Profile</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setEditingProfile(false)}>Cancel</Button>
                    <Button onClick={handleUpdateProfile}>Save Changes</Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-4 md:w-1/3">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>
                        <User className="h-12 w-12" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="text-center">
                      {!editingProfile ? (
                        <>
                          <h2 className="text-xl font-bold">{profile.name}</h2>
                          <p className="text-sm text-muted-foreground">{profile.position}</p>
                          <p className="text-sm text-muted-foreground">{profile.department}</p>
                        </>
                      ) : (
                        <div className="space-y-2 w-full">
                          <Input 
                            value={updatedProfile.name} 
                            onChange={(e) => setUpdatedProfile({...updatedProfile, name: e.target.value})}
                            placeholder="Name"
                          />
                          <Input 
                            value={updatedProfile.position} 
                            onChange={(e) => setUpdatedProfile({...updatedProfile, position: e.target.value})}
                            placeholder="Position"
                          />
                          <Input 
                            value={updatedProfile.department} 
                            onChange={(e) => setUpdatedProfile({...updatedProfile, department: e.target.value})}
                            placeholder="Department"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="w-full">
                      <h3 className="font-medium text-sm mb-2">Resume</h3>
                      <input 
                        type="file" 
                        ref={resumeFileRef} 
                        className="hidden" 
                        onChange={handleResumeFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                      {!editingProfile ? (
                        <div className="flex justify-center">
                          <Button size="sm" variant="outline" className="w-full">
                            Download Resume
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {resumeFile && (
                            <p className="text-sm text-center">{resumeFile.name}</p>
                          )}
                          <Button size="sm" variant="outline" className="w-full" onClick={handleBrowseResume}>
                            {resumeFile ? "Change Resume" : "Upload Resume"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-6 md:w-2/3">
                    <div>
                      <h3 className="font-medium text-primary mb-3">Contact Information</h3>
                      {!editingProfile ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded border">
                            <p className="font-medium">Email</p>
                            <p className="text-muted-foreground">{profile.email}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded border">
                            <p className="font-medium">Phone</p>
                            <p className="text-muted-foreground">{profile.phone}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded border col-span-1 md:col-span-2">
                            <p className="font-medium">Address</p>
                            <p className="text-muted-foreground">{profile.address}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-sm">Email</label>
                              <Input 
                                value={updatedProfile.email} 
                                onChange={(e) => setUpdatedProfile({...updatedProfile, email: e.target.value})}
                                placeholder="Email"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-sm">Phone</label>
                              <Input 
                                value={updatedProfile.phone} 
                                onChange={(e) => setUpdatedProfile({...updatedProfile, phone: e.target.value})}
                                placeholder="Phone"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm">Address</label>
                            <Input 
                              value={updatedProfile.address} 
                              onChange={(e) => setUpdatedProfile({...updatedProfile, address: e.target.value})}
                              placeholder="Address"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-primary mb-3">Skills & Experience</h3>
                      {!editingProfile ? (
                        <div>
                          <div className="mb-3 bg-gray-50 p-3 rounded border">
                            <p className="font-medium">Skills</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {profile.skills.map((skill, index) => (
                                <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded border">
                              <p className="font-medium">Education</p>
                              <p className="text-muted-foreground">{profile.education}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded border">
                              <p className="font-medium">Experience</p>
                              <p className="text-muted-foreground">{profile.experience}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-sm">Skills (comma separated)</label>
                            <Input 
                              value={updatedProfile.skills.join(", ")} 
                              onChange={(e) => setUpdatedProfile({...updatedProfile, skills: e.target.value.split(",").map(s => s.trim())})}
                              placeholder="Skills"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-sm">Education</label>
                              <Input 
                                value={updatedProfile.education} 
                                onChange={(e) => setUpdatedProfile({...updatedProfile, education: e.target.value})}
                                placeholder="Education"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-sm">Experience</label>
                              <Input 
                                value={updatedProfile.experience} 
                                onChange={(e) => setUpdatedProfile({...updatedProfile, experience: e.target.value})}
                                placeholder="Experience"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-primary mb-3">Employment Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {!editingProfile ? (
                          <>
                            <div className="bg-gray-50 p-3 rounded border">
                              <p className="font-medium">Join Date</p>
                              <p className="text-muted-foreground">{profile.joinDate}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded border">
                              <p className="font-medium">Employee ID</p>
                              <p className="text-muted-foreground">EMP-{Date.now().toString().slice(-6)}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded border">
                              <p className="font-medium">Status</p>
                              <p className="text-green-600">Active</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="space-y-1">
                              <label className="text-sm">Join Date</label>
                              <Input 
                                type="date"
                                value={updatedProfile.joinDate} 
                                onChange={(e) => setUpdatedProfile({...updatedProfile, joinDate: e.target.value})}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-sm">Employee ID</label>
                              <Input value={`EMP-${Date.now().toString().slice(-6)}`} disabled />
                            </div>
                            <div className="space-y-1">
                              <label className="text-sm">Status</label>
                              <Input value="Active" disabled />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(project => (
                <Card key={project.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-primary">{project.name}</CardTitle>
                        <CardDescription className="mt-2">Deadline: {project.deadline}</CardDescription>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        project.status === "In Progress" 
                          ? "bg-blue-100 text-blue-700" 
                          : "bg-green-100 text-green-700"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion</span>
                        <span className="font-medium">{project.completionRate}%</span>
                      </div>
                      <Progress value={project.completionRate} className="h-2" />
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button 
                        size="sm" 
                        onClick={() => handleOpenProgressDialog(project.id)}
                      >
                        Update Progress
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Dialog open={showProgressDialog} onOpenChange={setShowProgressDialog}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-primary">Update Project Progress</DialogTitle>
                  <DialogDescription>
                    Please provide details about your progress and set the completion percentage.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Work Completed</label>
                    <Textarea 
                      placeholder="Describe what work you've completed..."
                      value={progressUpdate.completedWork}
                      onChange={(e) => setProgressUpdate({...progressUpdate, completedWork: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Questions or Blockers</label>
                    <Textarea 
                      placeholder="Any questions or blockers? (Optional)"
                      value={progressUpdate.queries}
                      onChange={(e) => setProgressUpdate({...progressUpdate, queries: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expected Completion Date</label>
                    <Input 
                      type="date"
                      value={progressUpdate.expectedCompletion}
                      onChange={(e) => setProgressUpdate({...progressUpdate, expectedCompletion: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Completion Percentage</label>
                      <span className="text-sm font-medium">{progressUpdate.percentage}%</span>
                    </div>
                    <Input 
                      type="range" 
                      min="0" 
                      max="100" 
                      step="5"
                      value={progressUpdate.percentage}
                      onChange={(e) => setProgressUpdate({...progressUpdate, percentage: parseInt(e.target.value)})}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseProgressDialog}>Cancel</Button>
                  <Button onClick={handleUpdateProgress}>Update Progress</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`border-l-4 ${notification.read ? 'border-gray-200' : 'border-primary'} pl-4 py-2`}
                    >
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-xs text-muted-foreground">{notification.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      {!notification.read && (
                        <div className="mt-2 flex justify-end">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs gap-1"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Check size={14} /> Mark as Read
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="meetings">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_MEETINGS.map(meeting => (
                    <div key={meeting.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
                      <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-primary">{meeting.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {meeting.date} at {meeting.time} • {meeting.location}
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        variant={meetingsInCalendar.includes(meeting.id) ? "secondary" : "outline"}
                        onClick={() => handleAddToCalendar(meeting.id)}
                        disabled={meetingsInCalendar.includes(meeting.id)}
                      >
                        {meetingsInCalendar.includes(meeting.id) ? "Added to Calendar" : "Add to Calendar"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reporting">
            <Card>
              <CardHeader>
                <CardTitle>Submit Work Report</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmitReport}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="project" className="text-sm font-medium">Project</label>
                      <select 
                        id="project" 
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                        value={reportData.project}
                        onChange={(e) => setReportData({...reportData, project: e.target.value})}
                        required
                      >
                        <option value="">Select a project</option>
                        {projects.map(project => (
                          <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="week" className="text-sm font-medium">Week</label>
                      <Input 
                        type="week" 
                        id="week" 
                        value={reportData.week}
                        onChange={(e) => setReportData({...reportData, week: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Work Description</label>
                    <Textarea 
                      id="description" 
                      rows={4}
                      placeholder="Describe the work completed this week..."
                      value={reportData.description}
                      onChange={(e) => setReportData({...reportData, description: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="clientFeedback" className="text-sm font-medium">Client Feedback</label>
                    <Textarea 
                      id="clientFeedback" 
                      rows={3}
                      placeholder="Enter any client feedback received..."
                      value={reportData.clientFeedback}
                      onChange={(e) => setReportData({...reportData, clientFeedback: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="hours" className="text-sm font-medium">Hours Worked</label>
                    <Input 
                      type="number" 
                      id="hours" 
                      value={reportData.hours}
                      onChange={(e) => setReportData({...reportData, hours: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Upload Client Review (Optional)</label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center">
                      <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        {selectedFile ? `Selected: ${selectedFile.name}` : 'Click to browse files'}
                      </p>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={handleFileInputChange} 
                      />
                      <Button variant="outline" size="sm" onClick={handleBrowseFiles}>
                        Browse Files
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Submit Report</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={{}} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={MOCK_PERFORMANCE_DATA}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="skill" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#63412c" 
                          strokeWidth={3}
                          dot={{ r: 5 }}
                          activeDot={{ r: 8 }}
                          name="Performance Score"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Recent Feedback</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">Team Leader Feedback</span>
                      <span className="text-xs text-muted-foreground">May 5, 2025</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Great work on the website redesign project. Your attention to detail and ability to meet deadlines is commendable. Consider improving documentation of your code to help other team members understand your implementation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
