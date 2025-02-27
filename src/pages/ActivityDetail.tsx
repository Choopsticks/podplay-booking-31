
import React, { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { sampleActivity } from "@/lib/activity-data";
import { TimeSlot } from "@/lib/activity-data";
import ActivityHero from "@/components/ActivityHero";
import ActivityDescription from "@/components/ActivityDescription";
import ActivityCalendar from "@/components/ActivityCalendar";
import ReviewSection from "@/components/ReviewSection";
import BookingForm from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  
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
  
  return (
    <div className="min-h-screen bg-sand-light">
      <header className="border-b border-sand-dark/20 bg-white backdrop-blur-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-semibold text-craft-dark">PodPlay</Link>
          </div>
          <nav>
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
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="border-craft text-craft-dark hover:bg-craft-pastel hover:text-craft-dark">
              Log In
            </Button>
            <Button size="sm" className="bg-craft hover:bg-craft-dark">
              Sign Up
            </Button>
          </div>
        </div>
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
              <span className="text-xl font-semibold text-craft-dark">PodPlay</span>
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
