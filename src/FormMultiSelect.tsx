import React, { memo, useState, HTMLAttributes, FC, ReactElement } from "react";
import { Label } from "./ui/Label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/Command";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { XIcon } from "lucide-react";
import { InputError } from "./ui/InputError";

interface Option {
  label: string;
  value: string;
}

interface FormMultiSelectProps {
  id: string;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  label?: string;
  options: Option[];
  placeholder?: string;
  hideLabel?: boolean;
}

// New interface for field object from useForm
interface FieldObject {
  name: string;
  id: string;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export const FormMultiSelect: FC<FormMultiSelectProps> = memo(
  function FormMultiSelect({
    id,
    value,
    onChange,
    error,
    label,
    options,
    placeholder = "Select options",
    hideLabel = false,
  }: FormMultiSelectProps): ReactElement {
    const [open, setOpen] = useState(false);

    const toggleValue = (val: string) => {
      if (value.includes(val)) {
        onChange(value.filter((v) => v !== val));
      } else {
        onChange([...value, val]);
      }
    };

    return (
      <div className="grid gap-2">
        {label && (
          <Label htmlFor={id} className={hideLabel ? "sr-only" : ""}>
            {label}
          </Label>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {value.length > 0 ? `${value.length} selected` : placeholder}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
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
                    <span
                      className={
                        value.includes(option.value) ? "font-semibold" : ""
                      }
                    >
                      {option.label}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Selected badges */}
        {value.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {value.map((val) => {
              const selected = options.find((o) => o.value === val);
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
              );
            })}
          </div>
        )}

        <InputError message={error} />
      </div>
    );
  },
);

// New component that accepts a field object directly
export const FormMultiSelectField: FC<
  {
    field: FieldObject;
    label?: string;
    options: Option[];
    placeholder?: string;
    hideLabel?: boolean;
  } & Omit<HTMLAttributes<HTMLDivElement>, "onChange">
> = memo(function FormMultiSelectField({
  field,
  label,
  options,
  placeholder = "Select options",
  hideLabel = false,
  ...props
}) {
  return (
    <FormMultiSelect
      id={field.id}
      value={field.value}
      onChange={field.onChange}
      options={options}
      placeholder={placeholder}
      error={field.error}
      label={label}
      hideLabel={hideLabel}
      {...props}
    />
  );
});

// Helper function to create a field that works with useForm
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createMultiSelectField(field: any) {
  return {
    label: field.label,
    name: field.name,
    value: field.value,
    onChange: field.onChange,
    error: field.error,
  };
}
