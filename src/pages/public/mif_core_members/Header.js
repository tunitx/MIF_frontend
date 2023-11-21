import React from "react";

const Header = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="mt-12 w-full flex flex-col justify-center items-center gap-8 max-w-6xl">
        <p className="text-[#EF4D48] font-bold text-3xl font-PlayFair w-full text-center md:text-4xl lg:text-5xl ">
          MIF Core Members
        </p>
        <p className="text-[#453E3E] font-nomal text-sm font-Poppins text-center w-full lg:text-base ">
          The Marwadi International Federation thrives through the unwavering
          commitment of its core members, who passionately preserve Marwadi
          heritage and foster global unity within the community. Their
          dedication drives cultural celebrations, community bonds, and
          impactful philanthropy.
        </p>
      </div>
    </div>
  );
};

export default Header;
