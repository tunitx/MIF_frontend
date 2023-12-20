import React from "react";
import group_8 from "../../../../../assests/images/group-8@2x.png";
import phoneSvg from "../../../../../assests/images/vector@2x.png";

const ReachOutDetails = () => {
  return (
    <div className="w-full shadow-lg flex flex-col rounded-lg items-center justify-center relative gap-[0.63rem] text-left text-[1.5rem] text-tomato font-josefin-sans">
      {/* <div className="relative rounded-xl  w-full" /> */}
      <div className="my-0 mx-[!important] bg-blanchedalmond rounded-lg w-full flex flex-col items-start justify-center p-4 box-border gap-[1rem] z-[1]">
        <h3 className="text-start w-full tracking-[-0.41px] leading-[1.38rem] font-semibold">
          Reach Out
        </h3>

        <div className="flex flex-col items-start justify-start gap-[0.75rem] text-[1rem] text-matrimony_text_gray font-description-of-gotra">
          <div className="shrink-0 flex flex-row items-center justify-start gap-[1rem]">
            <div className="rounded-xl bg-tomato shrink-0 flex flex-row items-start justify-start py-[0.56rem] px-[0.63rem]">
              <img
                className="relative w-[1.25rem] h-[1.25rem] object-cover"
                alt=""
                src={group_8}
              />
            </div>
            <div className="relative font-semibold inline-block w-[6.13rem] shrink-0">
              Whatsapp
            </div>
          </div>
          <div className="shrink-0 flex flex-row items-center justify-start gap-[1rem]">
            <div className="rounded-xl bg-tomato shrink-0 flex flex-row items-start justify-start py-[0.56rem] px-[0.63rem]">
              <img
                className="relative w-[1.25rem] h-[1.25rem] object-cover"
                alt=""
                src={phoneSvg}
              />
            </div>
            <div className="relative font-semibold">Phone</div>
          </div>
          <div className="shrink-0 flex flex-row items-center justify-start gap-[1rem]">
            <div className="rounded-xl bg-tomato shrink-0 flex flex-row items-start justify-start py-[0.56rem] px-[0.63rem]">
              <img
                className="relative w-[1.25rem] h-[1.25rem] object-cover"
                alt=""
                src={phoneSvg}
              />
            </div>
            <div className="relative font-semibold">Email</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReachOutDetails;
