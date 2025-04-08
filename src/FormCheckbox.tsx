import { Checkbox } from "./ui/Checkbox";
import { Label } from "./ui/Label";
import * as React from "react";
import { InputError } from "./ui/InputError";

interface FormCheckboxProps extends React.ComponentProps<typeof Checkbox> {
  label: string;
  name: string;
  checked: boolean;
  onBooleanChange: (value: boolean) => void;
  error?: string;
  description?: string;
}

export const FormCheckbox = React.memo(function FormCheckbox({
  label,
  name,
  checked,
  onBooleanChange,
  error,
  description,
  ...checkboxProps
}: FormCheckboxProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <Checkbox
          id={name}
          checked={checked}
          onCheckedChange={onBooleanChange}
          {...checkboxProps}
        />
        <Label htmlFor={name}>{label}</Label>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <InputError message={error} />
    </div>
  );
});
