
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, UserPlus, X, Calendar, FileText, MessageSquare, User, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock data
const MOCK_EMPLOYEES = [
  { id: 1, name: "Employee 1", email: "employee1@techm.com", projects: 2, performance: 85, contact: "123-456-7890", address: "123 Main St, City", position: "Software Developer", department: "Engineering", joinDate: "2023-01-15", skills: ["React", "TypeScript", "Node.js"] },
  { id: 2, name: "Employee 2", email: "employee2@techm.com", projects: 1, performance: 75, contact: "234-567-8901", address: "456 Oak St, Town", position: "UI Designer", department: "Design", joinDate: "2023-03-22", skills: ["Figma", "Adobe XD", "CSS"] },
  { id: 3, name: "Employee 3", email: "employee3@techm.com", projects: 3, performance: 90, contact: "345-678-9012", address: "789 Pine St, Village", position: "Project Manager", department: "Management", joinDate: "2022-11-10", skills: ["Scrum", "JIRA", "Leadership"] },
  { id: 4, name: "Employee 4", email: "employee4@techm.com", projects: 2, performance: 65, contact: "456-789-0123", address: "101 Elm St, County", position: "QA Tester", department: "Quality Assurance", joinDate: "2023-05-05", skills: ["Manual Testing", "Selenium", "TestRail"] },
  { id: 5, name: "Employee 5", email: "employee5@techm.com", projects: 1, performance: 80, contact: "567-890-1234", address: "202 Maple St, Metro", position: "Backend Developer", department: "Engineering", joinDate: "2023-02-18", skills: ["Java", "Spring Boot", "MySQL"] },
];

const MOCK_PROJECTS = [
  { id: 1, name: "Website Redesign", deadline: "2025-06-15", status: "In Progress" },
  { id: 2, name: "Mobile App Development", deadline: "2025-07-20", status: "Completed" },
  { id: 3, name: "Database Migration", deadline: "2025-05-30", status: "In Progress" },
];

const MOCK_MEETINGS = [
  { id: 1, title: "Weekly Team Sync", date: "2025-05-15", time: "10:00 AM", location: "Conference Room A" },
  { id: 2, title: "Project Planning", date: "2025-05-18", time: "2:00 PM", location: "Virtual - Zoom" },
  { id: 3, title: "Client Review", date: "2025-05-20", time: "11:30 AM", location: "Client Office" },
];

const MOCK_PERFORMANCE_DATA = [
  { name: "Employee 1", performance: 85 },
  { name: "Employee 2", performance: 75 },
  { name: "Employee 3", performance: 90 },
  { name: "Employee 4", performance: 65 },
  { name: "Employee 5", performance: 80 },
];

// Define the employee type to fix typescript errors
type Employee = {
  id: number;
  name: string;
  email: string;
  projects: number;
  performance: number;
  contact: string;
  address: string;
  position: string;
  department: string;
  joinDate: string;
  skills: string[];
};

const TeamLeaderDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [meetings, setMeetings] = useState(MOCK_MEETINGS);
  const [newEmployeeData, setNewEmployeeData] = useState({ 
    name: "", 
    email: "",
    contact: "",
    address: "",
    position: "",
    department: "",
    joinDate: "",
    skills: [""]
  });
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [newProjectData, setNewProjectData] = useState({ name: "", deadline: "", description: "" });
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [newMeetingData, setNewMeetingData] = useState({ title: "", date: "", time: "", location: "" });
  const [showAddMeetingForm, setShowAddMeetingForm] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<{[key: string]: string}>({});
  const [progressValues, setProgressValues] = useState<{[key: string]: number}>({});
  const [feedbackContent, setFeedbackContent] = useState<{[key: string]: string}>({});
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [showRescheduleMeetingDialog, setShowRescheduleMeetingDialog] = useState(false);
  const [rescheduleMeetingData, setRescheduleMeetingData] = useState({ title: "", date: "", time: "", location: "" });
  
  useEffect(() => {
    // Check if user is logged in and is a team leader
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === "teamleader") {
        setUser(parsedUser);
      } else {
        // Redirect if not a team leader
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleBackToList = () => {
    setSelectedEmployee(null);
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmployeeData.name && newEmployeeData.email) {
      const newEmployee: Employee = {
        id: employees.length + 1,
        name: newEmployeeData.name,
        email: newEmployeeData.email,
        contact: newEmployeeData.contact || "Not provided",
        address: newEmployeeData.address || "Not provided",
        position: newEmployeeData.position || "New Employee",
        department: newEmployeeData.department || "Unassigned",
        joinDate: newEmployeeData.joinDate || new Date().toISOString().split('T')[0],
        skills: newEmployeeData.skills || [],
        projects: 0,
        performance: 50
      };
      setEmployees([...employees, newEmployee]);
      setNewEmployeeData({ name: "", email: "", contact: "", address: "", position: "", department: "", joinDate: "", skills: [""] });
      setShowAddEmployeeForm(false);
      toast({
        title: "Employee Added",
        description: `${newEmployeeData.name} has been added to your team.`,
      });
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProjectData.name && newProjectData.deadline) {
      // In a real app, you would assign this to the selected employee
      if (selectedEmployee) {
        const updatedEmployee = {
          ...selectedEmployee,
          projects: selectedEmployee.projects + 1
        };
        setSelectedEmployee(updatedEmployee);
        setEmployees(employees.map(emp => emp.id === selectedEmployee.id ? updatedEmployee : emp));
        toast({
          title: "Project Assigned",
          description: `${newProjectData.name} has been assigned to ${selectedEmployee.name}.`,
        });
        setNewProjectData({ name: "", deadline: "", description: "" });
        setShowAddProjectForm(false);
      }
    }
  };

  const handleAddMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMeetingData.title && newMeetingData.date && newMeetingData.time) {
      const newMeeting = {
        id: meetings.length + 1,
        title: newMeetingData.title,
        date: newMeetingData.date,
        time: newMeetingData.time,
        location: newMeetingData.location || "Virtual"
      };
      setMeetings([...meetings, newMeeting]);
      setNewMeetingData({ title: "", date: "", time: "", location: "" });
      setShowAddMeetingForm(false);
      toast({
        title: "Meeting Scheduled",
        description: `${newMeetingData.title} has been scheduled for ${newMeetingData.date}.`,
      });
    }
  };

  const handleOpenRescheduleMeeting = (meeting: any) => {
    setSelectedMeeting(meeting);
    setRescheduleMeetingData({
      title: meeting.title,
      date: meeting.date,
      time: meeting.time,
      location: meeting.location
    });
    setShowRescheduleMeetingDialog(true);
  };

  const handleRescheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMeeting && rescheduleMeetingData.date && rescheduleMeetingData.time) {
      const updatedMeetings = meetings.map(meeting => 
        meeting.id === selectedMeeting.id 
          ? { 
              ...meeting, 
              title: rescheduleMeetingData.title,
              date: rescheduleMeetingData.date,
              time: rescheduleMeetingData.time,
              location: rescheduleMeetingData.location
            } 
          : meeting
      );
      setMeetings(updatedMeetings);
      setShowRescheduleMeetingDialog(false);
      setSelectedMeeting(null);
      toast({
        title: "Meeting Rescheduled",
        description: `The meeting has been rescheduled to ${rescheduleMeetingData.date} at ${rescheduleMeetingData.time}.`,
      });
    }
  };

  const handleRemoveMeeting = (meetingId: number) => {
    setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
    toast({
      title: "Meeting Cancelled",
      description: "The meeting has been cancelled.",
    });
  };

  const handleAddFeedback = (id: string) => {
    if (feedbackContent[id]?.trim()) {
      setReviewStatus(prev => ({...prev, [id]: "Reviewed"}));
      toast({
        title: "Feedback Added",
        description: "Your feedback has been successfully recorded.",
      });
    } else {
      toast({
        title: "Feedback Required",
        description: "Please enter feedback before submitting.",
        variant: "destructive"
      });
    }
  };

  const handleSaveRatings = () => {
    toast({
      title: "Ratings Saved",
      description: "Performance ratings have been saved successfully.",
    });
  };
  
  const handleProgressUpdate = (id: string, value: number) => {
    setProgressValues(prev => ({...prev, [id]: value}));
    toast({
      title: "Progress Updated",
      description: `Progress updated to ${value}%.`,
    });
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Team Leader Dashboard</h1>
        
        {!selectedEmployee ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search employees..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="gap-1"
                onClick={() => setShowAddEmployeeForm(true)}
              >
                <UserPlus size={16} />
                Add Employee
              </Button>
            </div>
            
            {showAddEmployeeForm && (
              <Card className="mb-6 border-2 border-gray-300">
                <CardHeader>
                  <CardTitle>Add New Employee</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddEmployee} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input 
                          id="name" 
                          value={newEmployeeData.name}
                          onChange={e => setNewEmployeeData({...newEmployeeData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input 
                          id="email" 
                          type="email"
                          value={newEmployeeData.email}
                          onChange={e => setNewEmployeeData({...newEmployeeData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setShowAddEmployeeForm(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Employee</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-2 border-gray-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{employees.length}</div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-gray-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{MOCK_PROJECTS.length}</div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-gray-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Meetings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{meetings.length}</div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-8 border-2 border-gray-300">
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={{}} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={MOCK_PERFORMANCE_DATA}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip 
                          content={({ active, payload }) => 
                            active && payload?.length ? (
                              <ChartTooltipContent payload={payload} />
                            ) : null
                          } 
                        />
                        <Bar dataKey="performance" fill="#63412c" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-gray-300">
              <CardHeader>
                <CardTitle>Employee List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {filteredEmployees.map(employee => (
                    <div 
                      key={employee.id}
                      className="flex justify-between items-center p-4 border-2 border-gray-300 rounded-lg bg-white hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleSelectEmployee(employee)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                          {employee.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium">{employee.name}</h3>
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {employee.performance}% Performance
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div>
            <Button variant="ghost" className="mb-6 text-primary" onClick={handleBackToList}>
              <X size={16} className="mr-2" /> Back to Employee List
            </Button>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl">
                  {selectedEmployee.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">{selectedEmployee.name}</h2>
                  <p className="text-muted-foreground">{selectedEmployee.email}</p>
                </div>
              </div>
              
              <div className="text-sm">
                <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
                  {selectedEmployee.performance}% Performance
                </span>
              </div>
            </div>
            
            <Tabs defaultValue="profile">
              <TabsList className="mb-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="projects">Assigned Projects</TabsTrigger>
                <TabsTrigger value="reviews">Reviews & Uploads</TabsTrigger>
                <TabsTrigger value="meetings">Meetings</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card className="border-2 border-gray-300">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Employee Profile</CardTitle>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Download size={16} />
                      Download Resume
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Contact Information</h3>
                          <div className="bg-gray-50 p-3 rounded border-2 border-gray-300">
                            <p className="font-medium">Phone: <span className="font-normal">{selectedEmployee.contact}</span></p>
                            <p className="font-medium">Email: <span className="font-normal">{selectedEmployee.email}</span></p>
                            <p className="font-medium">Address: <span className="font-normal">{selectedEmployee.address}</span></p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Employment Details</h3>
                          <div className="bg-gray-50 p-3 rounded border-2 border-gray-300">
                            <p className="font-medium">Position: <span className="font-normal">{selectedEmployee.position}</span></p>
                            <p className="font-medium">Department: <span className="font-normal">{selectedEmployee.department}</span></p>
                            <p className="font-medium">Join Date: <span className="font-normal">{selectedEmployee.joinDate}</span></p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Skillset</h3>
                          <div className="bg-gray-50 p-3 rounded border-2 border-gray-300">
                            <div className="flex flex-wrap gap-2">
                              {selectedEmployee.skills.map((skill, index) => (
                                <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Performance Summary</h3>
                          <div className="bg-gray-50 p-3 rounded border-2 border-gray-300">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Overall Performance</span>
                                <span className="font-medium">{selectedEmployee.performance}%</span>
                              </div>
                              <Progress value={selectedEmployee.performance} className="h-2" />
                            </div>
                            <p className="mt-3 text-sm text-muted-foreground">
                              Active Projects: {selectedEmployee.projects}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects">
                <Card className="border-2 border-gray-300">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Assigned Projects</CardTitle>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1"
                      onClick={() => setShowAddProjectForm(true)}
                    >
                      <Plus size={16} />
                      Assign New Project
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {showAddProjectForm && (
                      <div className="mb-6 p-4 border-2 border-gray-300 rounded-lg bg-gray-50">
                        <h3 className="font-medium mb-3">Assign New Project</h3>
                        <form onSubmit={handleAddProject} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="projectName" className="text-sm font-medium">Project Name</label>
                              <Input 
                                id="projectName" 
                                value={newProjectData.name}
                                onChange={e => setNewProjectData({...newProjectData, name: e.target.value})}
                                required
                                className="border-2 border-gray-300"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="projectDeadline" className="text-sm font-medium">Deadline</label>
                              <Input 
                                id="projectDeadline" 
                                type="date"
                                value={newProjectData.deadline}
                                onChange={e => setNewProjectData({...newProjectData, deadline: e.target.value})}
                                required
                                className="border-2 border-gray-300"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="projectDesc" className="text-sm font-medium">Description</label>
                            <Input 
                              id="projectDesc" 
                              value={newProjectData.description}
                              onChange={e => setNewProjectData({...newProjectData, description: e.target.value})}
                              className="border-2 border-gray-300"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setShowAddProjectForm(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">Assign Project</Button>
                          </div>
                        </form>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 gap-4">
                      {MOCK_PROJECTS.slice(0, selectedEmployee.projects).map(project => (
                        <div key={project.id} className="border-2 border-gray-300 rounded-lg p-4 bg-white">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-semibold text-primary">{project.name}</h3>
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              project.status === "In Progress" 
                                ? "bg-blue-100 text-blue-700" 
                                : "bg-green-100 text-green-700"
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Deadline: {project.deadline}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card className="border-2 border-gray-300">
                  <CardHeader>
                    <CardTitle>Reviews & Uploads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText size={16} className="text-primary" />
                          <h3 className="font-semibold">Project Report - Website Redesign</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Uploaded on May 5, 2025
                        </p>
                        
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="clientFeedback" className="block text-sm font-medium mb-1">Client Feedback:</label>
                            <div className="p-3 bg-white border-2 border-gray-300 rounded-md">
                              <p>The design looks great, but we need to make a few adjustments to the color scheme.</p>
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="feedback1" className="block text-sm font-medium mb-1">Add Feedback:</label>
                            <Textarea 
                              id="feedback1" 
                              placeholder="Enter your feedback here..."
                              className="w-full border-2 border-gray-300"
                              value={feedbackContent["report1"] || ""}
                              onChange={(e) => setFeedbackContent(prev => ({...prev, report1: e.target.value}))}
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            reviewStatus['report1'] === 'Reviewed' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {reviewStatus['report1'] || 'Pending'}
                          </span>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleAddFeedback('report1')}>Add Feedback</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare size={16} className="text-primary" />
                          <h3 className="font-semibold">Weekly Status Update</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Submitted on May 8, 2025
                        </p>
                        
                        <div className="space-y-3">
                          <div className="bg-gray-50 p-3 rounded border-2 border-gray-300 text-sm">
                            <label htmlFor="statusUpdate" className="block text-sm font-medium mb-1">Weekly Update Status:</label>
                            <div className="p-3 bg-white border-2 border-gray-300 rounded-md">
                              <p>Completed the frontend development tasks and started integration with the API. Encountered some issues with the authentication flow that need to be discussed.</p>
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="feedback2" className="block text-sm font-medium mb-1">Add Comment:</label>
                            <Textarea 
                              id="feedback2" 
                              placeholder="Enter your comment here..."
                              className="w-full border-2 border-gray-300"
                              value={feedbackContent["status1"] || ""}
                              onChange={(e) => setFeedbackContent(prev => ({...prev, status1: e.target.value}))}
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            reviewStatus['status1'] === 'Reviewed' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {reviewStatus['status1'] || 'Pending'}
                          </span>
                          <Button size="sm" onClick={() => handleAddFeedback('status1')}>Add Comment</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="meetings">
                <Card className="border-2 border-gray-300">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Scheduled Meetings</CardTitle>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1"
                      onClick={() => setShowAddMeetingForm(true)}
                    >
                      <Calendar size={16} />
                      Schedule Meeting
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {showAddMeetingForm && (
                      <div className="mb-6 p-4 border-2 border-gray-300 rounded-lg bg-gray-50">
                        <h3 className="font-medium mb-3">Schedule New Meeting</h3>
                        <form onSubmit={handleAddMeeting} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="meetingTitle" className="text-sm font-medium">Title</label>
                              <Input 
                                id="meetingTitle" 
                                value={newMeetingData.title}
                                onChange={e => setNewMeetingData({...newMeetingData, title: e.target.value})}
                                required
                                className="border-2 border-gray-300"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="meetingDate" className="text-sm font-medium">Date</label>
                              <Input 
                                id="meetingDate" 
                                type="date"
                                value={newMeetingData.date}
                                onChange={e => setNewMeetingData({...newMeetingData, date: e.target.value})}
                                required
                                className="border-2 border-gray-300"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="meetingTime" className="text-sm font-medium">Time</label>
                              <Input 
                                id="meetingTime" 
                                type="time"
                                value={newMeetingData.time}
                                onChange={e => setNewMeetingData({...newMeetingData, time: e.target.value})}
                                required
                                className="border-2 border-gray-300"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="meetingLocation" className="text-sm font-medium">Location</label>
                              <Input 
                                id="meetingLocation" 
                                value={newMeetingData.location}
                                onChange={e => setNewMeetingData({...newMeetingData, location: e.target.value})}
                                placeholder="Virtual or physical location"
                                className="border-2 border-gray-300"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setShowAddMeetingForm(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">Schedule Meeting</Button>
                          </div>
                        </form>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      {meetings.map(meeting => (
                        <div key={meeting.id} className="flex justify-between items-center p-4 border-2 border-gray-300 rounded-lg bg-white">
                          <div>
                            <h3 className="font-medium text-primary">{meeting.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {meeting.date} at {meeting.time}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleOpenRescheduleMeeting(meeting)}
                            >
                              Reschedule
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleRemoveMeeting(meeting.id)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Reschedule Meeting Dialog */}
                <Dialog open={showRescheduleMeetingDialog} onOpenChange={setShowRescheduleMeetingDialog}>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Reschedule Meeting</DialogTitle>
                      <DialogDescription>
                        Update the meeting details below.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRescheduleMeeting} className="space-y-4">
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <label htmlFor="rescheduleTitle" className="text-sm font-medium">Title</label>
                          <Input 
                            id="rescheduleTitle" 
                            value={rescheduleMeetingData.title}
                            onChange={e => setRescheduleMeetingData({...rescheduleMeetingData, title: e.target.value})}
                            required
                            className="border-2 border-gray-300"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="rescheduleDate" className="text-sm font-medium">Date</label>
                            <Input 
                              id="rescheduleDate" 
                              type="date"
                              value={rescheduleMeetingData.date}
                              onChange={e => setRescheduleMeetingData({...rescheduleMeetingData, date: e.target.value})}
                              required
                              className="border-2 border-gray-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="rescheduleTime" className="text-sm font-medium">Time</label>
                            <Input 
                              id="rescheduleTime" 
                              type="time"
                              value={rescheduleMeetingData.time}
                              onChange={e => setRescheduleMeetingData({...rescheduleMeetingData, time: e.target.value})}
                              required
                              className="border-2 border-gray-300"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="rescheduleLocation" className="text-sm font-medium">Location</label>
                          <Input 
                            id="rescheduleLocation" 
                            value={rescheduleMeetingData.location}
                            onChange={e => setRescheduleMeetingData({...rescheduleMeetingData, location: e.target.value})}
                            placeholder="Virtual or physical location"
                            className="border-2 border-gray-300"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setShowRescheduleMeetingDialog(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </TabsContent>
              
              <TabsContent value="performance">
                <Card className="border-2 border-gray-300">
                  <CardHeader>
                    <CardTitle>Performance Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col gap-2">
                        <label className="font-medium">Quality of Work</label>
                        <Input type="range" min="1" max="100" defaultValue={selectedEmployee.performance} className="w-full" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>1</span>
                          <span>25</span>
                          <span>50</span>
                          <span>75</span>
                          <span>100</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="font-medium">Communication</label>
                        <Input type="range" min="1" max="100" defaultValue="80" className="w-full" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>1</span>
                          <span>25</span>
                          <span>50</span>
                          <span>75</span>
                          <span>100</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="font-medium">Teamwork</label>
                        <Input type="range" min="1" max="100" defaultValue="85" className="w-full" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>1</span>
                          <span>25</span>
                          <span>50</span>
                          <span>75</span>
                          <span>100</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="font-medium">Meeting Deadlines</label>
                        <Input type="range" min="1" max="100" defaultValue="70" className="w-full" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>1</span>
                          <span>25</span>
                          <span>50</span>
                          <span>75</span>
                          <span>100</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="font-medium block mb-2">Comments</label>
                        <Textarea 
                          placeholder="Add any additional performance feedback here..." 
                          className="w-full border-2 border-gray-300"
                          rows={4}
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveRatings}>
                          Save Ratings
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamLeaderDashboard;
