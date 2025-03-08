
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getActivity } from "@/lib/activity-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Menu, X, MapPin, Calendar, Clock, Phone, Mail, Globe, Star, Share2, Heart, Info } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import ActivityDescription from "@/components/ActivityDescription";
import ReviewSection from "@/components/ReviewSection";

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Get the activity by ID
  const activity = id ? getActivity(Number(id)) : undefined;
  
  // If activity not found, show error state
  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-light dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">Activity Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The activity you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-craft hover:bg-craft-dark dark:bg-craft dark:hover:bg-craft-dark"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

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
  
  const handleSaveActivity = () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to save activities",
        variant: "default",
      });
      return;
    }
    
    toast({
      title: "Activity saved!",
      description: `${activity.title} has been added to your saved activities.`,
      variant: "default",
    });
  };
  
  const handleShareActivity = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Activity link has been copied to clipboard",
      variant: "default",
    });
  };
  
  return (
    <div className="min-h-screen bg-sand-light dark:bg-gray-900">
      <header className="border-b border-sand-dark/20 bg-white dark:bg-gray-800 dark:border-gray-700 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-semibold text-craft-dark dark:text-craft-light">KidsGo Philippines</Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-300 transition-colors hover:text-craft-dark dark:hover:text-craft-light">
                  Activities
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-300 transition-colors hover:text-craft-dark dark:hover:text-craft-light">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-300 transition-colors hover:text-craft-dark dark:hover:text-craft-light">
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
                <span className="text-sm text-gray-600 dark:text-gray-300">Hi, {user.email?.split('@')[0]}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-craft text-craft-dark dark:border-craft-light dark:text-craft-light hover:bg-craft-pastel dark:hover:bg-gray-700 hover:text-craft-dark"
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
                  className="border-craft text-craft-dark dark:border-craft-light dark:text-craft-light hover:bg-craft-pastel dark:hover:bg-gray-700 hover:text-craft-dark"
                  onClick={() => navigate("/auth")}
                >
                  Log In
                </Button>
                <Button 
                  size="sm" 
                  className="bg-craft hover:bg-craft-dark dark:bg-craft dark:hover:bg-craft-dark"
                  onClick={() => navigate("/auth", { state: { isSignUp: true } })}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 dark:text-gray-300" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 py-4 border-t border-gray-100 dark:border-gray-700 animate-fade-down absolute w-full z-20">
            <div className="container">
              <nav className="space-y-4">
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-craft-dark dark:hover:text-craft-light">
                      Activities
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-craft-dark dark:hover:text-craft-light">
                      Destinations
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-craft-dark dark:hover:text-craft-light">
                      Submit Activity
                    </a>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 pt-2">
                  {isLoading ? (
                    <div className="h-9 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md"></div>
                  ) : user ? (
                    <>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Hi, {user.email?.split('@')[0]}</span>
                      <Button 
                        variant="outline"
                        className="w-full border-craft text-craft-dark dark:border-craft-light dark:text-craft-light justify-center hover:bg-craft-pastel dark:hover:bg-gray-700 hover:text-craft-dark"
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full border-craft text-craft-dark dark:border-craft-light dark:text-craft-light justify-center hover:bg-craft-pastel dark:hover:bg-gray-700 hover:text-craft-dark"
                        onClick={() => navigate("/auth")}
                      >
                        Log In
                      </Button>
                      <Button 
                        className="w-full bg-craft hover:bg-craft-dark dark:bg-craft dark:hover:bg-craft-dark justify-center"
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
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 transition-colors hover:text-craft-dark dark:hover:text-craft-light">
          <ChevronLeft size={14} />
          Back to Activities
        </Link>
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-800">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 lg:order-1">
              <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-craft-pastel dark:bg-craft-dark/30 px-3 py-0.5 text-sm font-medium text-craft-dark dark:text-craft-light">
                    {activity.ageRange}
                  </span>
                  {activity.categories.map((category, idx) => (
                    <Badge key={idx} variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                      {category}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-3xl font-medium text-gray-900 dark:text-white md:text-4xl">{activity.title}</h1>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">{activity.rating.toFixed(1)}</span>
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">({activity.reviews.length} reviews)</span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 dark:text-gray-300">{activity.description}</p>
                
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-craft-dark dark:text-craft-light" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-craft-dark dark:text-craft-light" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{activity.dateRange}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-craft-dark dark:text-craft-light" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{activity.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-craft-dark dark:text-craft-light" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{activity.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-craft-dark dark:text-craft-light" />
                    <a 
                      href={activity.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-craft dark:text-craft-light hover:underline"
                    >
                      Visit website
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-4">
                  <div className="text-2xl font-medium text-gray-900 dark:text-white">{activity.priceRange}</div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={handleSaveActivity} 
                      className="flex items-center gap-1 border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
                    >
                      <Heart size={16} />
                      <span>Save</span>
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handleShareActivity} 
                      className="flex items-center gap-1 border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative aspect-h-3 aspect-w-5 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-700 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                {activity.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={`${url}?w=800&auto=format&q=75`}
                    alt={`${activity.title} - Image ${index + 1}`}
                    className={`h-full w-full object-cover transition-opacity duration-300 ${
                      index === activeImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ position: index === 0 ? "relative" : "absolute" }}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                ))}
                
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {activity.imageUrls.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        index === activeImageIndex ? "bg-white scale-125" : "bg-white/50"
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ActivityDescription activity={activity} />
      
      <ReviewSection activity={activity} />
      
      <footer className="bg-gray-50 dark:bg-gray-800 py-12 border-t border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <span className="text-xl font-semibold text-craft-dark dark:text-craft-light">KidsGo Philippines</span>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Connecting families with enriching experiences for children across the Philippines.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Explore</h3>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-craft-dark dark:hover:text-craft-light">Popular Activities</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-craft-dark dark:hover:text-craft-light">By Location</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-craft-dark dark:hover:text-craft-light">By Category</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Support</h3>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-craft-dark dark:hover:text-craft-light">Contact Us</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-craft-dark dark:hover:text-craft-light">FAQs</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-craft-dark dark:hover:text-craft-light">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Stay Updated</h3>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Subscribe to our newsletter for new activities and updates.</p>
              <div className="mt-4 flex">
                <Input type="email" placeholder="Your email" className="w-full rounded-l-md dark:bg-gray-700 dark:border-gray-600" />
                <Button className="rounded-l-none rounded-r-md bg-craft hover:bg-craft-dark dark:bg-craft dark:hover:bg-craft-dark">
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
