// tailwind.config.js is largely optional in Tailwind v4.
// Content detection is automatic. Custom tokens are defined in index.css via @theme.
// This file is kept for any plugin compatibility.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
