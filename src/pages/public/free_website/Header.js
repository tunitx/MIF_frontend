import React from "react";
import mif_mou from "../../../../assests/images/mif_mou.png.webp";

const Header = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="mt-12 w-full flex flex-col justify-center items-center gap-6 sm:gap-8 max-w-6xl mb-8 p-5">
        <p className="text-[#EF4D48] font-bold text-3xl font-PlayFair w-full text-center md:text-4xl lg:text-6xl xl:text-7xl">
          DIGITAL KRANTI{" "}
        </p>
        <div className="">
          <img src={mif_mou} alt="mif_mou" />
        </div>
        <p className="text-[#2B161B] font-bold  text-base sm:text-2xl w-full text-center font-PlayFair max-w-4xl ">
          Create your Free Website, Brief Profile, Digital Card, Business
          Promotion, etc., with Khojo Right Now (Registered Startup with GOI)
          and become a part of Digital Kranti.
        </p>
        <p className="text-[#453E3E] font-nomal text-sm sm:text-base lg:text-lg font-Poppins sm:font-medium w-full text-justify sm:text-center">
          Marwadi International Federation (MIF) in collaboration with Khojo
          Right Now (Startup Registered with GOI). This partnership marks a
          significant milestone in our ongoing efforts towards Digital Kranti
          that helps people stand out in crowd by Going Digital with minimum
          efforts using Khojo Digital Kranti Platform.
        </p>
      </div>
    </div>
  );
};

export default Header;
