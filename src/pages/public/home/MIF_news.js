import React from "react";
import mifNews1 from "../../../../assests/images/mifNews1.jpeg";
import mifNews2 from "../../../../assests/images/mifNews2.jpeg";
import mifNews3 from "../../../../assests/images/mifNews3.jpeg";
import mifNews4 from "../../../../assests/images/mifNews4.jpeg";
import mifNews5 from "../../../../assests/images/mifNews5.jpeg";
import mifNews6 from "../../../../assests/images/mifNews6.jpeg";
import mifNews7 from "../../../../assests/images/mifNews7.jpeg";
import mifNews9 from "../../../../assests/images/mifNews9.jpeg";
import CarouselImage from "../../../components/CarouselImage";
import CarouselVideo from "../../../components/CarouselVideo";

const MIF_news = () => {
  const imageSlides = [
    mifNews1,
    mifNews2,
    mifNews3,
    mifNews4,
    mifNews5,
    mifNews6,
    mifNews7,
    mifNews9,
  ];

  const videoSlides = [
    "https://marwadiinternationalfederation.com/wp-content/uploads/2023/03/Marwadi-Press-Release.mp4",
    "https://marwadiinternationalfederation.com/wp-content/uploads/2023/03/Marwadi-News-Coverage.mp4",
    "https://marwadiinternationalfederation.com/wp-content/uploads/2023/02/WhatsApp-Video-2023-02-21-at-7.26.28-PM.mp4",
  ];

  return (
    <div className="w-full px-5 py-12 flex justify-center items-center">
      <div className="flex flex-col gap-4 sm:gap-12 max-w-6xl">
        <h2 className="text-[#2B161B] font-PlayFair text-xl font-bold text-center md:text-2xl lg:text-4xl">
          MIF in News
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8  lg:gap-16 w-full justify-center items-center">
          <div className="carousel_video w-full sm:w-fit  flex justify-center items-center">
            <CarouselVideo slides={videoSlides} />
          </div>
          <div className="carousel_video w-full sm:w-fit flex justify-center items-center">
            <CarouselImage slides={imageSlides} />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="flex w-full justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 ">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default MIF_news;
