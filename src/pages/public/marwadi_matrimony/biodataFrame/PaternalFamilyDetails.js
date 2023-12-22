import React from "react";
import infoSvg from "../../../../../assests/images/fibrinfo@2x.png";
import group_2 from "../../../../../assests/images/group@2x.png";
import dipak from "../../../../../assests/images/dipak.png";
import { capitalizeSentence } from "../../../../utils/helper";

const PaternalFamilyDetails = ({ info }) => {
  const {
    paternalGrandFatherName,
    paternalGrandMotherName,
    paternalUncleAunt,
    maternalGrandFatherName,
    maternalGrandMotherName,
    maternalUncleAunt,
    fatherName,
    fatherOccupation,
    motherName,
    motherOccupation,
    siblings,
  } = info;

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
                  <p className="m-0">
                    <span className="text-[#1e1e1e]">Grand Father: </span>
                    <span>{capitalizeSentence(paternalGrandFatherName)}</span>
                  </p>
                  <p className="m-0">
                    <span className="text-[#1e1e1e]">Grand Mother: </span>
                    <span>{capitalizeSentence(paternalGrandMotherName)}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Parent */}

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
                  <p className="m-0">
                    <span className="text-[#1e1e1e]">Father: </span>
                    <span>{`${capitalizeSentence(
                      fatherName
                    )}, ${capitalizeSentence(fatherOccupation)}`}</span>
                  </p>
                  <p className="m-0">
                    <span className="text-[#1e1e1e]">Mother: </span>
                    <span>{`${capitalizeSentence(
                      motherName
                    )}, ${capitalizeSentence(motherOccupation)}`}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Uncle/Aunt */}

            <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
              <div className="w-full flex justify-start items-center gap-2">
                <img
                  className="relative w-[1.25rem] h-[1.25rem] object-cover"
                  alt=""
                  src={dipak}
                />
                <div className="relative tracking-[-0.41px] leading-[1.38rem] text-[#1e1e1e] font-medium">
                  Uncle/Aunt
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
                  <p className="m-0">
                    <span className="text-[#1e1e1e]">{`Uncle(Tauji/chaha)`}</span>
                    <span>
                      : Mr. Anil Sehgal - Mrs. Ekta Sehgal, Businessman
                    </span>
                  </p>
                  <p className="m-0">
                    <span className="text-[#1e1e1e]">Aunt(bhua)</span>
                    <span> :Mrs. Shivani Sehgal, Teacher</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Siblings */}

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
                  <p className="m-0">
                    <span className="text-[#1e1e1e]">Brother’s</span>
                    <span>: Daksh, Studying</span>
                  </p>
                  <p className="m-0">
                    <span className="text-[#1e1e1e]">Sister’s</span>
                    <span> : Kajal Gaba-Karan Gaba</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaternalFamilyDetails;
