import React from "react";
// import { ComponentProps } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { DayFlag, DayPicker, DropdownProps, SelectionState, UI } from 'react-day-picker';
import { clsx } from "clsx";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { buttonVariants } from '../ui/Button';
import { Select } from '@radix-ui/react-select';


export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={clsx('p-3 border border-border rounded-md', className)}
      classNames={{
        [UI.Months]: 'relative',
        [UI.Month]: 'space-y-4 ml-0',
        [UI.MonthCaption]: 'flex justify-center items-center h-7',
        [UI.CaptionLabel]: 'text-sm font-medium',
        [UI.PreviousMonthButton]: clsx(
          buttonVariants({ variant: 'outline' }),
          'absolute left-1 top-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        [UI.NextMonthButton]: clsx(
          buttonVariants({ variant: 'outline' }),
          'absolute right-1 top-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        [UI.MonthGrid]: 'w-full border-collapse space-y-1',
        [UI.Weekdays]: 'flex',
        [UI.Weekday]: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        [UI.Week]: 'flex w-full mt-2',
        [UI.Day]:
          'h-9 w-9 text-center rounded-md text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        [UI.DayButton]: clsx(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary hover:text-primary-foreground'
        ),
        [UI.Dropdowns]: 'flex items-center gap-1',
        [SelectionState.range_end]: 'day-range-end',
        [SelectionState.selected]:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        [SelectionState.range_middle]: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        [DayFlag.today]: 'text-muted-foreground bg-muted',
        [DayFlag.outside]:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        [DayFlag.disabled]: 'text-muted-foreground opacity-50',
        [DayFlag.hidden]: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) => <Chevron {...props} />,
        Dropdown: ({ value, onChange, ...props }: DropdownProps) => {
          const selected = props.options?.find((child) => child.value === value);
          const handleChange = (value: string) => {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange?.(changeEvent);
          };
          return (
            <Select
              value={value?.toString()}
              onValueChange={(value) => {
                handleChange(value);
              }}
            >
              <SelectTrigger className="pr-1.5 focus:ring-0">
                <SelectValue>{selected?.label}</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                {/* <ScrollArea className="h-80"> */}
                {props.options?.map((option, id: number) => (
                  <SelectItem key={`${option.value}-${id}`} value={option.value?.toString() ?? ''}>
                    {option.label}
                  </SelectItem>
                ))}
                {/* </ScrollArea> */}
              </SelectContent>
            </Select>
          );
        },
      }}
      {...props}
    />
  );
}

const Chevron = ({ orientation = 'left' }) => {
  switch (orientation) {
    case 'left':
      return <ChevronLeft className="h-4 w-4" />;
    case 'right':
      return <ChevronRight className="h-4 w-4" />;
    case 'up':
      return <ChevronUp className="h-4 w-4" />;
    case 'down':
      return <ChevronDown className="h-4 w-4" />;
    default:
      return null;
  }
};

Calendar.displayName = 'Calendar';

export { Calendar };
