import React from "react";

const Header = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-6xl flex justify-center flex-col ">
        <h2 className="font-PlayFair text-[#2B161B] font-bold text-2xl w-full text-center py-5 mt-10 sm:text-3xl md:text-4xl lg:text-5xl">
          Disclaimer
        </h2>
        <div className="p-5 text-center flex flex-col gap-5 font-Poppins text-sm sm:text-base">
          <p className="w-full justify-center">
            Kindly read this disclaimer carefully.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
