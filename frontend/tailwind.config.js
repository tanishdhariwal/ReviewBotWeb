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
