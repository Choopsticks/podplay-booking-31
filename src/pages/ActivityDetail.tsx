import React, { useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { sampleActivity } from "@/lib/activity-data";
import { TimeSlot } from "@/lib/activity-data";
import ActivityHero from "@/components/ActivityHero";
import ActivityDescription from "@/components/ActivityDescription";
import ActivityCalendar from "@/components/ActivityCalendar";
import ReviewSection from "@/components/ReviewSection";
import BookingForm from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // In a real app, you would fetch the activity by ID from an API
  // For now, we'll just use our sample activity
  const activity = sampleActivity;
  
  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
    
    // Scroll to the booking form
    setTimeout(() => {
      if (bookingRef.current) {
        bookingRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  
  const handleBookNowClick = () => {
    // Scroll to the calendar section
    const calendarSection = document.getElementById("booking");
    if (calendarSection) {
      calendarSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleCloseBookingForm = () => {
    setSelectedTimeSlot(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
  
  return (
    <div className="min-h-screen bg-sand-light">
      <header className="border-b border-sand-dark/20 bg-white backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-semibold text-craft-dark">LittleBranch</Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <a href="#" className="text-sm text-gray-600 transition-colors hover:text-craft-dark">
                  Explore
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 transition-colors hover:text-craft-dark">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 transition-colors hover:text-craft-dark">
                  For Educators
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            {isLoading ? (
              <div className="h-9 w-16 bg-gray-200 animate-pulse rounded-md"></div>
            ) : user ? (
              <>
                <span className="text-sm text-gray-600">Hi, {user.email?.split('@')[0]}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-craft text-craft-dark hover:bg-craft-pastel hover:text-craft-dark"
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
                  className="border-craft text-craft-dark hover:bg-craft-pastel hover:text-craft-dark"
                  onClick={() => navigate("/auth")}
                >
                  Log In
                </Button>
                <Button 
                  size="sm" 
                  className="bg-craft hover:bg-craft-dark"
                  onClick={() => navigate("/auth", { state: { isSignUp: true } })}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-4 border-t border-gray-100 animate-fade-down absolute w-full z-20">
            <div className="container">
              <nav className="space-y-4">
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="block text-gray-600 hover:text-craft-dark">
                      Explore
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block text-gray-600 hover:text-craft-dark">
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block text-gray-600 hover:text-craft-dark">
                      For Educators
                    </a>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 pt-2">
                  {isLoading ? (
                    <div className="h-9 w-full bg-gray-200 animate-pulse rounded-md"></div>
                  ) : user ? (
                    <>
                      <span className="text-sm text-gray-600">Hi, {user.email?.split('@')[0]}</span>
                      <Button 
                        variant="outline"
                        className="w-full border-craft text-craft-dark justify-center hover:bg-craft-pastel hover:text-craft-dark"
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full border-craft text-craft-dark justify-center hover:bg-craft-pastel hover:text-craft-dark"
                        onClick={() => navigate("/auth")}
                      >
                        Log In
                      </Button>
                      <Button 
                        className="w-full bg-craft hover:bg-craft-dark justify-center"
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
      
      <div className="container py-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-craft-dark">
          <ChevronLeft size={14} />
          Back to Activities
        </Link>
      </div>
      
      <ActivityHero activity={activity} handleBookNowClick={handleBookNowClick} />
      
      <ActivityDescription activity={activity} />
      
      <ActivityCalendar activity={activity} onSelectTimeSlot={handleTimeSlotSelect} />
      
      {selectedTimeSlot && (
        <div className="bg-sand-light py-12" ref={bookingRef}>
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <BookingForm
                activity={activity}
                selectedTimeSlot={selectedTimeSlot}
                onClose={handleCloseBookingForm}
              />
            </div>
          </div>
        </div>
      )}
      
      <ReviewSection activity={activity} />
      
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <span className="text-xl font-semibold text-craft-dark">LittleBranch</span>
              <p className="mt-4 text-sm text-gray-600">Connecting families with enriching learning experiences for children.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Company</h3>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-craft-dark">About</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-craft-dark">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-craft-dark">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Support</h3>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-craft-dark">Contact Us</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-craft-dark">FAQs</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-craft-dark">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Stay Updated</h3>
              <p className="mt-4 text-sm text-gray-600">Subscribe to our newsletter for new activities and updates.</p>
              <div className="mt-4 flex">
                <Input type="email" placeholder="Your email" className="w-full rounded-l-md" />
                <Button className="rounded-l-none rounded-r-md bg-craft hover:bg-craft-dark">
                  Join
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ActivityDetail;
