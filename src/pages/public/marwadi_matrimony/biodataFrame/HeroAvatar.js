import React, { useState } from "react";
import avatarFrame from "../../../../../assests/images/mask-group@2x.webp";

const HeroAvatar = ({ info, setShowAvatarCarousel }) => {
  const { images } = info;

  const [showImage, setShowImage] = useState(images[0]);

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center">
      <div className="w-full relative">
        <div className="w-full">
          <img
            className="relative w-full h-auto object-cover z-[0] "
            alt=""
            src={avatarFrame}
          />
        </div>
        <div className="absolute flex items-start justify-start top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full sm:w-[8.5rem] sm:h-[8.5rem] w-[7.94rem] h-[7.94rem] overflow-hidden shrink-0 z-[2]">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[50%] bg-gainsboro box-border border-[5px] border-solid border-moccasin" />
          <img
            className="absolute w-full max-w-full overflow-hidden my-auto hover:cursor-zoom-in"
            onClick={() => {
              setShowAvatarCarousel(true);
            }}
            alt=""
            src={showImage}
          />
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-center gap-2 z-[1] ">
        {images.map((image, index) => {
          return (
            <div
              className={`relative rounded-[50%]  w-[0.5rem] h-[0.5rem] sm:w-[0.6rem] sm:h-[0.6rem]   hover:cursor-pointer ${
                showImage === image ? "bg-matrimony_orange p-2" : "bg-orangered"
              }`}
              onClick={() => {
                setShowImage(image);
              }}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeroAvatar;
