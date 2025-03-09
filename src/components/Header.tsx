
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
      });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b border-kidsgo-brown/10 bg-white dark:bg-gray-800 dark:border-gray-700 backdrop-blur-sm sticky top-0 z-10">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-qanelas font-extrabold text-kidsgo-brown dark:text-kidsgo-brown">
            <span className="text-kidsgo-brown">Kids</span><span className="text-kidsgo-coral">Go</span> <span className="text-kidsgo-purple text-base font-semibold">Philippines</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>
              <Link to="/" className="text-sm font-medium text-kidsgo-brown dark:text-sand-light transition-colors hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">
                Activities
              </Link>
            </li>
            <li>
              <a href="#" className="text-sm font-medium text-kidsgo-brown dark:text-sand-light transition-colors hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">
                Destinations
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium text-kidsgo-brown dark:text-sand-light transition-colors hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">
                Submit Activity
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          {isLoading ? (
            <div className="h-9 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md"></div>
          ) : user ? (
            <>
              <span className="text-sm text-kidsgo-brown dark:text-sand-light">Hi, {user.email?.split('@')[0]}</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-kidsgo-coral text-kidsgo-coral hover:bg-kidsgo-coral/10 dark:border-kidsgo-coral dark:text-kidsgo-coral dark:hover:bg-kidsgo-coral/20"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-kidsgo-coral text-kidsgo-coral hover:bg-kidsgo-coral/10 dark:border-kidsgo-coral dark:text-kidsgo-coral"
                onClick={() => navigate("/auth")}
              >
                Log In
              </Button>
              <Button 
                size="sm" 
                className="bg-kidsgo-brown hover:bg-kidsgo-brown/90 text-white rounded-full"
                onClick={() => navigate("/auth", { state: { isSignUp: true } })}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-kidsgo-brown dark:text-sand-light" 
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 py-4 border-t border-kidsgo-brown/10 dark:border-gray-700 animate-fade-down absolute w-full z-20">
          <div className="container">
            <nav className="space-y-4">
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="block text-kidsgo-brown dark:text-sand-light hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">
                    Activities
                  </Link>
                </li>
                <li>
                  <a href="#" className="block text-kidsgo-brown dark:text-sand-light hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">
                    Destinations
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-kidsgo-brown dark:text-sand-light hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">
                    Submit Activity
                  </a>
                </li>
              </ul>
              <div className="flex flex-col gap-2 pt-2">
                {isLoading ? (
                  <div className="h-9 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md"></div>
                ) : user ? (
                  <>
                    <span className="text-sm text-kidsgo-brown dark:text-sand-light">Hi, {user.email?.split('@')[0]}</span>
                    <Button 
                      variant="outline"
                      className="w-full border-kidsgo-coral text-kidsgo-coral hover:bg-kidsgo-coral/10 dark:border-kidsgo-coral dark:text-kidsgo-coral dark:hover:bg-kidsgo-coral/20 justify-center"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full border-kidsgo-coral text-kidsgo-coral hover:bg-kidsgo-coral/10 dark:border-kidsgo-coral dark:text-kidsgo-coral justify-center"
                      onClick={() => navigate("/auth")}
                    >
                      Log In
                    </Button>
                    <Button 
                      className="w-full bg-kidsgo-brown hover:bg-kidsgo-brown/90 text-white rounded-full justify-center"
                      onClick={() => navigate("/auth", { state: { isSignUp: true } })}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
