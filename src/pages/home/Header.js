import React from "react";

const Header = () => {
  return (
    <div className="bg-header_bg bg-center bg-no-repeat bg-cover px-6 py-32 relative w-full md:px-12 lg:px-20">
      <div className="overlay_background absolute w-full h-full top-0 left-0 bg-gradient-to-br from-[#AE371E] via-[#1A193F] to-[#AE371E] bg-transparent opacity-80"></div>
      <div className="z-10 relative flex flex-col gap-16">
        <div className="flex flex-col gap-7">
          <h1 className="text-[#FF4848] font-PlayFair font-bold text-3xl sm:text-4xl lg:text-6xl xl:text-8xl stroke-white stroke-1">
            Marwadi International Federation
          </h1>
          <p className="text-white font-PlayFair font-bold text-xl">
            An organization to encourage Social, Cultural, Trade and Businesses
            activities.
          </p>
        </div>
        <div className="flex flex-col gap-7 items-center sm:flex-row sm:gap-14">
          <button className="flex w-full justify-center max-w-[200px] rounded-md bg-[#EF4D48] px-12 py-5 text-lg font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 ">
            Join Us
          </button>
          <button className="flex w-full justify-center max-w-[200px] rounded-sm border-2 border-[#EF4D48]  fill-white px-12 py-5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
