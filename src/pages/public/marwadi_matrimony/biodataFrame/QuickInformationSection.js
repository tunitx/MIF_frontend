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
    incomeBracket,
    city,
    timeOfBirth,
    heightFeet,
    nativePlace,
    complexion,
    educationDetails,
    otherProfession,
    profession,
    education,
    occupation,
    serviceType,
    hobbies,
    preference,
    maritalStatus,
    pwd,
    disabilityMeasure,
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
          {/* Important Details */}

          <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
            <div className="w-full flex justify-start items-center gap-2">
              <img
                className="relative w-[1.25rem] h-[1.25rem] object-cover"
                alt=""
                src={dipak}
              />
              <div className="relative tracking-[-0.41px] leading-[1.38rem] font-medium inline-block">
                Important Details
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

          {/* Personal Details */}

          <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
            <div className="w-full flex justify-start items-center gap-2">
              <img
                className="relative w-[1.25rem] h-[1.25rem] object-cover"
                alt=""
                src={dipak}
              />
              <div className="relative tracking-[-0.41px] leading-[1.38rem] font-medium">
                Personal Details
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
                {maritalStatus !== "single" && (
                  <p className="m-0">
                    <span className="text-matrimony_text_gray">{`Marital Status: `}</span>
                    <span className="text-matrimony_orange">
                      {capitalizeSentence(maritalStatus)}
                    </span>
                  </p>
                )}

                {pwd === "yes" && (
                  <p className="m-0">
                    <span className="text-matrimony_text_gray">{`Person with Disability: `}</span>
                    <span className="text-matrimony_orange">
                      {capitalizeSentence(disabilityMeasure)}
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
                <p className="m-0">
                  <span className="text-matrimony_text_gray">{`Income Bracket: `}</span>
                  <span>{incomeBracket}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Other Details */}

          {(hobbies?.length > 0 || preference?.length > 0) && (
            <div className="w-full flex flex-col items-start justify-start gap-[0.75rem]">
              <div className="w-full flex justify-start items-center gap-2">
                <img
                  className="relative w-[1.25rem] h-[1.25rem] object-cover"
                  alt=""
                  src={dipak}
                />
                <div className="relative tracking-[-0.41px] leading-[1.38rem] font-medium inline-block w-[17.19rem]">
                  Other Details
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
                  {hobbies?.length > 0 && (
                    <p className="m-0">
                      <span className="text-matrimony_text_gray">{`Hobbies: `}</span>
                      <span>{hobbies}</span>
                    </p>
                  )}
                  {preference?.length > 0 && (
                    <p className="m-0">
                      <span className="text-matrimony_text_gray">{`Preference: `}</span>
                      <span>{preference}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickInformationSection;
