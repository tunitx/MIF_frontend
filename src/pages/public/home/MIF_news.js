import React from "react";
import CarouselImage from "../../../components/CarouselImage";
import CarouselVideo from "../../../components/CarouselVideo";
import { Link } from "react-router-dom";
import { useContext } from "react";
import PressClipContext from "../../../utils/context/PressClipContext";
import PressCutoutContext from "../../../utils/context/PressCutoutContext";

const MIF_news = ({ exploreMore }) => {
  const { clips, setClips } = useContext(PressClipContext);

  const { cutouts, setCutouts } = useContext(PressCutoutContext);

  if (clips === null || cutouts === null) return;

  return (
    <div className="w-full fade-in px-5 py-12 flex justify-center items-center">
      <div className="flex flex-col gap-4 sm:gap-12 max-w-6xl">
        <h2 className="text-[#2B161B] font-PlayFair text-xl font-bold text-center md:text-2xl lg:text-4xl">
          MIF in News
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8  lg:gap-16 w-full justify-center items-center">
          <div className="carousel_video w-full  flex justify-center items-center">
            <CarouselVideo slides={clips} />
          </div>
          <div className="carousel_video w-full  flex justify-center items-center">
            <CarouselImage slides={cutouts} />
          </div>
        </div>
        {exploreMore ? (
          <div className="flex justify-center items-center">
            <Link to={"/press"} className="w-full flex justify-center">
              <button className="flex w-full justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 ">
                Explore More
              </button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MIF_news;
