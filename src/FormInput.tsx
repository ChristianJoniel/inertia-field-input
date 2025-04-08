import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { InputError } from "./ui/InputError";
import { memo } from "react";
import { clsx } from "clsx";
import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hideLabel?: boolean; // <-- if you want to visually hide but keep it for accessibility
}

export const FormInput = memo(function FormInput({
  className,
  label,
  error,
  hideLabel = false,
  ...props
}: FormInputProps) {
  return (
    <div className={clsx("grid gap-2", className)}>
      {label && (
        <Label htmlFor={props.name} className={hideLabel ? "sr-only" : ""}>
          {label}
        </Label>
      )}
      <Input {...props} />
      <InputError message={error} />
    </div>
  );
});
