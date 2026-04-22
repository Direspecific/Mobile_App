/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1449E8",
          light: "#3F68EB",
          soft: "#6A88EF",
          muted: "#95A7F3",
          pale: "#C0C7F8",
        },

        secondary: {
          DEFAULT: "#FE9801",
          light: "#FEB233",
          soft: "#FEC666",
          muted: "#FFDC99",
          pale: "#FFECCC",
        },

        neutral: {
          900: "#1A1A1A",
          700: "#40454A",
          600: "#6A7178",
          500: "#949CA3",
          300: "#BFC6CC",
          100: "#F8FEF9",
        },

        success: {
          dark: "#025622",
          DEFAULT: "#00C04C",
          muted: "#67A680",
          soft: "#B3FFD2",
          pale: "#EEFFF8",
        },

        error: {
          DEFAULT: "#E4221F",
          soft: "#FCEEEE",
          pale: "#FFF5F5",
        },

        background: "#F5F5F5",
        surface: "#FFFFFF",
        border: "#E5E7EB",
      },

      borderRadius: {
        button: "12px",
        card: "16px",
        xl: "20px",
      },

      spacing: {
        screen: "24px",
      },
fontSize: {
  display: ["36px", { lineHeight: "44px" }],
  displayLg: ["40px", { lineHeight: "50px" }],

  h1: ["32px", { lineHeight: "40px" }],
  h2: ["24px", { lineHeight: "32px" }],
  h3: ["22px", { lineHeight: "30px"}],
  h4: ["20px", { lineHeight: "28px"}],

  body: ["16px", { lineHeight: "24px" }],
  bodySm: ["14px", { lineHeight: "20px" }],
  caption: ["12px", { lineHeight: "16px" }],
},
    },
  },
  plugins: [],
};