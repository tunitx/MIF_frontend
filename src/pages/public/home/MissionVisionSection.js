import React from "react";
import marwadi_logo from "../../../../assests/images/marwari_logo_pro.png";
import { Link } from "react-router-dom";

const MissionVisionSection = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="px-5 py-12 w-full flex flex-col sm:flex-row gap-12 max-w-6xl">
        <div className="mission border-l-[5px] border-[#EF4D48] rounded-lg py-7 px-5 shadow-box_shadow_marwadi flex flex-col gap-3 grow sm:w-80">
          <h3 className="text-[#2B161B] text-2xl font-PlayFair font-bold md:text-3xl">
            Mission
          </h3>
          <p className="font-medium text-base font-Poppins">
            “To Establish, Empower and Unite the Worldwide MARWADI Community for
            Social, Cultural and Business Networking with economic growth of
            RAJASTHAN.”
          </p>
        </div>
        <div className="marwadi_logo w-full flex justify-center items-center sm:2/3 md:w-1/3">
          <div className="w-[90%] sm:w-full flex justify-center">
            <img src={marwadi_logo} className="w-full max-w-sm" />
          </div>
        </div>
        <div className="vision border-r-[5px] border-[#EF4D48] rounded-lg py-7 px-5 shadow-box_shadow_marwadi flex flex-col gap-3 grow sm:w-80">
          <h3 className="text-[#2B161B] text-2xl font-PlayFair font-bold md:text-3xl">
            Vision
          </h3>
          <p className="font-medium text-base font-Poppins">
            ➥&nbsp;Our vision is to be the premier non-profit organization that
            empowers the Marwadi Community across the globe through effective
            business networking, social and cultural enrichment, and…
          </p>
          <Link
            to="/mission-and-vision"
            className="text-[#EF4D48] font-semibold"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionSection;
