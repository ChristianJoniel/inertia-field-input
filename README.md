# @codecn/inertia-field-input

An opinionated form input component for Laravel + Inertia.js + React + shadcn/ui projects. This package provides a wrapper around shadcn's input component that integrates with Inertia's form handling and provides built-in validation display.

## Requirements

This package assumes your project has:

- Laravel backend
- Inertia.js with React
- shadcn/ui components installed
- TypeScript support

## Installation

```bash
npm install @codecn/inertia-field-input
# or
yarn add @codecn/inertia-field-input
```

## Usage

```tsx
import { FieldInput } from '@codecn/inertia-field-input';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function MyForm() {
  const form = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldInput
        name="email"
        label="Email"
        type="email"
        form={form}
        placeholder="Enter your email"
        Input={Input}
        Label={Label}
      />
      
      <FieldInput
        name="password"
        label="Password"
        type="password"
        form={form}
        placeholder="Enter your password"
        Input={Input}
        Label={Label}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Props

The component accepts all props that shadcn's Input component accepts, plus:

- `name` (required): The field name in the form data
- `label`: Optional label text
- `labelProps`: Props to pass to the Label component
- `form` (required): The Inertia form instance
- `showError`: Whether to show validation errors (defaults to true)
- `Input` (required): The shadcn Input component
- `Label` (required): The shadcn Label component

## Styling

The component uses shadcn's styling by default and adds:

- Red border for invalid fields
- Error message display below the input
- Proper spacing between label, input, and error message

## Development

To build the package:

```bash
npm run build
```

To develop with watch mode:

```bash
npm run dev
```

## Publishing

This package is published under the `@codecn` scope. To publish:

```bash
npm login # if not already logged in
npm publish
```

Note: Make sure you have access to the `@codecn` organization on npm.

## License

MIT 