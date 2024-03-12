// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Functional color names
        primary: "var(--color-dark-blue)",
        secondary: "var(--color-waikawa-gray)",
        info: "var(--color-dark-blue)",
        // info: "var(--color-light-blue)",
        warning: "var(--color-deep-yellow)",

        // Descriptive color names as an alternative reference or for specific use cases.
        "wine-berry": "var(--color-wine-berry)",
        claret: "var(--color-claret)",
        "white-smoke": "var(--color-white-smoke)",
        "scampi-blue": "var(--color-scampi-blue)",
        "grandis-yellow": "var(--color-grandis-yellow)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-lato)", "sans-serif"],
        medium: ["var(--font-lato)", "sans-serif"],
        light: ["var(--font-lato)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
