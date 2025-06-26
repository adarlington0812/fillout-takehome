/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        'medium': '12px',
      },
      colors: {
        brandBlue: '#2F72E2',
        slateBlue: '#677289',
        lightGray: '#E1E1E1',
        softWhite: '#FAFBFC',
      },
      spacing: {
        '3': '6px',
        '4': '8px',
        '6': '12px',
      }
    },
  },
  plugins: [],
}
