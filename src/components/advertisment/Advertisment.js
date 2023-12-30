import React, { useEffect, useState } from "react";
import { GET_ADVERTISMENTS } from "../../utils/constants";
import { useLocation } from "react-router-dom";
import AdCarousel from "./AdCarousel";

const Advertisment = () => {
  return (
    <div className="w-full bg-[#f7f3f5] relative max-w-6xl  flex justify-center items-center px-3 sm:px-5 my-10">
      <div className="w-full grid grid-cols-1  md:grid-cols-3 content-center gap-7	justify-items-center p-3">
        <AdCarousel itemsPerFrame={1} category="platinum" />
        <AdCarousel itemsPerFrame={2} category="gold" />
        <AdCarousel itemsPerFrame={3} category="silver" />
      </div>
    </div>
  );
};

export default Advertisment;
