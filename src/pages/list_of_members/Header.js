import React from "react";

const Header = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="mt-12 w-full flex flex-col justify-center items-center gap-8 max-w-6xl">
        <p className="text-[#EF4D48] font-bold text-3xl font-PlayFair w-full text-center md:text-4xl lg:text-6xl xl:text-7xl">
          List of Members
        </p>
        <p className="text-[#453E3E] font-nomal text-sm font-Poppins text-center w-full lg:text-base ">
          As a Member of Marwadi International, you hold a prestigious position
          within our esteemed community. As a recognized leader and contributor
          to the Marwadi heritage, we are honored to have you as a Trustee
          Member and look forward to providing you with exceptional experiences,
          meaningful connections, and the platform to amplify your impact within
          the Marwadi community and beyond.
        </p>
      </div>
    </div>
  );
};

export default Header;
