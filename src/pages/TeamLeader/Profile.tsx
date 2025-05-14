
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, LayoutDashboard, UserIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

const TeamLeaderProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string; email: string; role: string } | null>(null);

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Team Leader Profile</CardTitle>
              <Button variant="outline" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt={user.username} />
                  <AvatarFallback>
                    <UserIcon className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{user.username}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">Team Leader</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-6">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium">Department</h3>
                    <p>Software Development</p>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium">Team Size</h3>
                    <p>5 Members</p>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium">Active Projects</h3>
                    <p>3 Projects</p>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium">Experience</h3>
                    <p>5+ Years</p>
                  </div>
                </div>
                
                <Link to="/teamleader/dashboard">
                  <Button className="mt-6 gap-2">
                    <LayoutDashboard size={18} />
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamLeaderProfile;
