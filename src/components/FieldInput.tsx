import React from 'react';
import { useForm } from '@inertiajs/react';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

const inputVariants = cva(
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      error: {
        true: 'border-red-500',
        false: 'border-input'
      }
    },
    defaultVariants: {
      error: false
    }
  }
);

// Import types from shadcn (these should be available in the host project)
type BaseInputProps = React.ComponentPropsWithoutRef<'input'>;

type BaseLabelProps = React.ComponentPropsWithoutRef<'label'>;

// Define allowed input types
type AllowedInputTypes = 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';

export interface FieldInputProps<TForm extends Record<string, any>> extends Omit<BaseInputProps, 'name' | 'form' | 'value' | 'onChange' | 'type'> {
  name: keyof TForm & string;
  label?: string | null;
  labelProps?: Omit<BaseLabelProps, 'htmlFor' | 'children'>;
  form: ReturnType<typeof useForm<TForm>>;
  showError?: boolean;
  type?: AllowedInputTypes;
}

const DefaultLabel = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<'label'> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));

DefaultLabel.displayName = 'Label';

const DefaultInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'> & VariantProps<typeof inputVariants>
>(({ className, error, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(inputVariants({ error }), className)}
    {...props}
  />
));

DefaultInput.displayName = 'Input';

export function FieldInput<TForm extends Record<string, any>>({
  name,
  label,
  labelProps,
  form,
  showError = true,
  className,
  type = 'text',
  ...props
}: FieldInputProps<TForm>) {
  const error = form.errors[name];
  const value = form.data[name];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setData(name, e.target.value as TForm[keyof TForm & string]);
  };

  return (
    <div className="space-y-2">
      {label !== null && (
        <DefaultLabel htmlFor={name} {...labelProps}>
          {label || name.charAt(0).toUpperCase() + name.slice(1)}
        </DefaultLabel>
      )}

      <DefaultInput
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        error={!!error}
        className={className}
        aria-invalid={error ? true : false}
        {...props}
      />

      {showError && error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}