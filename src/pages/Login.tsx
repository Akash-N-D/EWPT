
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

// Mock user data - in a real app, you would use a proper auth system
const MOCK_USERS = [
  { username: "leader1", email: "leader1@tech.com", password: "password", role: "teamleader" },
  { username: "employee1", email: "employee1@tech.com", password: "password", role: "employee" },
  { username: "employee2", email: "employee2@tech.com", password: "password", role: "employee" },
];

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = MOCK_USERS.find(
      (u) => u.email === formData.email && u.password === formData.password
    );
    
    if (user) {
      // Store user data in local storage - in a real app, use tokens with proper security
      localStorage.setItem("user", JSON.stringify({
        username: user.username,
        email: user.email,
        role: user.role,
      }));
      
      // Redirect based on role
      if (user.role === "teamleader") {
        navigate("/teamleader/profile");
      } else {
        navigate("/employee/profile");
      }
      
      toast({
        title: "Login Successful",
        description: `Welcome ${user.username}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center text-primary mb-6 gap-2">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Demo accounts:</p>
                <p>Team Leader: leader1@tech.com / password</p>
                <p>Employee: employee1@tech.com / password</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
