// hooks/useForm.ts
import { useForm as useInertiaForm } from "@inertiajs/react";
import { useMemo, ChangeEvent } from "react";

type BaseFieldProps = {
  name: string;
  id: string;
  error?: string;
};

type BooleanFieldProps = {
  checked: boolean;
  onBooleanChange: (value: boolean) => void;
};

type TextFieldProps = {
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
};

// Updated to match FormMultiSelect component interface
type ArrayFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any[]) => void;
};

// Helper types to determine field types
type IsBoolean<T> = T extends boolean ? true : false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IsArray<T> = T extends any[] ? true : false;

// Conditional type for field props based on the field type
type FieldProps<T, K extends keyof T> = BaseFieldProps &
  (IsBoolean<T[K]> extends true
    ? BooleanFieldProps
    : IsArray<T[K]> extends true
      ? ArrayFieldProps
      : TextFieldProps);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useForm<T extends Record<string, any>>(initialValues: T) {
  const form = useInertiaForm<T>(initialValues);

  const useField = <K extends keyof T>(name: K): FieldProps<T, K> => {
    // Extract complex expressions from dependency array
    const fieldValue = form.data[name];
    const fieldError = form.errors[name];

    return useMemo(() => {
      const base = {
        name: String(name),
        id: String(name),
        error: fieldError,
      };

      // Check if the field is a boolean
      if (typeof fieldValue === "boolean") {
        return {
          ...base,
          checked: fieldValue as boolean,
          onBooleanChange: (value: boolean) => {
            form.setData(name, value as T[K]);
          },
        } as unknown as FieldProps<T, K>;
      }

      // Check if the field is an array
      if (Array.isArray(fieldValue)) {
        return {
          ...base,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value: fieldValue as any[],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange: (value: any[]) => {
            form.setData(name, value as T[K]);
          },
        } as unknown as FieldProps<T, K>;
      }

      // For non-boolean, non-array fields
      return {
        ...base,
        value: fieldValue as string,
        onChange: (
          e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >,
        ) => {
          form.setData(name, e.target.value as T[K]);
        },
      } as unknown as FieldProps<T, K>;
    }, [fieldValue, fieldError, name]);
  };

  return { ...form, useField };
}
