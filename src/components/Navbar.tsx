
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ role: string } | null>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  const handleBackClick = () => {
    const path = window.location.pathname;
    
    if (path.includes("/dashboard")) {
      if (user?.role === "teamleader") {
        navigate("/teamleader/profile");
      } else {
        navigate("/employee/profile");
      }
    } else {
      navigate("/");
    }
  };
  
  return (
    <nav className="bg-white shadow-sm p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackClick}
            className="mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Link to="/" className="text-2xl font-bold text-primary">TechM</Link>
        </div>
        
        {user && (
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
