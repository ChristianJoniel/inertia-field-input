# @codecn/inertia-field-input

An opinionated form input component for Laravel + Inertia.js + React projects. This package provides a styled input component that integrates with Inertia's form handling and provides built-in validation display, following shadcn/ui design patterns.

## Features

- 🎨 Styled with Tailwind CSS
- 🔄 Integrates with Inertia.js form handling
- ✨ Built-in error handling and validation display
- 🎯 TypeScript support
- 🎭 Customizable styling with class-variance-authority
- 📱 Responsive design
- 🌗 Supports both React 18 and 19

## Requirements

This package assumes your project has:

- Laravel backend
- Inertia.js with React
- Tailwind CSS
- TypeScript support

## Installation

```bash
npm install @codecn/inertia-field-input
# or
yarn add @codecn/inertia-field-input
# or
pnpm add @codecn/inertia-field-input
```

## Usage

```tsx
import { FieldInput } from '@codecn/inertia-field-input';
import { useForm } from '@inertiajs/react';

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const form = useForm<FormData>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldInput
        name="email"
        type="email"
        form={form}
        placeholder="m@example.com"
      />
      
      <FieldInput
        name="password"
        type="password"
        label="Your Password"
        form={form}
      />

      <FieldInput
        name="search"
        label={null}
        form={form}
      />
      
      <button type="submit">Login</button>
    </form>
  );
}
```

## Props

### Required Props

- `name`: The field name in the form data. Must match a key in your form data object.
- `form`: The Inertia form instance from `useForm()`.

### Optional Props

- `label`: Controls the input label behavior:
  - `undefined` (default): Automatically generates a label by capitalizing the `name` prop (e.g., "email" becomes "Email")
  - `string`: Uses the provided text as the label (e.g., `label="Your Email Address"`)
  - `null`: Explicitly removes the label element and its associated spacing

- `labelProps`: Props to pass to the Label component when `label` is not null.

- `showError` (default: `true`): Controls error message display:
  - `true`: Shows validation errors from `form.errors[name]` below the input
  - `false`: Hides error messages but still applies error styling to the input

- `type` (default: `"text"`): Input type attribute. Supports: `"text"`, `"email"`, `"password"`, `"tel"`, `"number"`, `"url"`

- `placeholder`: Placeholder text shown when the input is empty.

- `className`: Additional CSS classes for the input wrapper.

### HTML Input Props

The component accepts standard HTML input attributes except:
- `name`: Use the required `name` prop instead
- `value` and `onChange`: Managed by the form instance
- `type`: Use the typed `type` prop instead

Common HTML props you might use:
- `disabled`
- `required`
- `maxLength`
- `min`/`max` (for numeric inputs)
- `pattern`
- `autoComplete`

## Styling

The component uses Tailwind CSS with class-variance-authority for styling. It includes:

- Modern, clean input design
- Error states with red border
- Focus states with ring
- Disabled states
- Responsive text sizes
- Proper spacing between label, input, and error message

You can customize the styling by:
1. Passing a `className` prop to override specific styles
2. Using Tailwind's configuration to modify the base styles

## Error Handling

The component automatically handles Inertia form errors:

```tsx
<FieldInput
  name="email"
  label="Email"
  form={form}
  // Will show error message from form.errors.email if present
  showError={true} // default is true
/>
```

## Development

To build the package:

```bash
npm run build
```

To develop with watch mode:

```bash
npm run dev
```

## TypeScript Support

The component is fully typed and supports generic form data types:

```tsx
interface UserForm {
  name: string;
  email: string;
  age: number;
}

const form = useForm<UserForm>({
  name: '',
  email: '',
  age: 0,
});

<FieldInput<UserForm>
  name="email" // TypeScript will ensure this matches UserForm keys
  form={form}
/>
```

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. 