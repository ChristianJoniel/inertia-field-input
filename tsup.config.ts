import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: true,
  splitting: false,
  sourcemap: true,
  treeshake: true,
  target: 'es2018',
  platform: 'browser',
  esbuildOptions(options) {
    options.jsx = 'automatic';
    options.alias = {
      '@': './src'
    };
  },
  external: [
    'react',
    'react/jsx-runtime',
    'react-dom',
    'react-dom/client',
    '@inertiajs/react',
    '@radix-ui/react-label',
    '@radix-ui/react-switch',
    '@radix-ui/react-dialog',
    '@radix-ui/react-popover',
    'class-variance-authority',
    'tailwind-merge',
    'clsx',
    'lucide-react',
    'cmdk'
  ],
  banner: {
    js: '"use client";',
  },
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js'
    };
  },
  env: {
    NODE_ENV: process.env.NODE_ENV || 'production'
  }
}); 