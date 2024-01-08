import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConsentSearchBiodata = ({ setAction }) => {
  const navigate = useNavigate();

  return (
    <div
      className=" z-50 fixed flex flex-col justify-center gap-8 items-center w-screen h-screen  top-0 left-0 bg-[#323233] bg-opacity-90 overflow-x-auto overflow-y-scroll py-5 px-5 "
      onClick={() => {
        setAction(null);
      }}
    >
      <div className="w-full flex flex-col gap-8 justify-center items-center  h-screen rounded-md overflow-y-auto">
        <div
          className="shadow-xl fade-in bg-[#f7f3f5] rounded-md p-8  flex  w-fit flex-col justify-center items-center  overflow-y-auto h-fit gap-7 max-w-3xl "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p className="text-sm  font-Poppins font-semibold text-[#444] ">
            By searching biodata or personal information on this platform, you
            acknowledge and agree to the following terms:
          </p>

          <ul className="text-sm flex flex-col gap-2 max-h-96 overflow-y-auto">
            <l1>
              Marwadi International Federation and its affiliated members act
              solely as a platform for showcasing biodata and do not
              independently verify the accuracy or authenticity of the shared
              information.
            </l1>
            <l1>
              Users are responsible for evaluating and verifying the details
              provided in the biodata before making any decisions or
              commitments.
            </l1>
            <l1>
              It is crucial to exercise discretion and caution while using this
              search feature and interacting with the biodata available on this
              platform.
            </l1>
            <l1>
              Marwadi International Federation and its members shall not be held
              liable for any outcomes resulting from the use or reliance on the
              information provided in the biodata.
            </l1>
          </ul>

          {/* {agreed === false ? (
            <p className="fade-in font-Poppins text-sm font-semibold text-red-800">
              Sorry, but you can't go any furthur without agreeing to our T&C.
            </p>
          ) : null} */}

          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              className="group flex w-full sm:w-fit whitespace-nowrap items-center gap-2 justify-center max-w-[170px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/matrimony/search-biodata`);
              }}
            >
              Okay, go on.
            </button>
            {/* <button
              className="group flex whitespace-nowrap w-full sm:grow items-center gap-2 justify-center  rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
              onClick={() => {
                setAgreed(false);
              }}
            >
              Nah, can't trust you.
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentSearchBiodata;
