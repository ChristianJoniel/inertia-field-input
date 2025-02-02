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
        label="Email"
        form={form}
        placeholder="m@example.com"
      />
      
      <FieldInput
        name="password"
        type="password"
        label="Password"
        form={form}
      />
      
      <button type="submit">Login</button>
    </form>
  );
}
```

## Props

The component accepts the following props:

- `name` (required): The field name in the form data
- `label`: Optional label text (use `null` to hide label)
- `labelProps`: Props to pass to the Label component
- `form` (required): The Inertia form instance
- `showError`: Whether to show validation errors (defaults to true)
- `type`: Input type ('text' | 'email' | 'password' | 'tel' | 'number' | 'url')
- `placeholder`: Input placeholder text
- `className`: Additional CSS classes for the input

Plus all standard HTML input attributes except 'name', 'form', 'value', and 'onChange' which are handled internally.

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