import React from "react";
import mifHead from "../../../../../assests/images/mifHead.webp";

const Header = () => {
  return (
    <div className="w-full p-5 relative flex justify-center">
      <div className="max-w-6xl w-full justify-center items-center flex flex-col gap-6">
        <div className="max-w-6xl w-full flex flex-col gap-2">
          <h2 className="text-[#2B161B] text-lg font-Poppins font-bold  w-full text-center md:text-4xl ">
            Office Bearers
          </h2>
          <p className="text-[#2B161B] font-medium  text-base sm:text-xl w-full text-center font-Poppins">
            MIF Marwadi Matrimony
          </p>
        </div>
        {/* Marwadi Head */}

        <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-center items-center gap-3 ">
          <img src={mifHead} alt="cap" className="rounded-md max-w-[180px]" />
          <div className="w-full text-center sm:text-left sm:self-end">
            {" "}
            <p className="text-xl sm:text-3xl font-Poppins text-[#333] font-semibold ">
              Makkhan Lal Kanda
            </p>
            <p className="sm:text-base text-sm font-Poppins text-[#333] ">
              National Convenor
            </p>
            <p className="sm:text-base text-sm font-Poppins text-[#333] ">
              MIF Marwadi Matrimony
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
