
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getActivity } from "@/lib/activity-data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Star, Share2, Heart, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import ActivityDescription from "@/components/ActivityDescription";
import ReviewSection from "@/components/ReviewSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { MapPin, Calendar, Clock, Phone, Mail, Globe } from "lucide-react";

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Get the activity by ID
  const activity = getActivity(id);
  
  // If activity not found, show error state
  if (!activity) {
    return (
      <div className="min-h-screen bg-sand-light dark:bg-gray-900">
        <Header />
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-medium text-kidsgo-brown dark:text-white mb-4">Activity Not Found</h2>
          <p className="text-kidsgo-brown/70 dark:text-gray-300 mb-6">The activity you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-kidsgo-brown hover:bg-kidsgo-brown/90 text-white"
          >
            Back to Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
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
      <Header />
      
      <div className="container py-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-kidsgo-brown/70 dark:text-gray-300 transition-colors hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">
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
                  <span className="inline-flex items-center rounded-full bg-kidsgo-teal/20 px-3 py-0.5 text-sm font-medium text-kidsgo-teal dark:bg-kidsgo-teal/30 dark:text-kidsgo-teal">
                    {activity.ageRange}
                  </span>
                  {activity.categories.map((category, idx) => (
                    <Badge key={idx} variant="outline" className="text-kidsgo-brown dark:text-gray-300 border-kidsgo-brown/20 dark:border-gray-600">
                      {category}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-3xl font-qanelas font-bold text-kidsgo-brown dark:text-white md:text-4xl">{activity.title}</h1>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium text-kidsgo-brown dark:text-white">{activity.rating.toFixed(1)}</span>
                    <span className="ml-1 text-sm text-kidsgo-brown/50 dark:text-gray-400">({activity.reviews.length} reviews)</span>
                  </div>
                </div>
                
                <p className="text-lg text-kidsgo-brown/80 dark:text-gray-300">{activity.description}</p>
                
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-kidsgo-brown dark:text-kidsgo-brown/80" />
                    <span className="text-sm text-kidsgo-brown/70 dark:text-gray-300">{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-kidsgo-brown dark:text-kidsgo-brown/80" />
                    <span className="text-sm text-kidsgo-brown/70 dark:text-gray-300">{activity.dateRange}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-kidsgo-brown dark:text-kidsgo-brown/80" />
                    <span className="text-sm text-kidsgo-brown/70 dark:text-gray-300">{activity.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-kidsgo-brown dark:text-kidsgo-brown/80" />
                    <span className="text-sm text-kidsgo-brown/70 dark:text-gray-300">{activity.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-kidsgo-brown dark:text-kidsgo-brown/80" />
                    <a 
                      href={activity.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-kidsgo-coral dark:text-kidsgo-coral hover:underline"
                    >
                      Visit website
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-4">
                  <div className="text-2xl font-medium text-kidsgo-brown dark:text-white">{activity.priceRange}</div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={handleSaveActivity} 
                      className="flex items-center gap-1 border-kidsgo-brown/20 text-kidsgo-brown dark:border-gray-600 dark:text-gray-300"
                    >
                      <Heart size={16} />
                      <span>Save</span>
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handleShareActivity} 
                      className="flex items-center gap-1 border-kidsgo-brown/20 text-kidsgo-brown dark:border-gray-600 dark:text-gray-300"
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative aspect-h-3 aspect-w-5 overflow-hidden rounded-xl bg-sand-light dark:bg-gray-700 animate-fade-in" style={{ animationDelay: "0.2s" }}>
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
      
      <Footer />
    </div>
  );
};

export default ActivityDetail;
