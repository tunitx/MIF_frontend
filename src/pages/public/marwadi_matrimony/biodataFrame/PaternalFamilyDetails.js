import React from "react";
import infoSvg from "../../../../../assests/images/fibrinfo@2x.webp";
import group_2 from "../../../../../assests/images/group@2x.webp";
import dipak from "../../../../../assests/images/dipak.webp";
import { capitalizeSentence } from "../../../../utils/helper";

const PaternalFamilyDetails = ({ info }) => {
  let {
    paternalGrandFatherName,
    paternalGrandMotherName,
    paternalUncleAunt,
    paternalAunt_Bhua,
    fatherName,
    fatherOccupation,
    motherName,
    motherOccupation,
    siblings,
  } = info;

  paternalUncleAunt = paternalUncleAunt?.filter((ele) => {
    return ele?.length > 0;
  });

  paternalAunt_Bhua = paternalAunt_Bhua?.filter((ele) => {
    return ele?.length > 0;
  });

  siblings = siblings?.filter((ele) => {
    return ele?.length > 0;
  });

  if (
    paternalGrandFatherName?.length <= 0 &&
    paternalGrandMotherName?.length <= 0 &&
    fatherName?.length <= 0 &&
    motherName?.length <= 0 &&
    paternalUncleAunt?.length <= 0 &&
    paternalAunt_Bhua?.length <= 0 &&
    siblings?.length <= 0
  ) {
    return null;
  }

  return (
    <div className="w-full shadow-lg flex flex-row items-center  rounded-lg  justify-center relative gap-[0.63rem] text-left text-[1.75rem] text-tomato font-description-of-gotra">
      <div className=" bg-blanchedalmond rounded-lg py-4 px-2 w-full flex flex-col items-start justify-center gap-4 z-[1]">
        {/* Paternal Family Details */}

        <div className="w-full flex flex-col items-start justify-start gap-[1.5rem]">
          <div className="w-full flex flex-row items-center justify-start gap-[1rem]">
            <div className="relative tracking-[-0.41px] leading-[1.38rem] font-semibold">
              Paternal Family Detail
            </div>
            <img
              className="relative w-[1.5rem] h-[1.5rem] overflow-hidden shrink-0 object-cover"
              alt=""
              src={infoSvg}
            />
          </div>
        </div>

        <div className="w-full flex flex-row items-start justify-start  box-border gap-[0.5rem] text-[1.5rem] text-[#1e1e1e]">
          <div className="w-full flex flex-col items-start justify-start gap-[1.5rem]">
            {/* Grand Parents */}

            {((paternalGrandFatherName && paternalGrandFatherName.length > 0) ||
              (paternalGrandMotherName &&
                paternalGrandMotherName.length > 0)) && (
              <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
                <div className="w-full flex justify-start items-center gap-2">
                  <img
                    className="relative w-[1.25rem] h-[1.25rem] object-cover"
                    alt=""
                    src={dipak}
                  />

                  <div className="relative tracking-[-0.41px] leading-[1.38rem] text-[#1e1e1e] font-medium inline-block w-[18.19rem]">
                    Grand Parents
                  </div>
                </div>

                <div className="w-full flex justify-start items-center gap-2">
                  <div className="w-[1.25rem] flex justify-center">
                    <img
                      className="relative w-[0.84rem] h-[4.63rem] object-contain"
                      alt=""
                      src={group_2}
                    />
                  </div>

                  <div className="relative text-[1.25rem] tracking-[-0.41px] leading-[1.5rem] inline-block w-[18.19rem] text-tomato">
                    {paternalGrandFatherName &&
                      paternalGrandFatherName.length > 0 && (
                        <p className="m-0">
                          <span className="text-[#1e1e1e]">Grand Father: </span>
                          <span>
                            {capitalizeSentence(paternalGrandFatherName)}
                          </span>
                        </p>
                      )}
                    {paternalGrandMotherName &&
                      paternalGrandMotherName.length > 0 && (
                        <p className="m-0">
                          <span className="text-[#1e1e1e]">Grand Mother: </span>
                          <span>
                            {capitalizeSentence(paternalGrandMotherName)}
                          </span>
                        </p>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/* Parent */}

            {(fatherName?.length > 0 || motherName?.length > 0) && (
              <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
                <div className="w-full flex justify-start items-center gap-2">
                  <img
                    className="relative w-[1.25rem] h-[1.25rem] object-cover"
                    alt=""
                    src={dipak}
                  />

                  <div className="relative tracking-[-0.41px] leading-[1.38rem] text-[#1e1e1e] font-medium">
                    Parents
                  </div>
                </div>

                <div className="w-full flex justify-start items-center gap-2">
                  <div className="w-[1.25rem] flex justify-center">
                    <img
                      className="relative w-[0.84rem] h-[4.63rem] object-contain"
                      alt=""
                      src={group_2}
                    />
                  </div>
                  <div className="relative text-[1.25rem] tracking-[-0.41px] leading-[1.5rem] whitespace-pre-wrap inline-block w-[18.19rem] text-tomato">
                    {fatherName?.length > 0 && (
                      <p className="m-0">
                        <span className="text-[#1e1e1e]">Father: </span>
                        <span>{`${capitalizeSentence(
                          fatherName
                        )}, ${capitalizeSentence(fatherOccupation)}`}</span>
                      </p>
                    )}
                    {motherName?.length > 0 && (
                      <p className="m-0">
                        <span className="text-[#1e1e1e]">Mother: </span>
                        <span>{`${capitalizeSentence(
                          motherName
                        )}, ${capitalizeSentence(motherOccupation)}`}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Uncle-Aunt (Tauji-Taiji/Chachaji-Chachiji) */}

            {paternalUncleAunt?.length > 0 && (
              <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
                <div className="w-full flex justify-start items-center gap-2">
                  <img
                    className="relative w-[1.25rem] h-[1.25rem] object-cover"
                    alt=""
                    src={dipak}
                  />
                  <div className="relative tracking-[-0.41px] leading-[1.38rem] text-[#1e1e1e] font-medium">
                    Uncle-Aunt (Tauji/Chacha)
                  </div>
                </div>

                <div className="w-full flex justify-start items-center gap-2">
                  <div className="w-[1.25rem] flex justify-center">
                    <img
                      className="relative w-[0.84rem] h-[4.63rem] object-contain"
                      alt=""
                      src={group_2}
                    />
                  </div>
                  <div className="relative text-[1.25rem] tracking-[-0.41px] leading-[1.5rem] whitespace-pre-wrap inline-block w-[18.19rem] text-tomato">
                    {paternalUncleAunt.map((i, index) => {
                      return (
                        <p className="m-0" key={index}>
                          <span className="text-[#1e1e1e]">{index + 1}. </span>
                          <span>{capitalizeSentence(i)}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Aunt (Bhua) */}

            {paternalAunt_Bhua?.length > 0 && (
              <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
                <div className="w-full flex justify-start items-center gap-2">
                  <img
                    className="relative w-[1.25rem] h-[1.25rem] object-cover"
                    alt=""
                    src={dipak}
                  />
                  <div className="relative tracking-[-0.41px] leading-[1.38rem] text-[#1e1e1e] font-medium">
                    Aunt (Bhuaji)
                  </div>
                </div>

                <div className="w-full flex justify-start items-center gap-2">
                  <div className="w-[1.25rem] flex justify-center">
                    <img
                      className="relative w-[0.84rem] h-[4.63rem] object-contain"
                      alt=""
                      src={group_2}
                    />
                  </div>
                  <div className="relative text-[1.25rem] tracking-[-0.41px] leading-[1.5rem] whitespace-pre-wrap inline-block w-[18.19rem] text-tomato">
                    {paternalAunt_Bhua.map((i, index) => {
                      return (
                        <p className="m-0" key={index}>
                          <span className="text-[#1e1e1e]">{index + 1}. </span>
                          <span>{capitalizeSentence(i)}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Siblings */}

            {siblings?.length > 0 && (
              <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
                <div className="w-full flex justify-start items-center gap-2">
                  <img
                    className="relative w-[1.25rem] h-[1.25rem] object-cover"
                    alt=""
                    src={dipak}
                  />
                  <div className="relative tracking-[-0.41px] leading-[1.38rem] text-[#1e1e1e] font-medium">
                    Siblings
                  </div>
                </div>

                <div className="w-full flex justify-start items-center gap-2">
                  <div className="w-[1.25rem] flex justify-center">
                    <img
                      className="relative w-[0.84rem] h-[4.63rem] object-contain"
                      alt=""
                      src={group_2}
                    />
                  </div>

                  <div className="relative text-[1.25rem] tracking-[-0.41px] leading-[1.5rem] inline-block w-[18.19rem] text-tomato">
                    {siblings.map((i, index) => {
                      return (
                        <p className="m-0" key={index}>
                          <span className="text-[#1e1e1e]">{index + 1}. </span>
                          <span>{capitalizeSentence(i)}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaternalFamilyDetails;
