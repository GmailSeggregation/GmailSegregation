/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      boxShadow:{
        'xl':'shadow-[inset_0px_20px_20px_10px_#00000024]'
      }
    },
  },
  plugins: [],
}

