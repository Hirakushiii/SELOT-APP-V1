/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./information.html',"./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

