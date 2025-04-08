import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    tailwindcss(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "InertiaFieldInput",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "es.js" : "cjs.js"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@inertiajs/react",
        "@radix-ui/react-label",
        "@radix-ui/react-checkbox",
        "lucide-react",
        "react-day-picker",
        "@radix-ui/react-popover",
        "@radix-ui/react-select",
        "@radix-ui/react-dialog",
        "cmdk",
        "clsx",
        "date-fns",
        "class-variance-authority",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
