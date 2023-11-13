import React from "react";
import membershipChart from "../../../assests/images/membershipChart.jpeg.webp";

const Header = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="mt-12 w-full flex flex-col justify-center items-center gap-6 sm:gap-8 max-w-6xl mb-8">
        <p className="text-[#EF4D48] font-bold text-3xl font-PlayFair w-full text-center md:text-4xl lg:text-6xl xl:text-7xl">
          Membership & Fees
        </p>
        <p className="text-[#2B161B] font-semibold  text-base sm:text-2xl w-full text-center font-PlayFair">
          Come, Join and Become Member at MIF
        </p>
        <p className="text-[#453E3E] font-nomal text-sm sm:text-base lg:text-lg font-Poppins sm:font-medium w-full lg:text-base px-5 text-justify">
          Come and join the Marwadi International community and experience a
          world of opportunities and connections. As a member, you will gain
          access to a vibrant network of like-minded individuals who share a
          common heritage and passion for success. Expand your business
          horizons, forge valuable partnerships, and tap into a global community
          of Marwadi professionals and entrepreneurs. Benefit from exclusive
          events, workshops, and mentorship programs tailored to your needs.
          Take advantage of our comprehensive support system and resources to
          enhance your personal and professional growth. Join Marwadi
          International today and unlock the limitless potential that comes with
          being part of this esteemed community.
        </p>
        <div className="w-full p-5">
          <img
            src={membershipChart}
            alt="membership_chart"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
