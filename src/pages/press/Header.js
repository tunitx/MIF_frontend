import React from "react";
import MIF_news from "../home/MIF_news";
import press_jan from "../../../assests/images/press_2023_jan.jpeg";
import press_feb from "../../../assests/images/press_2023_feb.jpeg";
import press_april from "../../../assests/images/press_2023_april.jpeg.webp";
import press_march from "../../../assests/images/press_2023_march.jpeg.webp";

const Header = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-6xl flex justify-center flex-col ">
        <h2 className="font-PlayFair text-[#2B161B] font-bold text-2xl w-full text-center py-5 mt-10 sm:text-3xl md:text-4xl lg:text-5xl">
          MIF Press Coverage
        </h2>
        <MIF_news />
        {/* <div className="w-full flex justify-center">
          <div className="w-full border-black border-2 max-w-5xl">
            <div className=" w-full flex flex-wrap px-10 gap-8 text-[#444] font-Poppins justify-center py-3 pt-0">
              <button className="bg-[#444] text-white px-3 py-2">2023</button>
              <button>JAN</button>
              <button>FEB</button>
              <button>MAR</button>
              <button>APRIL</button>
            </div>
            <div className="w-full flex flex-wrap ">
              {Array(10)
                .fill("")
                .map(() => {
                  return (
                    <div className="w-full  min-[450px]:w-1/2 sm:w-1/3 lg:w-1/4 border-2">
                      <img src={press_jan} className="w-full h-auto" />
                    </div>
                  );
                })}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
