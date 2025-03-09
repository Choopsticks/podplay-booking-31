
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sampleActivities, sampleCompanies } from "@/lib/activity-data";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Star, Filter, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const LetterDecoration = ({ letter, color, className, style }: { letter: string; color: string; className?: string; style?: React.CSSProperties }) => (
  <div className={`letter-decoration font-qanelas text-4xl font-bold ${className}`} style={{ color, ...style }}>
    {letter}
  </div>
);

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCompanies, setShowCompanies] = useState(true);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Get all unique categories
  const categories = Array.from(
    new Set(sampleActivities.flatMap(activity => activity.categories))
  );

  // Filter activities based on search and category
  const filteredActivities = sampleActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          activity.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? activity.categories.includes(selectedCategory) : true;
    
    return matchesSearch && matchesCategory;
  });

  // Filter companies based on search and category
  const filteredCompanies = sampleCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          company.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? company.categories.includes(selectedCategory) : true;
    
    return matchesSearch && matchesCategory;
  });

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

  // Get category badge color
  const getCategoryBadgeClass = (category: string) => {
    const categoryMap: Record<string, string> = {
      "Arts & Crafts": "arts",
      "Sports": "sports",
      "Educational": "education",
      "Outdoor": "outdoor",
      "Entertainment": "entertainment"
    };

    return categoryMap[category] || "arts";
  };

  return (
    <div className="min-h-screen bg-sand-light dark:bg-gray-900 overflow-x-hidden">
      <header className="border-b border-kidsgo-brown/10 bg-white dark:bg-gray-800 dark:border-gray-700 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-qanelas font-extrabold text-kidsgo-brown dark:text-kidsgo-brown">
              <span className="text-kidsgo-brown">Kids</span><span className="text-kidsgo-coral">Go</span> <span className="text-kidsgo-purple text-base font-semibold">Philippines</span>
            </span>
          </div>
          <nav>
            <ul className="flex items-center gap-8">
              <li>
                <a href="#" className="text-sm font-medium text-kidsgo-brown dark:text-sand-light transition-colors hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">
                  Activities
                </a>
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
          <div className="flex items-center gap-4">
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
        </div>
      </header>

      <section className="py-16 bg-sand-light dark:bg-gray-900 overflow-hidden relative">
        {/* Decorative elements */}
        <LetterDecoration letter="A" color="#f06f5d" className="top-12 left-[5%]" style={{ '--rotation': '-15deg', '--delay': '0s' } as React.CSSProperties} />
        <LetterDecoration letter="B" color="#425e9c" className="top-24 right-[8%]" style={{ '--rotation': '10deg', '--delay': '0.5s' } as React.CSSProperties} />
        <LetterDecoration letter="C" color="#ad59b0" className="bottom-12 left-[12%]" style={{ '--rotation': '8deg', '--delay': '1s' } as React.CSSProperties} />
        <LetterDecoration letter="Y" color="#41dbbe" className="top-32 left-[25%]" style={{ '--rotation': '-5deg', '--delay': '1.5s' } as React.CSSProperties} />
        <LetterDecoration letter="X" color="#f3ee16" className="bottom-32 right-[15%]" style={{ '--rotation': '12deg', '--delay': '2s' } as React.CSSProperties} />
        <LetterDecoration letter="Z" color="#26902a" className="bottom-16 right-[30%]" style={{ '--rotation': '-8deg', '--delay': '2.5s' } as React.CSSProperties} />
        
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-qanelas font-bold leading-tight text-kidsgo-brown dark:text-white md:text-5xl">
              Discover Kid-Friendly Activities in the Philippines
            </h1>
            <p className="mt-6 text-xl text-kidsgo-brown/80 dark:text-gray-300">
              Find the best experiences for children of all ages
            </p>
            <div className="mt-8 relative">
              <div className="flex">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kidsgo-brown/40" size={18} />
                  <Input 
                    placeholder="Search activities, locations, or categories..." 
                    className="pl-10 pr-4 py-6 rounded-l-full dark:bg-gray-800 dark:text-white dark:border-gray-700 w-full border-kidsgo-brown/20 focus:border-kidsgo-brown focus:ring-kidsgo-brown"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="bg-kidsgo-coral hover:bg-kidsgo-coral/90 dark:bg-kidsgo-coral dark:hover:bg-kidsgo-coral/90 rounded-l-none rounded-r-full">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="wave-bottom"></div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-qanelas font-bold text-kidsgo-brown dark:text-white">
                {showCompanies ? "Featured Companies" : "Featured Activities"}
              </h2>
              <div className="flex border border-kidsgo-brown/20 dark:border-gray-600 rounded-full overflow-hidden">
                <Button 
                  variant={showCompanies ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-none ${showCompanies ? 'bg-kidsgo-brown hover:bg-kidsgo-brown/90 text-white' : 'text-kidsgo-brown dark:text-gray-300 hover:text-kidsgo-brown dark:hover:text-white'}`}
                  onClick={() => setShowCompanies(true)}
                >
                  Companies
                </Button>
                <Button 
                  variant={!showCompanies ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-none ${!showCompanies ? 'bg-kidsgo-brown hover:bg-kidsgo-brown/90 text-white' : 'text-kidsgo-brown dark:text-gray-300 hover:text-kidsgo-brown dark:hover:text-white'}`}
                  onClick={() => setShowCompanies(false)}
                >
                  Activities
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1 border-kidsgo-brown text-kidsgo-brown dark:border-kidsgo-brown dark:text-kidsgo-brown hover:bg-kidsgo-brown/10">
                <Filter size={16} />
                <span>Filters</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <Badge 
              className={`cursor-pointer rounded-full ${!selectedCategory ? 'bg-kidsgo-brown hover:bg-kidsgo-brown/90 text-white dark:bg-kidsgo-brown dark:hover:bg-kidsgo-brown/90' : 'bg-gray-100 text-kidsgo-brown hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge 
                key={category} 
                className={`cursor-pointer rounded-full ${selectedCategory === category ? 'bg-kidsgo-brown hover:bg-kidsgo-brown/90 text-white dark:bg-kidsgo-brown dark:hover:bg-kidsgo-brown/90' : 'bg-gray-100 text-kidsgo-brown hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {showCompanies ? (
            // Companies Grid
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCompanies.map((company) => (
                <Link 
                  key={company.id}
                  to={`/company/${company.id}`}
                  className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-kidsgo-brown/10 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
                >
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl bg-sand-light dark:bg-gray-700 w-full">
                    <img
                      src={`${company.logo}?w=600&h=450&fit=crop&auto=format&q=75`}
                      alt={company.name}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 h-full w-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                    <div className="absolute bottom-3 left-3 flex space-x-1">
                      {company.categories.slice(0, 2).map((category, idx) => (
                        <span key={idx} className={`category-badge ${getCategoryBadgeClass(category)}`}>
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star size={16} className="fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{company.rating.toFixed(1)}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({company.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-qanelas font-bold text-kidsgo-brown dark:text-white line-clamp-1">{company.name}</h3>
                    <div className="mt-2 flex items-center text-kidsgo-brown/60 dark:text-gray-400">
                      <MapPin size={16} className="mr-1 flex-shrink-0" />
                      <span className="text-sm truncate">{company.location}</span>
                    </div>
                    <div className="mt-2 flex items-center text-kidsgo-brown/60 dark:text-gray-400">
                      <Building size={16} className="mr-1 flex-shrink-0" />
                      <span className="text-sm">Multiple Activities</span>
                    </div>
                    <p className="mt-3 text-sm text-kidsgo-brown/80 dark:text-gray-300 line-clamp-2 flex-grow">{company.description}</p>
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-kidsgo-coral dark:text-kidsgo-coral hover:text-kidsgo-coral/80 dark:hover:text-kidsgo-coral/80 hover:bg-kidsgo-coral/10 dark:hover:bg-kidsgo-coral/20 rounded-full"
                      >
                        View Company →
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // Activities Grid
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredActivities.map((activity) => (
                <Link 
                  key={activity.id}
                  to={`/activity/${activity.id}`}
                  className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-kidsgo-brown/10 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
                >
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl bg-sand-light dark:bg-gray-700 w-full">
                    <img
                      src={`${activity.imageUrls[0]}?w=600&h=450&fit=crop&auto=format&q=75`}
                      alt={activity.title}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 h-full w-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                    <div className="absolute bottom-3 left-3 flex space-x-1">
                      {activity.categories.slice(0, 2).map((category, idx) => (
                        <span key={idx} className={`category-badge ${getCategoryBadgeClass(category)}`}>
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block rounded-full bg-kidsgo-teal/20 px-3 py-1 text-xs font-medium text-kidsgo-teal dark:bg-kidsgo-teal/30 dark:text-kidsgo-teal">
                        {activity.ageRange}
                      </span>
                      <div className="flex items-center">
                        <Star size={16} className="fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{activity.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-qanelas font-bold text-kidsgo-brown dark:text-white line-clamp-2 h-14">{activity.title}</h3>
                    <div className="mt-2 flex items-center text-kidsgo-brown/60 dark:text-gray-400">
                      <MapPin size={16} className="mr-1 flex-shrink-0" />
                      <span className="text-sm truncate">{activity.location}</span>
                    </div>
                    <div className="mt-2 flex items-center text-kidsgo-brown/60 dark:text-gray-400">
                      <Calendar size={16} className="mr-1 flex-shrink-0" />
                      <span className="text-sm truncate">{activity.dateRange}</span>
                    </div>
                    <p className="mt-3 text-sm text-kidsgo-brown/80 dark:text-gray-300 line-clamp-2 flex-grow">{activity.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-medium text-kidsgo-brown dark:text-white">{activity.priceRange}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-kidsgo-coral dark:text-kidsgo-coral hover:text-kidsgo-coral/80 dark:hover:text-kidsgo-coral/80 hover:bg-kidsgo-coral/10 dark:hover:bg-kidsgo-coral/20 rounded-full"
                      >
                        View Details →
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {(showCompanies && filteredCompanies.length === 0) || (!showCompanies && filteredActivities.length === 0) ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-qanelas font-bold text-kidsgo-brown dark:text-white">
                No {showCompanies ? "companies" : "activities"} found
              </h3>
              <p className="mt-2 text-kidsgo-brown/70 dark:text-gray-300">Try changing your search or filter criteria</p>
            </div>
          ) : null}
        </div>
      </section>

      <footer className="bg-sand-light dark:bg-gray-800 py-12 border-t border-kidsgo-brown/10 dark:border-gray-700 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <span className="text-xl font-qanelas font-extrabold">
                <span className="text-kidsgo-brown">Kids</span><span className="text-kidsgo-coral">Go</span> <span className="text-kidsgo-purple text-base font-semibold">Philippines</span>
              </span>
              <p className="mt-4 text-sm text-kidsgo-brown/70 dark:text-gray-300">Connecting families with enriching experiences for children across the Philippines.</p>
            </div>
            <div>
              <h3 className="font-qanelas font-bold text-kidsgo-brown dark:text-white">Explore</h3>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-sm text-kidsgo-brown/70 dark:text-gray-300 hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">Popular Activities</a></li>
                <li><a href="#" className="text-sm text-kidsgo-brown/70 dark:text-gray-300 hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">By Location</a></li>
                <li><a href="#" className="text-sm text-kidsgo-brown/70 dark:text-gray-300 hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">By Category</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-qanelas font-bold text-kidsgo-brown dark:text-white">Support</h3>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-sm text-kidsgo-brown/70 dark:text-gray-300 hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">Contact Us</a></li>
                <li><a href="#" className="text-sm text-kidsgo-brown/70 dark:text-gray-300 hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">FAQs</a></li>
                <li><a href="#" className="text-sm text-kidsgo-brown/70 dark:text-gray-300 hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-qanelas font-bold text-kidsgo-brown dark:text-white">Stay Updated</h3>
              <p className="mt-4 text-sm text-kidsgo-brown/70 dark:text-gray-300">Subscribe to our newsletter for new activities and updates.</p>
              <div className="mt-4 flex">
                <Input type="email" placeholder="Your email" className="w-full rounded-l-full dark:bg-gray-700 dark:border-gray-600 border-kidsgo-brown/20" />
                <Button className="rounded-l-none rounded-r-full bg-kidsgo-coral hover:bg-kidsgo-coral/90 dark:bg-kidsgo-coral dark:hover:bg-kidsgo-coral/90">
                  Join
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative wave bottom */}
        <LetterDecoration letter="P" color="#f06f5d" className="bottom-10 right-[8%]" style={{ '--rotation': '12deg', '--delay': '0.7s' } as React.CSSProperties} />
        <LetterDecoration letter="Q" color="#425e9c" className="bottom-32 left-[10%]" style={{ '--rotation': '-8deg', '--delay': '1.2s' } as React.CSSProperties} />
      </footer>
    </div>
  );
};

export default Index;
