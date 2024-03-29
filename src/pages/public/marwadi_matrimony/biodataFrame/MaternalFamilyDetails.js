import React from "react";
import infoSvg from "../../../../../assests/images/fibrinfo@2x.webp";
import group_2 from "../../../../../assests/images/group@2x.webp";
import dipak from "../../../../../assests/images/dipak.webp";
import { capitalizeSentence } from "../../../../utils/helper";

const MaternalFamilyDetails = ({ info }) => {
  let {
    maternalGrandFatherName,
    maternalGrandMotherName,
    maternalUncleAunt,
    maternalAunt_Mosi,
  } = info;

  maternalAunt_Mosi = maternalAunt_Mosi?.filter((ele) => {
    return ele?.length > 0;
  });

  maternalUncleAunt = maternalUncleAunt?.filter((ele) => {
    return ele?.length > 0;
  });

  if (
    maternalGrandFatherName?.length <= 0 &&
    maternalGrandMotherName?.length <= 0 &&
    maternalUncleAunt?.length <= 0 &&
    maternalAunt_Mosi?.length <= 0
  ) {
    return null;
  }

  return (
    <div className="w-full flex flex-col px-2 items-start justify-start box-border gap-[1rem] text-left text-[1.75rem] text-matrimony_orange font-description-of-gotra">
      {/* Maternal Family Detail */}

      <div className="w-full flex flex-col items-start justify-start gap-[1.5rem]">
        <div className="w-full flex flex-row items-center justify-start gap-[1rem]">
          <div className="relative tracking-[-0.41px] leading-[1.38rem] font-semibold">
            Maternal Family Detail
          </div>
          <img
            className="relative w-[1.5rem] h-[1.5rem] overflow-hidden shrink-0 object-cover"
            alt=""
            src={infoSvg}
          />
        </div>
      </div>

      <div className="w-full flex flex-row items-start justify-start gap-[0.5rem] text-[1.5rem] text-matrimony_text_gray">
        <div className="w-full flex flex-col items-start justify-start gap-[1.5rem]">
          {/* Grand Parent */}

          {(maternalGrandFatherName?.length > 0 ||
            maternalGrandMotherName?.length > 0) && (
            <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
              <div className="w-full flex justify-start items-center gap-2">
                <img
                  className="relative w-[1.25rem] h-[1.25rem] object-cover"
                  alt=""
                  src={dipak}
                />
                <div className="relative tracking-[-0.41px] leading-[1.38rem] font-medium inline-block w-[17.19rem]">
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

                <div className="relative text-[1.25rem] tracking-[-0.41px] leading-[1.5rem] inline-block w-[18.19rem] text-matrimony_orange">
                  {maternalGrandFatherName?.length > 0 && (
                    <p className="m-0">
                      <span className="text-matrimony_text_gray">
                        Grand Father:{" "}
                      </span>
                      <span>{capitalizeSentence(maternalGrandFatherName)}</span>
                    </p>
                  )}
                  {maternalGrandMotherName?.length > 0 && (
                    <p className="m-0">
                      <span className="text-matrimony_text_gray">
                        Grand Mother:{" "}
                      </span>
                      <span>{capitalizeSentence(maternalGrandMotherName)}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Uncle Aunt (Mama-Mami) */}

          {maternalUncleAunt?.length > 0 && (
            <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
              <div className="w-full flex justify-start items-center gap-2">
                <img
                  className="relative w-[1.25rem] h-[1.25rem] object-cover"
                  alt=""
                  src={dipak}
                />
                <div className="relative tracking-[-0.41px] leading-[1.38rem] font-medium">
                  Uncle-Aunt (Mama-Mami)
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

                <div className="relative text-[1.25rem] tracking-[-0.41px] leading-[1.5rem] whitespace-pre-wrap inline-block w-[18.19rem] text-matrimony_orange">
                  {maternalUncleAunt.map((i, index) => {
                    return (
                      <p className="m-0">
                        <span className="text-[#1e1e1e]">{index + 1}. </span>
                        <span>{capitalizeSentence(i)}</span>
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Aunt (Mosi) */}

          {maternalAunt_Mosi?.length > 0 && (
            <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
              <div className="w-full flex justify-start items-center gap-2">
                <img
                  className="relative w-[1.25rem] h-[1.25rem] object-cover"
                  alt=""
                  src={dipak}
                />
                <div className="relative tracking-[-0.41px] leading-[1.38rem] font-medium">
                  Aunt (Mosi)
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

                <div className="relative text-[1.25rem] tracking-[-0.41px] leading-[1.5rem] whitespace-pre-wrap inline-block w-[18.19rem] text-matrimony_orange">
                  {maternalAunt_Mosi.map((i, index) => {
                    return (
                      <p className="m-0">
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
  );
};

export default MaternalFamilyDetails;
