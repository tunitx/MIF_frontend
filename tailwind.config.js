/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        header_bg: "url('./assests/images/header_bg.jpeg')",
        ca_vijayGarg: "url('./assests/images/CA_Vijay.jpg')",
        globe_study: "url('./assests/images/globel_study_abroad.jpg')",
      },
      fontFamily: {
        PlayFair: ["Playfair Display", "sans-serif"],
        Poppins: ["Poppins ", "sans-serif"],
      },
      boxShadow: {
        box_shadow_marwadi: "0px 0px 10px 0px rgba(0,0,0,0.5)",
        ca_vijay_shadow:
          "0px 0px 10px 0px rgba(236.49375915527347, 234.95140855208692, 234.95140855208692, 0.93)",
      },
    },
  },
  plugins: [require("autoprefixer")],
};
