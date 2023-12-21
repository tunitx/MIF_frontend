import React from "react";

const HeroIntro = ({ info }) => {
  const { firstName, surname, caste, subcaste, gotra, manglik } = info;

  return (
    <div className="w-full flex px-2 flex-col items-start justify-center  box-border gap-[1rem] text-left text-[2.25rem] text-matrimony_orange font-description-of-gotra">
      <div className=" w-full flex flex-col items-start justify-start gap-[0.5rem]">
        <div className="relative font-semibold">{`${firstName} ${surname}`}</div>
        <div className="relative text-[1.88rem] font-semibold">{`${caste}`}</div>
      </div>
      <div className="w-full flex flex-row items-center justify-between py-[0rem] pr-[1rem] pl-[0rem] box-border text-[1rem] text-tomato">
        <div className="w-full  flex flex-row items-center justify-start">
          <div className="relative font-semibold">{`(${subcaste}, ${gotra})`}</div>
        </div>
        <div className=" flex flex-row items-center justify-start text-[1.25rem]">
          <div className="relative font-semibold">
            {manglik === "yes" ? "Manglik" : manglik === "no" ? "" : "Anshik"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroIntro;
