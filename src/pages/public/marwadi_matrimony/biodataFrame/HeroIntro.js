import React from "react";
import { capitalizeSentence } from "../../../../utils/helper";

const HeroIntro = ({ info }) => {
  const { firstName, surname, caste, subcaste, gotra, manglik } = info;

  return (
    <div className="w-full flex px-2 flex-col items-start justify-center  box-border gap-[1rem] text-left text-[2.25rem] text-matrimony_orange font-description-of-gotra">
      <div className=" w-full flex flex-col items-start justify-start gap-[0.5rem]">
        <div className="relative font-semibold">{`${capitalizeSentence(
          firstName
        )} ${capitalizeSentence(surname)}`}</div>
        <div className="relative text-[1.88rem] font-semibold">{`${capitalizeSentence(
          caste
        )}`}</div>
      </div>
      <div className="w-full flex flex-row items-center justify-between py-[0rem] pr-[1rem] pl-[0rem] box-border text-[1rem] text-tomato">
        <div className="w-full  flex flex-row items-center justify-start">
          <div className="relative font-semibold">{`(${capitalizeSentence(
            subcaste
          )}, ${capitalizeSentence(gotra)})`}</div>
        </div>
        <div className=" flex flex-row items-center justify-start text-[1.25rem]">
          <div className="relative font-semibold whitespace-nowrap">
            {manglik === "yes"
              ? "Manglik"
              : manglik === "no"
              ? "Non-Manglik"
              : "Anshik-Manglik"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroIntro;
