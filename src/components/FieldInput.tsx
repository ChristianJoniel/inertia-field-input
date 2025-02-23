import React, { useMemo } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComboBox } from '../Partials/ComboBox';
import { cn } from '../lib/utils';
import { createDateJS } from '../lib/dates';
type InputType =
  | ({
    type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';
    checked?: never;
    options?: never;
    title?: never;
    value: string | number | readonly string[] | undefined;
  } & React.InputHTMLAttributes<HTMLInputElement>)
  | {
    type: 'checkbox';
    checked: boolean;
    options?: never;
    title?: never;
    value?: never;
  }
  | {
    type: 'datetime-local' | 'date';
    checked?: never;
    title?: never;
    options?: never;
    value: string | undefined;
  }
  | {
    type: 'select';
    value: string | number | undefined;
    options: { label: string; value: string | undefined }[];
    checked?: never;
    title: string;
  };

type BaseInputProps = React.ComponentPropsWithoutRef<typeof Input>;
type BaseLabelProps = React.ComponentPropsWithoutRef<'label'>;

type AllowedInputTypes = InputType['type'];

export interface FieldInputProps<TForm extends Record<string, any>> extends Omit<InputType, 'name' | 'form' | 'value' | 'onChange' | 'type'> {
  name: keyof TForm & string;
  label?: string | null;
  labelProps?: Omit<BaseLabelProps, 'htmlFor' | 'children'>;
  form: {
    data: TForm;
    errors: Partial<Record<keyof TForm, string>>;
    setData: (key: keyof TForm, value: any) => void;
  };
  showError?: boolean;
  type?: AllowedInputTypes;
  placeholder?: string;
  Input?: React.ComponentType<BaseInputProps>;
  Label?: React.ComponentType<BaseLabelProps>;
  className?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  labelAfter?: boolean;
  tabIndex?: number;
  readOnly?: boolean;
}

const DefaultLabel = Label;

export function FieldInput<TForm extends Record<string, any>>({
  name,
  label,
  labelProps,
  form,
  showError = true,
  className,
  type = 'text',
  Input,
  Label,
  ...props
}: FieldInputProps<TForm>) {
  const error = form.errors[name];
  const value = form.data[name];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setData(name, e.target.value as TForm[keyof TForm & string]);
  };

  const handleCheck = (checked: boolean) => {
    form.setData(name, checked as TForm[keyof TForm & string]);
  };

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

  const InputComponent = Input ?? DefaultInput;
  const LabelComponent = Label ?? DefaultLabel;

  function getPlaceholder(type: AllowedInputTypes): string | undefined {
    switch (type) {
      case 'email':
        return 'm@example.com';
      case 'password':
        return '••••••••';
      default:
        return undefined;
    }
  }

  const renderField = useMemo(() => {
    switch (type) {
      case 'checkbox':
        return (
          <Switch
            id={name}
            checked={props.checked as boolean}
            onCheckedChange={handleCheck}
          />
        );
      case 'select':
        return (
          <ComboBox
            name={name}
            setData={form.setData}
            title={props.title ?? name}
            options={props.options ?? []}
            defaultValue={value as string | number | undefined}

          />
          // <Select
          //   id={name}
          //   name={name}
          //   value={value}
          //   onChange={handleChange}
          //   error={!!error}
          //   className={className}
          //   aria-invalid={!!error}
          //   placeholder={props.placeholder || getPlaceholder(type)}
          //   {...props}
          // />
        );

      case 'datetime-local':
      case 'date':
        return (
          <InputComponent
            {...props}
            id={name}
            value={createDateJS(value as string, 'TZ').forDateInput()}
            onChange={(e) => {
              form.setData(name, createDateJS(e.target.value, 'UTC').forDateInput());
            }}
          />)

      default:
        return (
          <InputComponent
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            error={!!error}
            className={className}
            aria-invalid={!!error}
            placeholder={props.placeholder || getPlaceholder(type)}
            {...props}
          />
        );
    }
  }, [type, name, value, error, className, props]);

  const renderLabel = (position: 'before' | 'after' = 'before') => {
    const shouldRender =
      label !== null &&
      ((position === 'before' && !props.labelAfter) ||
        (position === 'after' && props.labelAfter));

    return (
      shouldRender && (
        <LabelComponent htmlFor={name}>
          {props.title ||
            label ||
            name.charAt(0).toUpperCase() + name.slice(1)}
        </LabelComponent>
      )
    );
  };

  return (
    <>
      {renderLabel('before')}
      {renderField}
      {renderLabel('after')}

      {showError && error && (
        <p className="text-sm font-medium text-destructive">{error}</p>
      )}
    </>
  );
}