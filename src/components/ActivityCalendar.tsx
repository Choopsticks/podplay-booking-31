
import React, { useState } from "react";
import { format, isSameDay, isToday, isAfter } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Activity, TimeSlot } from "@/lib/activity-data";
import { CalendarDateCell } from "@/components/ui/calendar-date-cell";
import { Button } from "@/components/ui/button";

interface ActivityCalendarProps {
  activity: Activity;
  onSelectTimeSlot: (slot: TimeSlot) => void;
}

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ activity, onSelectTimeSlot }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | undefined>(undefined);
  
  const availableSlots = activity.availableSlots;
  
  const slotsForSelectedDate = selectedDate 
    ? availableSlots.filter(slot => isSameDay(slot.date, selectedDate))
    : [];
  
  const hasAvailableDates = availableSlots.some(slot => 
    isAfter(slot.date, new Date()) || isToday(slot.date)
  );
  
  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
  };
  
  const handleBookTimeSlot = () => {
    if (selectedTimeSlot) {
      onSelectTimeSlot(selectedTimeSlot);
    }
  };
  
  return (
    <section className="bg-sand-light py-12" id="booking">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-sand/50 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-medium text-gray-900">Select Date & Time</h2>
            <p className="mt-2 text-gray-600">Choose from available slots below</p>
            
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <div className="rounded-lg border border-gray-200 bg-white p-3">
                  {hasAvailableDates ? (
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        if (date) setSelectedDate(date);
                        setSelectedTimeSlot(undefined);
                      }}
                      disabled={(date) => {
                        // Disable past dates
                        if (date < new Date() && !isToday(date)) return true;
                        
                        // Check if there are any slots available for this date
                        return !availableSlots.some(slot => 
                          isSameDay(slot.date, date)
                        );
                      }}
                      className="rounded-md"
                      components={{
                        Day: (props) => (
                          <CalendarDateCell
                            {...props}
                            availableSlots={availableSlots}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            setSelectedTimeSlot={setSelectedTimeSlot}
                          />
                        ),
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center py-8 text-center">
                      <p className="text-gray-500">No available dates at the moment</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedDate ? (
                      <>Available Times for {format(selectedDate, "MMMM d, yyyy")}</>
                    ) : (
                      <>Select a date to see available times</>
                    )}
                  </h3>
                  
                  {selectedDate && slotsForSelectedDate.length > 0 ? (
                    <div className="mt-4 space-y-3">
                      {slotsForSelectedDate.map((slot) => {
                        const isSlotFull = slot.bookedSlots >= slot.totalSlots;
                        const availableSpots = slot.totalSlots - slot.bookedSlots;
                        const isSelected = selectedTimeSlot?.id === slot.id;
                        
                        return (
                          <div
                            key={slot.id}
                            className={`
                              flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all
                              ${isSlotFull ? 'border-gray-200 bg-gray-50 opacity-60' : isSelected ? 'border-craft bg-craft-pastel' : 'border-gray-200 hover:border-craft-light hover:bg-craft-pastel/30'}
                            `}
                            onClick={() => !isSlotFull && handleTimeSlotSelect(slot)}
                          >
                            <div>
                              <div className="font-medium text-gray-900">
                                {slot.startTime} - {slot.endTime}
                              </div>
                              <div className="text-sm text-gray-600">
                                {isSlotFull 
                                  ? 'Fully booked' 
                                  : `${availableSpots} spot${availableSpots !== 1 ? 's' : ''} available`}
                              </div>
                            </div>
                            {isSelected && (
                              <div className="h-3 w-3 rounded-full bg-craft"></div>
                            )}
                          </div>
                        );
                      })}
                      
                      <Button
                        className="mt-6 w-full bg-craft hover:bg-craft-dark disabled:opacity-50"
                        size="lg"
                        disabled={!selectedTimeSlot}
                        onClick={handleBookTimeSlot}
                      >
                        {selectedTimeSlot ? 'Book Selected Time' : 'Select a Time'}
                      </Button>
                    </div>
                  ) : selectedDate ? (
                    <div className="mt-8 text-center text-gray-500">
                      No available times for this date
                    </div>
                  ) : (
                    <div className="mt-8 flex h-32 items-center justify-center text-gray-500">
                      <div className="text-center">
                        <p>Please select a date from the calendar</p>
                        <p className="mt-2 text-sm">Dates with available slots are highlighted</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityCalendar;
