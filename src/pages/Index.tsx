
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm p-3">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">TechM</h1>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="flex-grow flex items-center">
        <div className="container px-4 py-5 mx-auto">
          <div className="mx-auto text-center max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 text-primary">Employee Work Performance Tracker</h1>
            <p className="text-lg text-gray-600 mb-5">
              Track employee progress, manage takss, and improve team performance with our comprehensive dashboard solution.
            </p>
            
            <div className="my-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 text-primary">Task Management</h3>
                  <p className="text-gray-600">Assign tasks to team members and track their progress</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 text-primary">Performance Analytics</h3>
                  <p className="text-gray-600">Analyze employee performance with detailed charts and metrics</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 text-primary">Team Collaboration</h3>
                  <p className="text-gray-600">Streamline communication between team leaders and employees</p>
                </div>
              </div>
              
              <Link to="/login">
                <Button className="mt-5 inline-flex items-center gap-2 bg-primary hover:bg-primary-light">
                  Get Started <ChevronRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-50 py-4">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} TechM | Employee Work Performance Tracker</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
