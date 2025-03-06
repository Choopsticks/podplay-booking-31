
import React from "react";
import { Activity } from "@/lib/activity-data";
import { Check } from "lucide-react";

interface ActivityDescriptionProps {
  activity: Activity;
}

const ActivityDescription: React.FC<ActivityDescriptionProps> = ({ activity }) => {
  return (
    <section className="bg-background py-12">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-2 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-medium text-foreground">About This Activity</h2>
            <div className="mt-4 prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">{activity.longDescription}</p>
            </div>
            
            <h3 className="mt-8 text-xl font-medium text-foreground">What Your Child Will Learn</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {activity.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-full bg-craft-pastel dark:bg-craft-dark/30 p-1">
                    <Check size={16} className="text-craft-dark dark:text-craft-light" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="rounded-xl border border-border bg-card p-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-xl font-medium text-foreground">Materials</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              All materials are provided and carefully selected for safety.
            </p>
            
            <ul className="mt-4 space-y-3">
              {activity.materials.map((material, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-craft-dark dark:bg-craft-light"></div>
                  <span className="text-sm text-muted-foreground">{material}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 rounded-lg bg-craft-pastel dark:bg-craft-dark/30 px-4 py-3">
              <h4 className="font-medium text-craft-dark dark:text-craft-light">Important Note</h4>
              <p className="mt-1 text-sm text-muted-foreground">
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
