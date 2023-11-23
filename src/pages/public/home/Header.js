import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-header_bg bg-center bg-no-repeat bg-cover px-6 py-32 relative w-full md:px-12 lg:px-20">
      <div className="header_gradient overlay_background absolute w-full h-full top-0 left-0  bg-transparent opacity-80"></div>
      <div className="z-10 relative flex flex-col gap-16">
        <div className="flex flex-col gap-7">
          <h1 className="text-[#FF4848] font-PlayFair font-bold text-3xl sm:text-4xl lg:text-6xl xl:text-8xl text-stroke">
            Marwadi International Federation
          </h1>
          <p className="text-white font-PlayFair font-bold text-xl">
            An organization to encourage Social, Cultural, Trade and Businesses
            activities.
          </p>
        </div>
        <div className="flex flex-col gap-7 items-start sm:items-center sm:flex-row sm:gap-14">
          <Link to="https://app.marwadiinternationalfederation.com/form">
            <button className="flex w-full  justify-center max-w-[220px] rounded-md bg-[#EF4D48] px-12 py-5  text-lg sm:text-xl font-extrabold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap">
              Join Us
            </button>
          </Link>
          <Link to={"/contact"}>
            <button className="flex w-full  justify-center max-w-[220px] rounded-sm border-2 border-[#EF4D48]  fill-white px-12 py-5 text-lg sm:text-xl font-extrabold  leading-6 text-white shadow-sm  hover:cursor-pointer whitespace-nowrap">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
