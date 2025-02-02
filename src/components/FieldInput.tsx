import React from 'react';
import { useForm } from '@inertiajs/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
// Import types from shadcn (these should be available in the host project)
// import { InputProps } from '@/components/ui/input';
type BaseInputProps = {
  id?: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'color';
  className?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// import { LabelProps } from '@/components/ui/label';
type BaseLabelProps = Omit<React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, 'ref'> & {
  children?: React.ReactNode;
};

// We'll dynamically import the actual components from the host project
// const Input = React.lazy(() => import('../resources/js/components/ui/input'));
// const Label = React.lazy(() => import('@/components/ui/label'));

export interface FieldInputProps<TForm extends Record<string, any>> extends Omit<BaseInputProps, 'name' | 'form' | 'value' | 'onChange'> {
  name: keyof TForm & string;
  label?: string;
  labelProps?: Omit<BaseLabelProps, 'htmlFor' | 'children'>;
  form: ReturnType<typeof useForm<TForm>>;
  showError?: boolean;
}

const DefaultLabel = React.forwardRef<HTMLLabelElement, BaseLabelProps>(
  ({ children, ...props }, ref) => (
    <label ref={ref} {...props}>{children}</label>
  )
);

DefaultLabel.displayName = 'DefaultLabel';

const DefaultInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={twMerge(clsx(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      ))}
      ref={ref}
      {...props}
    />
  )
);

DefaultInput.displayName = 'DefaultInput';

export function FieldInput<TForm extends Record<string, any>>({
  name,
  label,
  labelProps,
  form,
  showError = true,
  className,
  ...props
}: FieldInputProps<TForm>) {
  const error = form.errors[name];
  const value = form.data[name];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setData(name, e.target.value as TForm[keyof TForm & string]);
  };

  return (
    <div className="space-y-2">
      {label && (
        <DefaultLabel htmlFor={name} {...labelProps}>
          {label}
        </DefaultLabel>
      )}
      <DefaultInput
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className={twMerge(clsx(
          className,
          error && 'border-red-500'
        ))}
        aria-invalid={error ? true : false}
        {...props}
      />
      {showError && error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}