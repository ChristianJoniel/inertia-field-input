import React, { memo, useState, HTMLAttributes, FC, ReactElement, ChangeEvent } from "react";
import { Label } from "./ui/Label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/Command";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { XIcon } from "lucide-react";
import { InputError } from "./ui/InputError";

interface Option {
  label: string;
  value: string;
}

interface FormMultiSelectProps {
  id?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  error?: string;
  label?: string;
  options: Option[];
  placeholder?: string;
  hideLabel?: boolean;
  name?: string;
}

// Interface for Inertia's useField object
interface InertiaField {
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

type CombinedProps = FormMultiSelectProps & Partial<InertiaField>;

export const FormMultiSelect = React.memo(function FormMultiSelect({
  id,
  value,
  onChange,
  error,
  label,
  options,
  placeholder = 'Select options',
  hideLabel = false,
  name,
  ...props
}: CombinedProps) {
  const [open, setOpen] = React.useState(false)

  // Handle both direct props and Inertia field object
  const fieldValue = value || (props as InertiaField).value || [];
  const fieldError = error || (props as InertiaField).error;
  const fieldId = id || name;
  const handleChange = onChange || (props as InertiaField).onChange || (() => { });

  const toggleValue = (val: string) => {
    if (fieldValue.includes(val)) {
      handleChange(fieldValue.filter((v: string) => v !== val))
    } else {
      handleChange([...fieldValue, val])
    }
  }

  return (
    <div className="grid gap-2">
      {label && (
        <Label htmlFor={fieldId} className={hideLabel ? 'sr-only' : ''}>
          {label}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-start"
          >
            {fieldValue.length > 0
              ? `${fieldValue.length} selected`
              : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0!">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => toggleValue(option.value)}
                  className="cursor-pointer"
                >
                  <span className={fieldValue.includes(option.value) ? 'font-semibold' : ''}>
                    {option.label}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected badges */}
      {fieldValue.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {fieldValue.map((val: string) => {
            const selected = options.find((o) => o.value === val)
            return (
              <Badge key={val} variant="outline">
                {selected?.label}
                <button
                  type="button"
                  onClick={() => toggleValue(val)}
                  className="ml-1"
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            )
          })}
        </div>
      )}

      <InputError message={fieldError} />
    </div>
  )
})