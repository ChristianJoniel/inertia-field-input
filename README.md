# @codecn/inertia-field-input

An opinionated form input component library for Laravel + Inertia.js + React + shadcn/ui projects.

## Installation

```bash
npm install @codecn/inertia-field-input
```

## Components

This package provides a set of form components that integrate seamlessly with Laravel's Inertia.js and shadcn/ui.

### FormInput

A text input component that integrates with Inertia.js forms.

```tsx
import { FormInput, useField } from "@codecn/inertia-field-input";

// Basic usage
<FormInput
  id="name"
  value={form.data.name}
  onChange={(e) => form.setData("name", e.target.value)}
  error={form.errors.name}
  label="Name"
/>;

// With useField hook - automatically handles errors from Laravel validation
<FormInput label="Name" {...useField("name")} required autoComplete="name" placeholder="Full name" />;

// Email input example
<FormInput
  type="email"
  label="Email"
  {...useField("email")}
  required
  autoComplete="username"
  placeholder="Email address"
/>;

// Using a custom input component
// First, create your custom input component in your project
// src/components/ui/CustomInput.tsx
const CustomInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <input ref={ref} {...props} className="custom-input-class" />
));

// Then, create your own FormInput that extends the package's FormInput
// src/components/FormInput.tsx
import { FormInput as BaseFormInput } from "@codecn/inertia-field-input";
import { CustomInput } from "./ui/CustomInput";

export const FormInput = (props: React.ComponentProps<typeof BaseFormInput>) => (
  <BaseFormInput {...props} InputComponent={CustomInput} />
);

// Now you can use your custom FormInput throughout your application
import { FormInput } from "@/components/FormInput";

<FormInput label="Custom Input" {...useField("custom")} />;
```

### FormSelect

A select dropdown component for single selection.

```tsx
import { FormSelect, useField } from "@codecn/inertia-field-input";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
];

// Basic usage
<FormSelect
  id="category"
  value={form.data.category}
  onChange={(value) => form.setData("category", value)}
  options={options}
  error={form.errors.category}
  label="Category"
/>;

// With useField hook - automatically handles errors from Laravel validation
<FormSelect label="Category" {...useField("category")} options={options} required />;
```

### FormCheckbox

A checkbox component for boolean values.

```tsx
import { FormCheckbox, useField } from "@codecn/inertia-field-input";

// Basic usage
<FormCheckbox
  id="terms"
  checked={form.data.terms}
  onChange={(checked) => form.setData("terms", checked)}
  error={form.errors.terms}
  label="I agree to the terms"
/>;

// With useField hook - automatically handles errors from Laravel validation
<FormCheckbox label="I agree to the terms" {...useField("terms")} required />;
```

### FormDate

A date picker component with calendar integration.

```tsx
import { FormDate, useField } from "@codecn/inertia-field-input";

// Basic usage
<FormDate
  id="birthday"
  value={form.data.birthday}
  onChange={(date) => form.setData("birthday", date)}
  error={form.errors.birthday}
  label="Birthday"
/>;

// With useField hook - automatically handles errors from Laravel validation
<FormDate label="Birthday" {...useField("birthday")} required />;
```

### FormMultiSelect

A multi-select component for selecting multiple options.

```tsx
import { FormMultiSelect, useField } from "@codecn/inertia-field-input";

const options = [
  { label: "Tag 1", value: "tag1" },
  { label: "Tag 2", value: "tag2" },
  { label: "Tag 3", value: "tag3" },
];

// Basic usage
<FormMultiSelect
  id="tags"
  value={form.data.tags}
  onChange={(values) => form.setData("tags", values)}
  options={options}
  error={form.errors.tags}
  label="Tags"
/>;

// With useField hook - automatically handles errors from Laravel validation
<FormMultiSelect
  label="Tags"
  {...useField("tags")}
  options={[
    { label: "Tag 1", value: "tag1" },
    { label: "Tag 2", value: "tag2" },
  ]}
/>;
```

## Core Hooks

### useForm

A hook that simplifies form handling with Inertia.js. You can destructure it just like Inertia's useForm.

```tsx
import { useForm, useField } from "@codecn/inertia-field-input";

// Destructure useForm like Inertia.js
const {
  data,
  setData,
  errors,
  processing,
  reset,
  post,
  put,
  patch,
  delete: destroy,
} = useForm({
  name: "",
  email: "",
  terms: false,
});

// Access form data
console.log(data);

// Set form data
setData("name", "John Doe");

// Handle form submission
const handleSubmit = (e) => {
  e.preventDefault();
  post("/api/users");
};

// Access form errors
console.log(errors);

// Check if form is processing
console.log(processing);

// Reset form
reset();
```

### useField

A hook that provides field-specific functionality for form inputs and automatically handles error display.

```tsx
import { useField } from "@codecn/inertia-field-input";

// The useField hook returns an object with all necessary props for a form field
// including value, onChange, error, and other attributes needed for the field
const fieldProps = useField("name");

// You can spread these props directly into your form components
<FormInput label="Name" {...fieldProps} required />;

// You can also combine with additional props
<FormInput label="Email" {...useField("email")} type="email" autoComplete="email" />;
```

## Integration with Laravel

This package is designed to work seamlessly with Laravel's backend validation. When using the `useField` hook, errors from Laravel's validation will automatically be displayed in the corresponding form fields.

```php
// In your Laravel controller
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'terms' => 'required|accepted',
    ]);

    // Process the validated data
    // ...

    return redirect()->back()->with('success', 'User created successfully');
}
```

## Complete Form Example

Here's a complete example of a form using the components and hooks:

```tsx
import { useForm, useField, FormInput, FormSelect, FormCheckbox, FormMultiSelect } from "@codecn/inertia-field-input";

export default function UserForm() {
  const { data, setData, errors, processing, post } = useForm({
    name: "",
    email: "",
    role: "",
    terms: false,
    tags: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/api/users");
  };

  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Guest", value: "guest" },
  ];

  const tagOptions = [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "DevOps", value: "devops" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <FormInput label="Name" {...useField("name")} required autoComplete="name" placeholder="Full name" />

      <FormInput
        type="email"
        label="Email"
        {...useField("email")}
        required
        autoComplete="username"
        placeholder="Email address"
      />

      <FormSelect label="Role" {...useField("role")} options={roleOptions} required />

      <FormMultiSelect label="Tags" {...useField("tags")} options={tagOptions} />

      <FormCheckbox label="I agree to the terms" {...useField("terms")} required />

      <button
        type="submit"
        disabled={processing}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {processing ? "Saving..." : "Save User"}
      </button>
    </form>
  );
}
```

## Styling

All components are styled using shadcn/ui's design system and can be customized using Tailwind CSS classes.

```tsx
<FormInput label="Name" {...useField("name")} className="w-full max-w-md" />
```

## License

MIT
