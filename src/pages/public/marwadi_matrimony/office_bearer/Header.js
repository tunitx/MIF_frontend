import React from "react";

const Header = () => {
  return (
    <div className="w-full p-5 relative flex justify-center">
      <div className="max-w-6xl w-full flex flex-col gap-3">
        <h2 className="text-[#2B161B] text-lg font-Poppins font-bold mt-5 w-full text-center md:text-4xl ">
          Office Bearer
        </h2>
        <p className="text-[#2B161B] font-medium  text-base sm:text-xl w-full text-center font-Poppins">
          MIF Marwadi Matrimony
        </p>
      </div>
    </div>
  );
};

export default Header;
