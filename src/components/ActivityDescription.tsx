
import React from "react";
import { Activity } from "@/lib/activity-data";
import { Check, Info, Calendar, Clock, MapPin, Users, DollarSign } from "lucide-react";

interface ActivityDescriptionProps {
  activity: Activity;
}

const ActivityDescription: React.FC<ActivityDescriptionProps> = ({ activity }) => {
  return (
    <section className="bg-white dark:bg-gray-800 py-12">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-2 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white">About This Activity</h2>
            <div className="mt-4 prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{activity.longDescription}</p>
            </div>
          </div>
          
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Activity Details</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-craft-pastel dark:bg-craft-dark/30 p-1">
                  <Users size={16} className="text-craft-dark dark:text-craft-light" />
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">Age Range</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{activity.ageRange}</span>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-craft-pastel dark:bg-craft-dark/30 p-1">
                  <DollarSign size={16} className="text-craft-dark dark:text-craft-light" />
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">Price Range</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{activity.priceRange}</span>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-craft-pastel dark:bg-craft-dark/30 p-1">
                  <MapPin size={16} className="text-craft-dark dark:text-craft-light" />
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">Location</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{activity.location}</span>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-craft-pastel dark:bg-craft-dark/30 p-1">
                  <Calendar size={16} className="text-craft-dark dark:text-craft-light" />
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">Dates & Times</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{activity.dateRange}</span>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-craft-pastel dark:bg-craft-dark/30 p-1">
                  <Clock size={16} className="text-craft-dark dark:text-craft-light" />
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">Duration</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{activity.duration || "Not specified"}</span>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-craft-pastel dark:bg-craft-dark/30 p-1">
                  <Check size={16} className="text-craft-dark dark:text-craft-light" />
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">Categories</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{activity.categories.join(", ")}</span>
                </div>
              </li>
            </ul>
            
            <div className="mt-8 rounded-lg bg-craft-pastel dark:bg-craft-dark/30 px-4 py-3">
              <div className="flex items-center mb-2">
                <Info size={16} className="text-craft-dark dark:text-craft-light mr-2" />
                <h4 className="font-medium text-craft-dark dark:text-craft-light">Important Note</h4>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Booking in advance is recommended as many activities have limited capacity. Contact the provider directly for the most up-to-date information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityDescription;
