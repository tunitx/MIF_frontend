import React, { useState, useContext, useEffect } from "react";
import HeroAvatar from "./HeroAvatar";
import HeroIntro from "./HeroIntro";
import QuickInformationSection from "./QuickInformationSection";
import PaternalFamilyDetails from "./PaternalFamilyDetails";
import MaternalFamilyDetails from "./MaternalFamilyDetails";
import ReachOutDetails from "./ReachOutDetails";
import Carousel from "react-multi-carousel";
import TopLoadingBarContext from "../../../../utils/context/TopLoadingBarContext";

const BiodataFrame = ({ info }) => {
  const {
    firstName,
    surname,
    caste,
    subcaste,
    gotra,
    manglik,
    image1,
    image2,
    image3,
  } = info;

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

  const { topLoadingBarRef } = useContext(TopLoadingBarContext);

  // console.log(topLoadingBarRef);

  useEffect(() => {
    topLoadingBarRef?.current?.continuousStart();
    // return () => {
    //   topLoadingBarRef?.current?.complete();
    // };
  }, []);

  return (
    <div className=" fade-in w-full flex justify-center items-center p-2 ">
      <div
        className="relative bg-seashell w-full max-w-md shadow-lg rounded-lg p-2 py-4 flex justify-center flex-col items-center gap-6"
        onLoad={() => {
          topLoadingBarRef?.current?.complete();
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
      {showAvatarCarousel && (
        <div className="fixed fade-in flex flex-col justify-center items-center gap-8 backdrop-blur-sm  w-screen h-screen top-0 left-0 bg-[#323233] overflow-y-auto overflow-x-auto p-5 bg-opacity-90 z-50">
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
