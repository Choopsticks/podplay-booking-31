
import React, { useState } from "react";
import { Activity } from "@/lib/activity-data";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import ActivityCalendar from "./ActivityCalendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingFormProps {
  activity: Activity;
}

const BookingForm: React.FC<BookingFormProps> = ({ activity }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [numTickets, setNumTickets] = useState<number>(1);
  const [formStep, setFormStep] = useState<number>(1);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  // Process slots with default values
  const availableSlots = activity.availableSlots.map(slot => ({
    ...slot,
    totalSlots: slot.totalSlots || 10,
    bookedSlots: slot.bookedSlots || 0
  }));

  const selectedDateSlots = selectedDate
    ? availableSlots.filter(
        (slot) =>
          new Date(slot.date).toDateString() === selectedDate.toDateString()
      )
    : [];

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    setShowCalendar(false);
  };

  const handleDecreaseTickets = () => {
    if (numTickets > 1) {
      setNumTickets(numTickets - 1);
    }
  };

  const handleIncreaseTickets = () => {
    const selectedSlot = selectedDateSlots.find(
      (slot) => `${slot.startTime}-${slot.endTime}` === selectedTimeSlot
    );
    
    // Set default values if totalSlots or bookedSlots are undefined
    const totalSlots = selectedSlot?.totalSlots || 0;
    const bookedSlots = selectedSlot?.bookedSlots || 0;
    const availableSlots = totalSlots - bookedSlots;
    
    if (numTickets < availableSlots) {
      setNumTickets(numTickets + 1);
    }
  };

  const handleNextStep = () => {
    if (formStep === 1 && (!selectedDate || !selectedTimeSlot)) {
      toast({
        title: "Please select date and time",
        description: "You need to select both a date and time slot to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    if (formStep < 3) {
      setFormStep(formStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking confirmed!",
      description: `You've booked ${numTickets} ticket(s) for ${activity.title} on ${format(selectedDate!, "MMMM d, yyyy")} at ${selectedTimeSlot?.split("-")[0]}.`,
    });
    
    // Reset form
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setNumTickets(1);
    setFormStep(1);
  };

  // Get the duration from dateRange if duration is not available
  const activityDuration = activity.duration || activity.dateRange;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Book Your Spot</h3>
      
      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          {formStep === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <div className="relative mt-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full justify-between border-gray-300 px-3 py-2 text-left text-gray-700 dark:border-gray-600 dark:text-gray-300"
                  >
                    {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                    <Calendar className="ml-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Button>
                  
                  {showCalendar && (
                    <div className="absolute left-0 z-10 mt-1 w-full">
                      <ActivityCalendar
                        activity={activity}
                        selectedDate={selectedDate}
                        onDateSelect={handleDateSelection}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {selectedDate && (
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Time
                  </label>
                  <Select 
                    value={selectedTimeSlot || ""} 
                    onValueChange={setSelectedTimeSlot}
                  >
                    <SelectTrigger className="mt-1 border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available Times</SelectLabel>
                        {selectedDateSlots.length > 0 ? (
                          selectedDateSlots.map((slot) => (
                            <SelectItem 
                              key={`${slot.startTime}-${slot.endTime}`}
                              value={`${slot.startTime}-${slot.endTime}`}
                              disabled={(slot.totalSlots || 10) - (slot.bookedSlots || 0) <= 0}
                            >
                              {slot.startTime} - {slot.endTime} 
                              {(slot.totalSlots || 10) - (slot.bookedSlots || 0) <= 0 && " (Fully Booked)"}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-slots" disabled>
                            No available time slots
                          </SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {selectedTimeSlot && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Number of Participants
                  </label>
                  <div className="mt-1 flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleDecreaseTickets}
                      className="h-8 w-8 rounded-full p-0 dark:border-gray-600"
                    >
                      -
                    </Button>
                    <span className="mx-4 text-gray-900 dark:text-white">{numTickets}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleIncreaseTickets}
                      className="h-8 w-8 rounded-full p-0 dark:border-gray-600"
                    >
                      +
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {formStep === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">Contact Information</h4>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Your full name" 
                  required 
                  className="mt-1 border-gray-300 dark:border-gray-600"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Your email address" 
                  required 
                  className="mt-1 border-gray-300 dark:border-gray-600"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="Your phone number" 
                  required 
                  className="mt-1 border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
          )}
          
          {formStep === 3 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">Booking Summary</h4>
              
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Activity:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Date:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Time:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedTimeSlot?.replace("-", " - ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Participants:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{numTickets}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 dark:border-gray-600"></div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-200">Total:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {activity.price ? `$${(activity.price * numTickets).toFixed(2)}` : activity.priceRange}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                By clicking "Complete Booking", you agree to our terms and conditions.
              </div>
            </div>
          )}
          
          <div className="mt-6 flex items-center justify-between">
            {formStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handlePreviousStep}
                className="border-gray-300 dark:border-gray-600 dark:text-gray-300"
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            
            {formStep < 3 ? (
              <Button 
                type="button" 
                onClick={handleNextStep}
                className="bg-craft hover:bg-craft-dark dark:bg-craft dark:hover:bg-craft-dark"
              >
                Continue
              </Button>
            ) : (
              <Button 
                type="submit"
                className="bg-craft hover:bg-craft-dark dark:bg-craft dark:hover:bg-craft-dark"
              >
                Complete Booking
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
