
import React, { useState } from "react";
import { useDayzed } from "dayzed";
import { format, isEqual, getMonth, getYear } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TimeSlot, Activity } from "@/lib/activity-data";
import { CalendarDateCell } from "@/components/ui/calendar-date-cell";
import { cn } from "@/lib/utils";

const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weekdayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarProps {
  activity: Activity;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const ActivityCalendar: React.FC<CalendarProps> = ({
  activity,
  selectedDate,
  onDateSelect,
}) => {
  const [offset, setOffset] = useState(0);

  // Prepare slots with default values for totalSlots and bookedSlots
  const slots = activity.availableSlots.map(slot => ({
    ...slot,
    totalSlots: slot.totalSlots || 10,
    bookedSlots: slot.bookedSlots || 0
  }));

  const dayzedData = useDayzed({
    date: new Date(),
    selected: selectedDate ? new Date(selectedDate) : undefined,
    onDateSelected: ({ date }) => {
      onDateSelect(new Date(date));
    },
    offset,
    monthsToDisplay: 1,
  });

  const { calendars, getBackProps, getForwardProps } = dayzedData;

  if (!calendars.length) return null;

  const getSlotForDate = (date: Date): TimeSlot | undefined => {
    return slots.find((slot) =>
      isEqual(
        new Date(slot.date).setHours(0, 0, 0, 0),
        new Date(date).setHours(0, 0, 0, 0)
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          {...getBackProps({ calendars })}
          className="h-8 w-8 rounded-full dark:border-gray-600 dark:text-gray-300"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <h3 className="text-base font-medium text-gray-900 dark:text-white">
          {monthNamesShort[getMonth(calendars[0].month)]} {getYear(calendars[0].month)}
        </h3>

        <Button
          variant="outline"
          size="icon"
          {...getForwardProps({ calendars })}
          className="h-8 w-8 rounded-full dark:border-gray-600 dark:text-gray-300"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Card className="border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-2 grid grid-cols-7 gap-1 text-center">
          {weekdayNamesShort.map((day) => (
            <div
              key={day}
              className="text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              {day.charAt(0)}
            </div>
          ))}
        </div>

        {calendars.map((calendar) => (
          <div
            key={`${calendar.month}-${calendar.year}`}
            className="grid grid-cols-7 gap-1"
          >
            {calendar.weeks.map((week, weekIndex) =>
              week.map((dateObj, weekdayIndex) => {
                if (!dateObj) {
                  return (
                    <div
                      key={`${calendar.month}-${calendar.year}-${weekIndex}-${weekdayIndex}-empty`}
                      className={cn(
                        "aspect-square cursor-default text-center"
                      )}
                    />
                  );
                }

                const slot = getSlotForDate(dateObj.date);
                
                // Use default values for bookedSlots and totalSlots if not provided
                const bookedSlots = slot?.bookedSlots || 0;
                const totalSlots = slot?.totalSlots || 0;
                const availablePercentage = totalSlots > 0 ? ((totalSlots - bookedSlots) / totalSlots) * 100 : 0;
                
                return (
                  <CalendarDateCell
                    key={dateObj.date.toString()}
                    calendar={calendar}
                    dateObj={dateObj}
                    selectedDate={selectedDate}
                    slot={slot}
                    // Ensure we pass props with defaults
                    availablePercentage={availablePercentage}
                    bookedSlots={bookedSlots}
                    totalSlots={totalSlots}
                  />
                );
              })
            )}
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ActivityCalendar;
