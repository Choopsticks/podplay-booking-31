
import React, { useState } from "react";
import { Activity } from "@/lib/activity-data";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, Star, Users } from "lucide-react";

interface ActivityHeroProps {
  activity: Activity;
  handleBookNowClick: () => void;
}

const ActivityHero: React.FC<ActivityHeroProps> = ({ activity, handleBookNowClick }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const averageRating = activity.reviews.reduce((acc, review) => acc + review.rating, 0) / activity.reviews.length;
  
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1">
            <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-craft-pastel px-3 py-0.5 text-sm font-medium text-craft-dark">
                  {activity.ageRange}
                </span>
                <span className="inline-flex items-center rounded-full bg-sand-light px-3 py-0.5 text-sm font-medium text-sand-dark">
                  {activity.duration}
                </span>
              </div>
              
              <h1 className="text-3xl font-medium text-gray-900 md:text-4xl">{activity.title}</h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">{averageRating.toFixed(1)}</span>
                  <span className="text-sm text-gray-500">({activity.reviews.length} reviews)</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="text-sm text-gray-600">with {activity.instructor}</div>
              </div>
              
              <p className="text-lg text-gray-700">{activity.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-craft-dark" />
                  <span className="text-sm text-gray-700">Small groups (max 8 children)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-craft-dark" />
                  <span className="text-sm text-gray-700">{activity.duration} sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon size={18} className="text-craft-dark" />
                  <span className="text-sm text-gray-700">Flexible scheduling</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <div className="text-2xl font-medium text-gray-900">${activity.price}</div>
                <Button 
                  onClick={handleBookNowClick} 
                  size="lg"
                  className="bg-craft hover:bg-craft-dark transition-all duration-300"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative aspect-h-4 aspect-w-5 overflow-hidden rounded-xl bg-gray-50 animate-fade-in" style={{ animationDelay: "0.2s" }}>
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
  );
};

export default ActivityHero;
