import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/Select";
import { Label } from "./ui/Label";
import { InputError } from "./ui/InputError";
import * as React from "react";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Select>, "value"> {
  label?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: Option[];
  placeholder?: string;
  hideLabel?: boolean;
}

export const FormSelect = React.memo(function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  error,
  placeholder = "Select an option",
  hideLabel = false,
  ...props
}: FormSelectProps) {
  const handleChange = (val: string) => {
    const event = {
      target: {
        value: val,
        name,
      },
    } as React.ChangeEvent<HTMLSelectElement>;

    onChange(event);
  };

  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={name} className={hideLabel ? "sr-only" : ""}>
          {label}
        </Label>
      )}
      <Select
        value={value.toString()}
        onValueChange={(val) => handleChange(val)}
        {...props}
      >
        <SelectTrigger id={name}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <InputError message={error} />
    </div>
  );
});
