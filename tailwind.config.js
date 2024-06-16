module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        darkBg: "#1a202c",
        darkCard: "#2d3748",
        darkText: "#e2e8f0",
        darkButton: "#4a5568",
        darkButtonHover: "#2c5282",
        darkTextarea: "#2d3748",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
