
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getCompany, getActivitiesByCompany } from "@/lib/activity-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Menu, X, MapPin, Calendar, Phone, Mail, Globe, Star, Filter } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Get the company and its activities
  const company = id ? getCompany(id) : undefined;
  const activities = id ? getActivitiesByCompany(id) : [];
  
  // If company not found, show error state
  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-light dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">Company Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The company you're looking for doesn't exist or has been removed.</p>
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

  // Get all unique categories from activities
  const categories = Array.from(
    new Set(activities.flatMap(activity => activity.categories))
  );

  // Filter activities by category if selected
  const filteredActivities = selectedCategory 
    ? activities.filter(activity => activity.categories.includes(selectedCategory))
    : activities;

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
          Back to Companies
        </Link>
      </div>
      
      {/* Company Header */}
      <section className="bg-white dark:bg-gray-800 py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={company.logo} 
                alt={company.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl font-medium text-gray-900 dark:text-white mb-2">{company.name}</h1>
              <div className="flex items-center gap-6 mb-2">
                <div className="flex items-center">
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">{company.rating.toFixed(1)}</span>
                  <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">({company.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="text-craft-dark dark:text-craft-light mr-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{company.location}</span>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{company.description}</p>
              <div className="flex flex-wrap gap-2">
                {company.categories.map((category, idx) => (
                  <Badge key={idx} variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 min-w-[200px]">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-craft-dark dark:text-craft-light" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{company.contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-craft-dark dark:text-craft-light" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{company.contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-craft-dark dark:text-craft-light" />
                <a 
                  href={company.contactInfo.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-craft dark:text-craft-light hover:underline"
                >
                  Visit website
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Activities Section */}
      <section className="py-12 bg-sand-light dark:bg-gray-900">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white">Activities by {company.name}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1 border-craft text-craft-dark dark:border-craft-light dark:text-craft-light">
                <Filter size={16} />
                <span>Filters</span>
              </Button>
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Badge 
              className={`cursor-pointer ${!selectedCategory ? 'bg-craft hover:bg-craft-dark dark:bg-craft dark:hover:bg-craft-dark' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge 
                key={category} 
                className={`cursor-pointer ${selectedCategory === category ? 'bg-craft hover:bg-craft-dark dark:bg-craft dark:hover:bg-craft-dark' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          {/* Activities Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredActivities.map((activity) => (
              <Link 
                key={activity.id}
                to={`/activity/${activity.id}`}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
              >
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-700 w-full">
                  <img
                    src={`${activity.imageUrls[0]}?w=600&h=450&fit=crop&auto=format&q=75`}
                    alt={activity.title}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 h-full w-full"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                  <div className="absolute bottom-3 left-3 flex space-x-1">
                    {activity.categories.slice(0, 2).map((category, idx) => (
                      <Badge key={idx} className="bg-craft/80 text-white text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block rounded-full bg-craft-pastel dark:bg-craft-dark/30 px-3 py-1 text-xs font-medium text-craft-dark dark:text-craft-light">
                      {activity.ageRange}
                    </span>
                    <div className="flex items-center">
                      <Star size={16} className="fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{activity.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white line-clamp-2 h-14">{activity.title}</h3>
                  <div className="mt-2 flex items-center text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="mr-1 flex-shrink-0" />
                    <span className="text-sm truncate">{activity.location}</span>
                  </div>
                  <div className="mt-2 flex items-center text-gray-500 dark:text-gray-400">
                    <Calendar size={16} className="mr-1 flex-shrink-0" />
                    <span className="text-sm truncate">{activity.dateRange}</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2 flex-grow">{activity.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{activity.priceRange}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-craft dark:text-craft-light hover:text-craft-dark dark:hover:text-craft hover:bg-craft-pastel dark:hover:bg-craft-dark/30"
                    >
                      View Details →
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">No activities found</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Try changing your filter criteria</p>
            </div>
          )}
        </div>
      </section>
      
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

export default CompanyDetail;
