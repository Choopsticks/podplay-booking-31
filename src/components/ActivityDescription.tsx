
import React from "react";
import { Activity } from "@/lib/activity-data";
import { Check } from "lucide-react";

interface ActivityDescriptionProps {
  activity: Activity;
}

const ActivityDescription: React.FC<ActivityDescriptionProps> = ({ activity }) => {
  return (
    <section className="bg-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-2 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-medium text-gray-900">About This Activity</h2>
            <div className="mt-4 prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">{activity.longDescription}</p>
            </div>
            
            <h3 className="mt-8 text-xl font-medium text-gray-900">What Your Child Will Learn</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {activity.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-full bg-craft-pastel p-1">
                    <Check size={16} className="text-craft-dark" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-xl font-medium text-gray-900">Materials</h3>
            <p className="mt-2 text-sm text-gray-600">
              All materials are provided and carefully selected for safety.
            </p>
            
            <ul className="mt-4 space-y-3">
              {activity.materials.map((material, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-craft-dark"></div>
                  <span className="text-sm text-gray-700">{material}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 rounded-lg bg-craft-pastel px-4 py-3">
              <h4 className="font-medium text-craft-dark">Important Note</h4>
              <p className="mt-1 text-sm text-gray-700">
                Parents are welcome to stay and observe or participate. Please dress your child in clothes that can get messy!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityDescription;
