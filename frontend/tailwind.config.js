/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary branding colors
        primary: "#1D4ED8",       // Deep Blue
        secondary: "#374151",     // Dark Gray
        accent: "#3B82F6",        // Sky Blue / CTA
        success: "#10B981",       // Teal / Green
        warning: "#F59E0B",       // Amber / Orange

        // Background / Neutral
        light: "#F3F4F6",         // Light Gray
        lighter: "#F9FAFB",       // Very Light Gray
      },
    },

  },
  plugins: [],
}

