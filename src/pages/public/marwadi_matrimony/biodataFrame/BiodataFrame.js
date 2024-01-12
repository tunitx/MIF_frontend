import React, { useState, useContext, useEffect } from "react";
import HeroAvatar from "./HeroAvatar";
import HeroIntro from "./HeroIntro";
import QuickInformationSection from "./QuickInformationSection";
import PaternalFamilyDetails from "./PaternalFamilyDetails";
import MaternalFamilyDetails from "./MaternalFamilyDetails";
import ReachOutDetails from "./ReachOutDetails";
import Carousel from "react-multi-carousel";
import TopLoadingBarContext from "../../../../utils/context/TopLoadingBarContext";
import { useTopLoadingBar } from "../../../../hooks/useTopLoadingBar";

const BiodataFrame = ({ info }) => {
  const { image1, image2, image3, _id } = info;

  const [showAvatarCarousel, setShowAvatarCarousel] = useState(false);

  const images = [image1];
  image2 && images.push(image2);
  image3 && images.push(image3);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 740 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 740, min: 0 },
      items: 1,
    },
  };

  const { LoadingDone } = useTopLoadingBar();

  return (
    <div className="relative fade-in w-full flex flex-col justify-center  items-center p-2 ">
      <div
        className="relative bg-seashell w-full max-w-md shadow-lg rounded-lg p-2 py-4 flex justify-center flex-col items-center gap-6"
        onLoad={() => {
          LoadingDone();
        }}
      >
        {/* <img
        className="absolute h-[27.48%] w-[214.83%] top-[84.8%] right-[-60.69%] bottom-[-12.28%] left-[-54.13%] max-w-full overflow-hidden max-h-full object-contain"
        alt=""
        src="/vector@2x.png"
      />
      <img
        className="absolute h-[27.48%] w-[214.83%] top-[35.86%] right-[-58.03%] bottom-[36.66%] left-[-56.8%] max-w-full overflow-hidden max-h-full object-contain"
        alt=""
        src="/vector@2x.png"
      />
      <div className="absolute top-[21.56rem] left-[0rem] flex flex-col items-start justify-start gap-[2rem]"> */}
        <HeroAvatar
          info={{ images }}
          setShowAvatarCarousel={setShowAvatarCarousel}
        />
        <HeroIntro info={info} />
        <QuickInformationSection info={info} />
        <PaternalFamilyDetails info={info} />
        <MaternalFamilyDetails info={info} />
        <ReachOutDetails info={info} />
        {/* </div> */}
        {/* <img
        className="absolute h-[27.48%] w-[214.83%] top-[-8.99%] right-[-79.89%] bottom-[81.51%] left-[-34.93%] max-w-full overflow-hidden max-h-full object-contain"
        alt=""
        src="/vector@2x.png"
      /> */}
      </div>

      {/* Floating Button for Sharing */}

      <div
        className="fixed bottom-10 right-10 shadow-lg sm:right-12 p-3 py-2 bg-[#EF4D48] rounded-md self-end  z-50 hover:cursor-pointer hover:scale-110 transition-all"
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: "MIF Marwadi Matrimony",
              text: "Hey, have a look at my biodata",
              url: `/matrimony/biodata/${_id}`,
            });
          } else {
            navigator.clipboard.writeText(
              `https://bababatuni.in/matrimony/biodata/${_id}`
            );
          }
        }}
      >
        <p className="w-fit flex gap-3 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.2rem"
            viewBox="0 0 512 512"
            fill="#fff"
          >
            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
            <path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
          </svg>
          <span className="font-semibold text-white">Share</span>
        </p>
      </div>

      {showAvatarCarousel && (
        <div className="fixed fade-in flex flex-col justify-center items-center gap-8 backdrop-blur-sm  w-screen h-screen top-0 left-0 bg-[#323233] overflow-y-auto overflow-x-auto p-5 bg-opacity-90 z-[80]">
          <div className="w-full h-full flex sm:flex-row-reverse flex-col gap-4 justify-center items-center">
            <div
              className="self-start flex justify-center  hover:cursor-pointer group mt-2"
              onClick={() => {
                setShowAvatarCarousel(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2em"
                viewBox="0 0 384 512"
                fill="#fff"
                className="group-hover:fill-[#EF4D48]"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>

            <div className="relative pb-4 sm:w-[80vw] w-full">
              <Carousel
                responsive={responsive}
                // autoPlay={true}
                // autoPlaySpeed={2000}
                transitionDuration={1000}
                // infinite={true}
                renderDotsOutside={true}
                showDots={true}
                dotListClass="flex gap-2 mt-4 relative"
                containerClass="mb-10"
                itemClass="flex justify-center items-center"
              >
                {images.map((imageSlide, index) => {
                  return (
                    <div
                      key={index}
                      className="w-fit sm:h-full h-fit rounded-lg"
                    >
                      <img
                        src={imageSlide}
                        alt={`image${index}`}
                        className="rounded-lg max-h-[80vh] my-auto "
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiodataFrame;
