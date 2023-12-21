import React from "react";
import infoSvg from "../../../../../assests/images/fibrinfo@2x.png";
import group_2 from "../../../../../assests/images/group@2x.png";
import dipak from "../../../../../assests/images/dipak.png";

const QuickInformationSection = () => {
  return (
    <div className="w-full flex px-2 flex-col items-start justify-start  box-border gap-4 text-left text-[1.75rem] text-matrimony_orange font-description-of-gotra">
      {/* Quick Information */}

      <div className="w-full flex flex-col items-start justify-start gap-[1.5rem]">
        <div className="w-full flex flex-row items-center justify-start gap-[1rem]">
          <div className="relative tracking-[-0.41px] leading-[1.38rem] font-semibold">
            Quick Information
          </div>
          <img
            className="relative w-[1.5rem] h-[1.5rem] overflow-hidden shrink-0 object-cover"
            alt=""
            src={infoSvg}
          />
        </div>
      </div>

      <div className=" w-full flex flex-row items-center justify-start gap-[0.5rem] text-[1.5rem] text-matrimony_text_gray">
        <div className="shrink-0 w-full flex flex-col items-start justify-start gap-[1.5rem]">
          {/* Important Dates */}

          <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
            <div className="w-full flex justify-start items-center gap-2">
              <img
                className="relative w-[1.25rem] h-[1.25rem] object-cover"
                alt=""
                src={dipak}
              />
              <div className="relative tracking-[-0.41px] leading-[1.38rem] font-medium inline-block">
                Important Dates
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
              <div className="relative text-[1.25rem] tracking-[-0.41px] leading-[1.5rem] inline-block w-[18.19rem]">
                <p className="m-0 text-matrimony_orange">
                  <span className="text-matrimony_text_gray">D.O.B</span>
                  <span> : 04/11/2002</span>
                </p>
                <p className="m-0">
                  <span className="text-matrimony_text_gray">
                    Place of Birth
                  </span>
                  <span className="text-matrimony_orange"> : Delhi</span>
                </p>
                <p className="m-0">
                  <span className="text-matrimony_text_gray">
                    Time of Birth
                  </span>
                  <span className="text-matrimony_orange"> : 6:25 am</span>
                </p>
              </div>
            </div>
          </div>

          {/* One Word that describes you */}

          <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
            <div className="w-full flex justify-start items-center gap-2">
              <img
                className="relative w-[1.25rem] h-[1.25rem] object-cover"
                alt=""
                src={dipak}
              />
              <div className="relative tracking-[-0.41px] leading-[1.38rem] font-medium">
                One word that describes you
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

              <div className="relative text-[1.25rem] tracking-[-0.41px] leading-[1.5rem] inline-block w-[16.69rem]">
                <p className="m-0">
                  <span>Height</span>
                  <span className="text-matrimony_orange"> :5’9</span>
                </p>
                <p className="m-0">
                  <span>Complexion</span>
                  <span className="text-matrimony_orange"> :Fair</span>
                </p>
                <p className="m-0">
                  <span>Native Place</span>
                  <span className="text-matrimony_orange"> :Lahore</span>
                </p>
              </div>
            </div>
          </div>

          {/* Professional Details */}

          <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
            <div className="w-full flex justify-start items-center gap-2">
              <img
                className="relative w-[1.25rem] h-[1.25rem] object-cover"
                alt=""
                src={dipak}
              />
              <div className="relative tracking-[-0.41px] leading-[1.38rem] font-medium inline-block w-[17.19rem]">
                Professional Details
              </div>
            </div>

            <div className="w-full flex justify-start items-center gap-2">
              <div className="w-[1.25rem] flex justify-center">
                <img
                  className="relative w-[0.84rem] h-[4.63rem]  object-contain"
                  alt=""
                  src={group_2}
                />
              </div>

              <div className="relative text-[1.25rem] tracking-[-0.41px] leading-[1.5rem] whitespace-pre-wrap inline-block w-[17.19rem] text-matrimony_orange">
                <p className="m-0">
                  <span className="text-matrimony_text_gray">{`Occupation  `}</span>
                  <span>: Businessman</span>
                </p>
                <p className="m-0">
                  <span className="text-matrimony_text_gray">Education</span>
                  <span> :B-tech , IPU</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickInformationSection;
