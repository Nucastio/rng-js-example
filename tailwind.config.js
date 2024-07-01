export default {
  content: ["./src/**/*.jsx"],
  plugins: [],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in ease-in-out infinite",
        // "fade-in": 'fade-in ease-in-out infinite alternate',
      },
      colors: {
        gray: "#9A9A9A",
        primary: "#00FFFF",
        // secondary: "#B297FF",
        tertiary: "#fff",
      },
      fontFamily: {
        "arti-reg": ["var(--font-atri-regular)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "var(--end-value)" },
        },
      },
    },
  },
};
