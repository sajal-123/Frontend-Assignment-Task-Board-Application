/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // essential for manual theme switching
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
      },
      animation: {
        shine: "shine 1s linear infinite",
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}

