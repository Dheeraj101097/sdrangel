// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // adapt your paths
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "gradient-dark-start": "rgba(0, 0, 0, 0.9)",
        "gradient-dark-mid": "rgba(0, 0, 0, 0.6)",
        "gradient-dark-end": "rgba(255, 255, 255, 0.3)",
        "gradient-light-start": "rgba(30, 41, 59, 0.9)",
        "gradient-light-mid": "rgba(30, 41, 59, 0.6)",
        "gradient-light-end": "rgba(30, 41, 59, 0.3)",
      },
      boxShadow: {
        "digit-light":
          "0 4px 16px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.1)",
        "digit-dark":
          "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.3)",
        "glass-light": "0 8px 32px rgba(0,0,0,0.1)",
        "glass-dark": "0 8px 32px rgba(0,0,0,0.3)",
        "demo-button": "0 4px 16px rgba(99,102,241,0.3)",
        "demo-button-hover": "0 8px 24px rgba(99,102,241,0.4)",
        separator: "0 2px 8px rgba(99,102,241,0.3)",
      },
      keyframes: {
        rollUp: {
          "0%": { transform: "rotateX(0deg)" },
          "50%": {
            transform: "rotateX(-90deg)",
            background:
              "linear-gradient(145deg, rgba(99,102,241,0.3) 0%, rgba(139,92,246,0.3) 100%)",
          },
          "100%": { transform: "rotateX(0deg)" },
        },
        rollDown: {
          "0%": { transform: "rotateX(0deg)" },
          "50%": {
            transform: "rotateX(90deg)",
            background:
              "linear-gradient(145deg, rgba(99,102,241,0.3) 0%, rgba(139,92,246,0.3) 100%)",
          },
          "100%": { transform: "rotateX(0deg)" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        dotPulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
      animation: {
        rollUp: "rollUp 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)",
        rollDown: "rollDown 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)",
        pulse: "pulse 2s infinite",
        dotPulse: "dotPulse 3s infinite",
      },
    },
  },
  plugins: [],
};
