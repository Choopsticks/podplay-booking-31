
import React, { useState } from "react";
import { Activity, TimeSlot } from "@/lib/activity-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { Calendar, Clock, Users } from "lucide-react";

interface BookingFormProps {
  activity: Activity;
  selectedTimeSlot: TimeSlot;
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ activity, selectedTimeSlot, onClose }) => {
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    childName: "",
    childAge: "",
    specialNotes: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Booking Confirmed!",
        description: `Your booking for ${activity.title} on ${format(selectedTimeSlot.date, "MMMM d")} at ${selectedTimeSlot.startTime} has been confirmed.`,
      });
      onClose();
    }, 1500);
  };
  
  return (
    <div className="animate-scale-in">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-gray-900">Complete Your Booking</h3>
          <button
            type="button"
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mt-4 rounded-lg bg-sand-light p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand">
                  <Calendar size={18} className="text-gray-700" />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Date & Time</div>
                <div className="font-medium text-gray-900">
                  {format(selectedTimeSlot.date, "MMMM d, yyyy")} • {selectedTimeSlot.startTime} - {selectedTimeSlot.endTime}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand">
                  <Users size={18} className="text-gray-700" />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Available Spots</div>
                <div className="font-medium text-gray-900">
                  {selectedTimeSlot.totalSlots - selectedTimeSlot.bookedSlots} of {selectedTimeSlot.totalSlots} remaining
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand">
                  <Clock size={18} className="text-gray-700" />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Duration</div>
                <div className="font-medium text-gray-900">{activity.duration}</div>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="parentName">Parent/Guardian Name</Label>
              <Input
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="childName">Child's Name</Label>
              <Input
                id="childName"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="childAge">Child's Age</Label>
              <Input
                id="childAge"
                name="childAge"
                type="number"
                min="2"
                max="4"
                value={formData.childAge}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="specialNotes">Special Notes (Optional)</Label>
              <Input
                id="specialNotes"
                name="specialNotes"
                value={formData.specialNotes}
                onChange={handleChange}
                className="mt-1"
                placeholder="Allergies, special needs, etc."
              />
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-between">
            <div className="text-xl font-medium text-gray-900">${activity.price}</div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-craft text-craft-dark hover:bg-craft-pastel hover:text-craft-dark"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-craft hover:bg-craft-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
