
import * as React from "react";
import { cn } from "@/lib/utils";
import { TimeSlot } from "@/lib/activity-data";
import { format } from "date-fns";

interface CalendarDateCellProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
  availableSlots: TimeSlot[];
  selected?: boolean;
  disabled?: boolean;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date) => void;
  setSelectedTimeSlot: (timeSlot: TimeSlot | undefined) => void;
}

const CalendarDateCell = ({
  date,
  availableSlots,
  selected,
  disabled,
  selectedDate,
  setSelectedDate,
  setSelectedTimeSlot,
  className,
  ...props
}: CalendarDateCellProps) => {
  const slotsForThisDate = availableSlots.filter(
    (slot) => format(slot.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );
  
  const hasSlots = slotsForThisDate.length > 0;
  const totalAvailableSlots = slotsForThisDate.reduce(
    (acc, slot) => acc + (slot.totalSlots - slot.bookedSlots),
    0
  );

  const handleClick = () => {
    if (!disabled && hasSlots) {
      setSelectedDate(date);
      setSelectedTimeSlot(undefined);
    }
  };

  return (
    <div
      className={cn(
        "flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full text-sm transition-all",
        hasSlots ? "cursor-pointer hover:bg-craft-pastel" : "cursor-not-allowed opacity-50",
        selected && "bg-craft text-white hover:bg-craft-dark",
        !selected && !disabled && "text-gray-700",
        disabled && "text-gray-400",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <div className="flex flex-col items-center">
        <span>{format(date, "d")}</span>
        {hasSlots && (
          <span 
            className={cn(
              "mt-0.5 text-[8px] sm:text-[10px] font-medium",
              selected ? "text-white" : "text-craft-dark"
            )}
          >
            {totalAvailableSlots} slot{totalAvailableSlots !== 1 ? "s" : ""}
          </span>
        )}
      </div>
    </div>
  );
};

export { CalendarDateCell };
