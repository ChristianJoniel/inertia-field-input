import { Label } from "./ui/Label";
import { Button } from "./ui/Button";
import { Calendar } from "./ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { InputError } from "./ui/InputError";
import React, {
  useEffect,
  useState,
  useMemo,
  memo,
  ChangeEvent,
  InputHTMLAttributes,
} from "react";

interface FormDateProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange"
  > {
  label?: string;
  name: string;
  value: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  hideLabel?: boolean;
  type?: "date" | "datetime";
  placeholder?: string;
}

export const FormDate = memo(function FormDate({
  label,
  name,
  value,
  onChange,
  error,
  hideLabel = false,
  type = "date",
  placeholder = "Pick a date",
}: FormDateProps) {
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [hours, setHours] = useState("12");
  const [minutes, setMinutes] = useState("00");
  const [period, setPeriod] = useState("AM");

  // Parse the date and time from the value
  useEffect(() => {
    if (value && type === "datetime") {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          // Extract time part for datetime
          let hours = date.getHours();
          const minutes = date.getMinutes().toString().padStart(2, "0");

          // Convert to 12-hour format
          const period = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

          setHours(hours.toString());
          setMinutes(minutes);
          setPeriod(period);
        }
      } catch (e) {
        console.error("Error parsing date:", e);
      }
    }
  }, [value, type]);

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (type === "datetime") {
      // For datetime, preserve the time part
      const currentDate = value ? new Date(value) : new Date();
      const currentHours = currentDate.getHours();
      const currentMinutes = currentDate.getMinutes();

      date.setHours(currentHours, currentMinutes);
      const isoString = date.toISOString();

      // Create a synthetic event directly
      const input = document.createElement("input");
      input.value = isoString;
      onChange({ target: input } as ChangeEvent<HTMLInputElement>);
    } else {
      // For date only, just use the date part
      const isoString = date.toISOString().split("T")[0];

      // Create a synthetic event directly
      const input = document.createElement("input");
      input.value = isoString;
      onChange({ target: input } as ChangeEvent<HTMLInputElement>);
    }

    setDateOpen(false);
  };

  // Handle time change
  const handleTimeChange = () => {
    if (!value) return;

    // Get the current date
    const currentDate = new Date(value);

    // Convert 12-hour format to 24-hour
    let hourValue = parseInt(hours);
    if (period === "PM" && hourValue !== 12) {
      hourValue += 12;
    } else if (period === "AM" && hourValue === 12) {
      hourValue = 0;
    }

    // Update the time part
    currentDate.setHours(hourValue, parseInt(minutes));

    // Update the value
    const isoString = currentDate.toISOString();

    // Create a synthetic event directly
    const input = document.createElement("input");
    input.value = isoString;
    onChange({ target: input } as ChangeEvent<HTMLInputElement>);

    setTimeOpen(false);
  };

  // Format the date for display
  const formatDisplayDate = () => {
    if (!value) return "";

    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) return "";

      return format(date, type === "datetime" ? "PPP" : "PPP");
    } catch (e) {
      console.error("Error formatting date:", e);
      return "";
    }
  };

  // Format the time for display
  const formatDisplayTime = () => {
    if (!value || type !== "datetime") return "";

    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) return "";

      return format(date, "p"); // 12-hour format with AM/PM
    } catch (e) {
      console.error("Error formatting time:", e);
      return "";
    }
  };

  // Get the selected date for the calendar
  const selectedDate = useMemo(() => {
    if (!value) return undefined;

    try {
      const date = new Date(value);
      return isNaN(date.getTime()) ? undefined : date;
    } catch (e) {
      console.error("Error selecting date:", e);
      return undefined;
    }
  }, [value]);

  // Generate hours options (1-12)
  const hoursOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  }, []);

  // Generate minutes options (00-59)
  const minutesOptions = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));
  }, []);

  return (
    <div className="grid gap-2">
      {label && (
        <Label htmlFor={name} className={hideLabel ? "sr-only" : ""}>
          {label}
        </Label>
      )}

      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${!value ? "text-muted-foreground" : ""}`}
                type="button"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDisplayDate() || placeholder}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
              />
            </PopoverContent>
          </Popover>

          {type === "datetime" && (
            <Popover open={timeOpen} onOpenChange={setTimeOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[140px] justify-start text-left font-normal"
                  type="button"
                >
                  <ClockIcon className="mr-2 h-4 w-4" />
                  {formatDisplayTime() || "Select time"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-4" align="start">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="grid gap-1">
                      <Label htmlFor="hours">Hour</Label>
                      <Select value={hours} onValueChange={setHours}>
                        <SelectTrigger id="hours" className="w-[70px]">
                          <SelectValue placeholder="Hour" />
                        </SelectTrigger>
                        <SelectContent>
                          {hoursOptions.map((hour) => (
                            <SelectItem key={hour} value={hour}>
                              {hour}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="minutes">Minute</Label>
                      <Select value={minutes} onValueChange={setMinutes}>
                        <SelectTrigger id="minutes" className="w-[70px]">
                          <SelectValue placeholder="Minute" />
                        </SelectTrigger>
                        <SelectContent>
                          {minutesOptions.map((minute) => (
                            <SelectItem key={minute} value={minute}>
                              {minute}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="period">Period</Label>
                    <Select value={period} onValueChange={setPeriod}>
                      <SelectTrigger id="period" className="w-full">
                        <SelectValue placeholder="AM/PM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={handleTimeChange}>
                    Apply
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      <InputError message={error} />
    </div>
  );
});
