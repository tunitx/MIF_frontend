import React from "react";
import { capitalizeSentence } from "../../../../utils/helper";

const ReachOutDetails = ({ info }) => {
  let {
    file,
    emails,
    phoneNumbers,
    currentAddressScope,
    currentAddressCity,
    currentAddressState,
    currentAddressCountry,
  } = info;

  phoneNumbers = phoneNumbers?.filter((ele) => {
    return ele?.length > 0;
  });

  emails = emails?.filter((ele) => {
    return ele?.length > 0;
  });

  return (
    <div className="w-full shadow-lg flex flex-col rounded-lg items-center justify-center relative gap-[0.63rem] text-left text-[1.5rem] text-tomato font-josefin-sans">
      {/* <div className="relative rounded-xl  w-full" /> */}
      <div className="my-0 mx-[!important] bg-blanchedalmond rounded-lg w-full flex flex-col items-start justify-center p-4 box-border gap-[1rem] z-[1]">
        <h3 className="text-start w-full tracking-[-0.41px] leading-[1.38rem] font-semibold">
          Reach Out
        </h3>

        <div className="flex flex-col items-start justify-start gap-[0.75rem] text-[1rem] text-matrimony_text_gray font-description-of-gotra">
          {/* <div className="shrink-0 flex flex-row items-center justify-start gap-[1rem]">
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
          </div> */}

          {/* Phone Number */}

          {phoneNumbers.length > 0 && (
            <div className="shrink-0 flex flex-row items-center justify-start gap-[1rem]">
              <a
                href={`tel:${phoneNumbers[0]}`}
                className="hover:cursor-pointer flex flex-row gap-4 justify-center items-center"
              >
                <div className="rounded-xl bg-tomato shrink-0 flex flex-row items-start justify-start py-[0.56rem] px-[0.63rem]">
                  {/* <img
              className="relative w-[1.25rem] h-[1.25rem] object-cover"
              alt=""
              src={phoneSvg}
            /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 512 512"
                    // fill="#EF4D48"
                    className="group-hover:fill-white"
                  >
                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                  </svg>
                </div>
                <div className="relative font-semibold">Phone</div>
              </a>
            </div>
          )}

          {/* Emails */}

          {emails.length > 0 && emails[0].length > 0 && (
            <div className="shrink-0 flex flex-row items-center justify-start gap-[1rem]">
              <a
                href={`mailto:${emails[0]}`}
                className="hover:cursor-pointer flex flex-row gap-4 justify-center items-center"
              >
                <div className="rounded-xl bg-tomato shrink-0 flex flex-row items-start justify-start py-[0.56rem] px-[0.63rem]">
                  {/* <img
                className="relative w-[1.25rem] h-[1.25rem] object-cover"
                alt=""
                src={phoneSvg}
              /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 512 512"
                    // fill="#EF4D48"
                    className="group-hover:fill-white"
                  >
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                  </svg>
                </div>
                <div className="relative font-semibold">Email</div>
              </a>
            </div>
          )}

          {file && file?.length > 0 && (
            <div className="shrink-0 flex flex-row items-center justify-start gap-[1rem]">
              <a
                href={file}
                className="hover:cursor-pointer flex flex-row gap-4 justify-center items-center"
              >
                <div className="rounded-xl bg-tomato shrink-0 flex flex-row items-start justify-start py-[0.56rem] px-[0.63rem]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 512 512"
                    className="group-hover:fill-white"
                  >
                    {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                    <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                  </svg>
                </div>
                <div className="relative font-semibold">Download Biodata</div>
              </a>
            </div>
          )}
          {file && file?.length > 0 && (
            <div className="shrink-0 flex flex-row items-center justify-start gap-[1rem]">
              {/* <a
                // href={file}
                className="hover:cursor-pointer flex flex-row gap-4 justify-center items-center"
              > */}
              <div className="rounded-xl bg-tomato shrink-0 flex flex-row items-start justify-start py-[0.56rem] px-[0.82rem]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.5em"
                  className="group-hover:fill-white"
                  viewBox="0 0 384 512"
                >
                  {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
              </div>
              <div className="relative font-semibold">
                {currentAddressScope}, {currentAddressCity},{" "}
                {currentAddressState},{" "}
                {capitalizeSentence(currentAddressCountry)}
              </div>
              {/* </a> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReachOutDetails;
