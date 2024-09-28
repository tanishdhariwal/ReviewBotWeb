// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backdropFilter: {
        none: "none",
        blur: "blur(20px)",
      },
    },
    variants: {
          extend: {
            backdropFilter: ['responsive'],
          },
        },
        plugins: [
          require('tailwindcss-filters'),
        ],
  },
});

// module.exports = {
//   purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {
//       backdropFilter: {
//         'none': 'none',
//         'blur': 'blur(20px)',
//       },
//     },
//   },
//   variants: {
//     extend: {
//       backdropFilter: ['responsive'],
//     },
//   },
//   plugins: [
//     require('tailwindcss-filters'),
//   ],
// }
