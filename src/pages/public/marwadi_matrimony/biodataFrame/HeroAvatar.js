import React from "react";
import avatarFrame from "../../../../../assests/images/mask-group@2x.png";
import avatarImg from "../../../../../assests/images/post12-1@2x.png";

const HeroAvatar = () => {
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center">
      <div className="w-full relative">
        <div className="w-full">
          <img
            className="relative w-full h-auto object-cover z-[0]"
            alt=""
            src={avatarFrame}
          />
        </div>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full w-[7.94rem] h-[7.94rem] overflow-hidden shrink-0 z-[2]">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[50%] bg-gainsboro box-border border-[5px] border-solid border-moccasin" />
          <img
            className="absolute h-full w-full  max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src={avatarImg}
          />
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-center gap-2 z-[1] ">
        <div className="relative rounded-[50%] bg-matrimony_orange w-[0.5rem] h-[0.5rem]" />
        <div className="relative rounded-[50%] bg-orangered w-[0.5rem] h-[0.5rem]" />
        <div className="relative rounded-[50%] bg-orangered w-[0.5rem] h-[0.5rem]" />
      </div>
    </div>
  );
};

export default HeroAvatar;
