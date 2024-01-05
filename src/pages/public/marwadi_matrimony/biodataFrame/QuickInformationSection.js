import React from "react";
import infoSvg from "../../../../../assests/images/fibrinfo@2x.webp";
import group_2 from "../../../../../assests/images/group@2x.webp";
import dipak from "../../../../../assests/images/dipak.webp";
import {
  capitalizeSentence,
  formatAddressString,
} from "../../../../utils/helper";

const QuickInformationSection = ({ info }) => {
  const {
    dob,
    city,
    timeOfBirth,
    heightFeet,
    nativePlace,
    image1,
    firstName,
    surname,
    gender,
    complexion,
    phoneNumber1,
    phoneNumber2,
    emails,
    caste,
    subcaste,
    gotra,
    currentAddress,
    phoneNumbers,
    preference,
    educationDetails,
    otherProfession,
    profession,
    education,
    occupation,
    serviceType,
    currentAddressScope,
    currentAddressCity,
    currentAddressState,
    currentAddressCountry,
    _id,
  } = info;

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
                  <span className="text-matrimony_text_gray">D.O.B: </span>
                  <span>{dob.slice(0, 10)}</span>
                </p>
                <p className="m-0">
                  <span className="text-matrimony_text_gray">
                    Place of Birth:
                  </span>
                  <span className="text-matrimony_orange"> {city}</span>
                </p>
                {timeOfBirth?.length > 0 && (
                  <p className="m-0">
                    <span className="text-matrimony_text_gray">
                      Time of Birth:
                    </span>
                    <span className="text-matrimony_orange">
                      {" "}
                      {timeOfBirth}
                    </span>
                  </p>
                )}
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
                  <span>Height: </span>
                  <span className="text-matrimony_orange">
                    {" "}
                    {heightFeet} fts.
                  </span>
                </p>
                <p className="m-0">
                  <span>Complexion: </span>
                  <span className="text-matrimony_orange">
                    {capitalizeSentence(complexion)}
                  </span>
                </p>
                {nativePlace?.length > 0 && (
                  <p className="m-0">
                    <span>Native Place: </span>
                    <span className="text-matrimony_orange">
                      {formatAddressString(nativePlace)}
                    </span>
                  </p>
                )}
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
                  <span className="text-matrimony_text_gray">{`Occupation: `}</span>
                  <span>
                    {" "}
                    {occupation === "Service/Job"
                      ? `${serviceType}`
                      : `${occupation}`}
                  </span>
                </p>
                <p className="m-0">
                  <span className="text-matrimony_text_gray">{`Education: `}</span>
                  <span>
                    {" "}
                    {education === "Professional" || education === "Other"
                      ? education === "Professional"
                        ? profession === "Other"
                          ? `${otherProfession}`
                          : `${profession}`
                        : `${educationDetails}`
                      : `${education}`}
                  </span>
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
