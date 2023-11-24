import React from "react";
import MIF_news from "../home/MIF_news";

const Header = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-6xl flex justify-center flex-col ">
        <h2 className="font-PlayFair text-[#2B161B] font-bold text-2xl w-full text-center py-5 mt-10 sm:text-3xl md:text-4xl lg:text-5xl">
          MIF Press Coverage
        </h2>
        <MIF_news exploreMore={false} />
      </div>
    </div>
  );
};

export default Header;
