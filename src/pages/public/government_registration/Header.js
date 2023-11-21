import React from "react";

const Header = () => {
  return (
    <div>
      <div className="w-full p-5 relative flex justify-center">
        <div className="max-w-6xl w-full flex flex-col gap-4">
          <h2 className="text-[#EF4D48] text-3xl font-PlayFair font-bold w-full text-center md:text-3xl lg:text-5xl xl:text-7xl">
            Registration(s)
          </h2>
          <p className="text-[#2B161B] font-semibold  text-base sm:text-2xl w-full text-center font-PlayFair">
            An organization to encourage Social, Cultural, Trade and Businesses
            activities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
