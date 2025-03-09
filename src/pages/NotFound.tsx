
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-sand-light dark:bg-gray-900 flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-qanelas font-bold text-kidsgo-brown mb-4 dark:text-white">404</h1>
          <p className="text-xl text-kidsgo-brown/70 mb-8 dark:text-gray-300">Oops! The page you're looking for doesn't exist.</p>
          <Button asChild className="bg-kidsgo-brown hover:bg-kidsgo-brown/90 text-white rounded-full">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
