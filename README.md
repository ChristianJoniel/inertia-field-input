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
- 🔄 Compatible with multiple Inertia.js versions
- 🔍 Autocomplete select input
- ✓ Checkbox support with custom styling

## Requirements

This package assumes your project has:

- Laravel backend
- Inertia.js with React
- Tailwind CSS
- TypeScript support

## Version Compatibility

This package is designed to work with:
- Inertia.js v1.x and v2.x
- React 18.x and 19.x
- TypeScript 4.x and 5.x

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
  remember: boolean;
  country: string;
}

export default function LoginForm() {
  const form = useForm<FormData>({
    email: '',
    password: '',
    remember: false,
    country: '',
  });

  const countries = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'Mexico', value: 'mx' },
  ];

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
        type="checkbox"
        name="remember"
        form={form}
        label="Remember me"
        labelAfter
      />

      <FieldInput
        type="select"
        name="country"
        form={form}
        label="Country"
        title="Select a country"
        options={countries}
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

- `type` (default: `"text"`): Input type attribute. Supports:
  - Basic types: `"text"`, `"email"`, `"password"`, `"tel"`, `"number"`, `"url"`
  - Special types:
    - `"checkbox"`: Renders a styled switch component
    - `"select"`: Renders an autocomplete select input
    - `"datetime-local"`, `"date"`: Date input types

- `label`: Controls the input label behavior:
  - `undefined` (default): Automatically generates a label by capitalizing the `name` prop
  - `string`: Uses the provided text as the label
  - `null`: Explicitly removes the label element

- `labelAfter`: When `true`, renders the label after the input (useful for checkboxes)

- For select inputs:
  - `options`: Array of `{ label: string, value: any }` objects
  - `title`: The placeholder text shown in the select button
  ```tsx
  const options = [
    { label: 'Display Text', value: 'actual_value' },
    { label: 'Another Option', value: 'another_value' }
  ];
  ```

- `showError` (default: `true`): Controls error message display
- `className`: Additional CSS classes for the input wrapper
- `labelProps`: Props to pass to the Label component

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