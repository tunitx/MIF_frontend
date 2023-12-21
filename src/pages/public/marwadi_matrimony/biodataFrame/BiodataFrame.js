import React from "react";
import HeroAvatar from "./HeroAvatar";
import HeroIntro from "./HeroIntro";
import QuickInformationSection from "./QuickInformationSection";
import PaternalFamilyDetails from "./PaternalFamilyDetails";
import MaternalFamilyDetails from "./MaternalFamilyDetails";
import ReachOutDetails from "./ReachOutDetails";

const BiodataFrame = ({ info }) => {
  const { firstName, surname, caste, subcaste, gotra, manglik } = info;
  //   console.log(manglik);
  console.log(info);

  return (
    <div className=" fade-in w-full flex justify-center items-center p-2 ">
      <div className="relative bg-seashell w-full max-w-md shadow-lg rounded-lg p-2 py-4 flex justify-center flex-col items-center gap-6">
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
        <HeroAvatar />
        <HeroIntro info={info} />
        <QuickInformationSection />
        <PaternalFamilyDetails />
        <MaternalFamilyDetails />
        <ReachOutDetails />
        {/* </div> */}
        {/* <img
        className="absolute h-[27.48%] w-[214.83%] top-[-8.99%] right-[-79.89%] bottom-[81.51%] left-[-34.93%] max-w-full overflow-hidden max-h-full object-contain"
        alt=""
        src="/vector@2x.png"
      /> */}
      </div>
    </div>
  );
};

export default BiodataFrame;
