/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        amarelo:"#F3BC00",
        verde:"#77AA4E"
      },
      fontFamily:{
        lilita:["Lilita One"]
      }
    },
  },
  plugins: [],
}