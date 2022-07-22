/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/js/**/*.{html,js,jsx}", 
    "./resources/views/index.blade.php",
  ],
  theme: {
    extend: {
      visibility: ['group-hover'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
