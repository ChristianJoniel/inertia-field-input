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
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
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
  (IsBoolean<T[K]> extends true ? BooleanFieldProps : IsArray<T[K]> extends true ? ArrayFieldProps : TextFieldProps);

type FormData = {
  [key: string]: string | boolean | any[];
};

function useField<T extends FormData, K extends keyof T>(
  form: ReturnType<typeof useInertiaForm<T>>,
  name: K
): FieldProps<T, K> {
  // Extract complex expressions from dependency array
  const fieldValue = form.data[name];
  // @ts-expect-error
  const fieldError = form.errors[name as string];

  return useMemo(() => {
    const base = {
      name: String(name),
      id: String(name),
      error: fieldError,
    };

    if (typeof fieldValue === "boolean") {
      return {
        ...base,
        checked: fieldValue as boolean,
        onBooleanChange: (value: boolean) => {
          // @ts-expect-error
          form.setData(name as string, value as T[K]);
        },
      } as unknown as FieldProps<T, K>;
    }

    if (Array.isArray(fieldValue)) {
      console.log("fieldValue", fieldValue);
      return {
        ...base,
        value: fieldValue as any[],
        onChange: (value: any[]) => {
          // @ts-expect-error
          form.setData(name as string, value as T[K]);
        },
      } as unknown as FieldProps<T, K>;
    }

    return {
      ...base,
      value: fieldValue as string,
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        // @ts-expect-error
        form.setData(name as string, e.target.value as T[K]);
      },
    } as unknown as FieldProps<T, K>;
  }, [fieldValue, fieldError, name, form.setData]);
}

export function useForm<T extends FormData>(initialValues: T) {
  const form = useInertiaForm<T>(initialValues);
  return { ...form, useField: (name: keyof T) => useField(form, name) };
}
