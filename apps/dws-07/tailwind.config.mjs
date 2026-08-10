import preset from "@dbp/config/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/.pnpm/@dbp+*/node_modules/@dbp/**/*.{ts,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
