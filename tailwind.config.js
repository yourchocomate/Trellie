/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/js/**/*.{html,js,jsx}", 
    "./resources/views/index.blade.php",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
