/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        header_bg: "url('./assests/images/header_bg.jpeg')",
        ca_vijayGarg: "url('./assests/images/CA_Vijay.jpg')",
        globe_study: "url('./assests/images/globel_study_abroad.jpg')",
        matrimony: "url('./assests/images/MIF Martimony.jpg')",
      },
      fontFamily: {
        PlayFair: ["Playfair Display", "sans-serif"],
        Poppins: ["Poppins ", "sans-serif"],
        Lato: ["Lato", "sans-serif"],
      },
      boxShadow: {
        box_shadow_marwadi: "0px 0px 10px 0px rgba(0,0,0,0.5)",
        box_shadow_marwadi_LOM: "-2px 3px 3px 2px rgba(239,77,72,0.7)",
        ca_vijay_shadow:
          "0px 0px 10px 0px rgba(236.49375915527347, 234.95140855208692, 234.95140855208692, 0.93)",
      },
      opacity: {
        15: ".15",
      },
    },
  },
  plugins: [require("autoprefixer")],
};
