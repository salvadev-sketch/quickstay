/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1F1E",
        "ink-raised": "#12302E",
        paper: "#F3EEE4",
        "paper-dim": "#E7E0D0",
        brass: "#C9A227",
        "brass-deep": "#8F7318",
        slate: "#9FB3AE",
      },
      fontFamily: {
        display: ["Newsreader", "serif"],
        body: ["Manrope", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "3px",
      },
    },
  },
  plugins: [],
};
