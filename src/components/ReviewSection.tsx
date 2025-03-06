
import React from "react";
import { Activity } from "@/lib/activity-data";
import { Star } from "lucide-react";

interface ReviewSectionProps {
  activity: Activity;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ activity }) => {
  const totalReviews = activity.reviews.length;
  const averageRating = activity.reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
  
  // Generate rating distribution
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const rating = 5 - i;
    const count = activity.reviews.filter(review => review.rating === rating).length;
    const percentage = (count / totalReviews) * 100;
    return { rating, count, percentage };
  });
  
  return (
    <section className="bg-background py-12">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-medium text-foreground">Parent Reviews</h2>
          
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="rounded-lg border border-border bg-card p-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-4xl font-medium text-foreground">{averageRating.toFixed(1)}</span>
                    <Star size={24} className="fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
                  </p>
                  
                  <div className="mt-6 space-y-3">
                    {ratingDistribution.map(({ rating, count, percentage }) => (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="flex w-10 items-center justify-end">
                          <span className="text-sm text-foreground">{rating}</span>
                          <Star size={12} className="ml-1 fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="absolute inset-y-0 left-0 bg-yellow-400"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="w-8 text-xs text-muted-foreground">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="space-y-6">
                {activity.reviews.map((review) => (
                  <div 
                    key={review.id} 
                    className="rounded-lg border border-border bg-card p-6 shadow-sm animate-fade-up"
                    style={{ animationDelay: `${0.3 + review.id * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-craft-pastel dark:bg-craft-dark/30 text-craft-dark dark:text-craft-light">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{review.author}</div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted dark:text-muted-foreground"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-4 text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
