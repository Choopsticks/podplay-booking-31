
import React from "react";
import { cn } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import { Calendar, DateObj } from "dayzed";
import { TimeSlot } from "@/lib/activity-data";

interface CalendarDateCellProps {
  calendar: Calendar;
  dateObj: DateObj;
  selectedDate: Date | null;
  slot?: TimeSlot;
  availablePercentage?: number;
  totalSlots?: number;
  bookedSlots?: number;
}

export const CalendarDateCell: React.FC<CalendarDateCellProps> = ({
  calendar,
  dateObj,
  selectedDate,
  slot,
  availablePercentage,
  totalSlots = 0,
  bookedSlots = 0,
}) => {
  const isSelected = selectedDate
    ? isSameDay(dateObj.date, selectedDate)
    : false;

  const isToday = isSameDay(dateObj.date, new Date());

  // Handle dates in the past
  const isPastDate = dateObj.date < new Date(new Date().setHours(0, 0, 0, 0));

  // Calculate availability percentage if not provided
  const calculatedAvailability = totalSlots > 0 ? ((totalSlots - bookedSlots) / totalSlots) * 100 : 0;
  const availability = availablePercentage !== undefined ? availablePercentage : calculatedAvailability;

  // Get color based on availability
  const getAvailabilityColor = () => {
    if (availability <= 0) return "bg-red-500 dark:bg-red-700";
    if (availability <= 30) return "bg-orange-500 dark:bg-orange-700";
    return "bg-green-500 dark:bg-green-700";
  };

  return (
    <button
      disabled={isPastDate || !slot}
      className={cn(
        "relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md text-sm font-medium transition-colors",
        isSelected
          ? "bg-craft text-white dark:bg-craft"
          : isToday
          ? "bg-craft-pastel text-craft-dark dark:bg-craft-dark/30 dark:text-craft-light"
          : !slot
          ? "cursor-default text-gray-400 dark:text-gray-600"
          : isPastDate
          ? "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
          : "hover:bg-gray-100 dark:hover:bg-gray-700",
        "focus:outline-none focus:ring-2 focus:ring-craft focus:ring-offset-2"
      )}
      key={dateObj.date.toString()}
      onClick={() => dateObj.selectable && dateObj.getDateProps().onClick()}
      type="button"
    >
      <span>{format(dateObj.date, "d")}</span>
      
      {slot && !isPastDate && !isSelected && (
        <div
          className={cn(
            "absolute bottom-1 h-1 w-4 rounded-full",
            getAvailabilityColor()
          )}
        ></div>
      )}
    </button>
  );
};
