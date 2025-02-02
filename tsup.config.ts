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
  external: [
    'react',
    '@inertiajs/react',
    'class-variance-authority',
    'tailwind-merge',
    'clsx',
    'cva',
    'react-dom'
  ],
  banner: {
    js: '"use client";',
  },
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js'
    };
  }
}); 