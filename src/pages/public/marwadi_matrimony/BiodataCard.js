import React from "react";

const BiodataCard = ({ data }) => {
  const {
    image1,
    firstName,
    surname,
    dob,
    gender,
    complexion,
    phoneNumber1,
    phoneNumber2,
    email,
    caste,
    subcaste,
    gotra,
    currentAddress,
    nativePlace,
  } = data;

  let ageInYear;

  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - dob.getFullYear();

    // Check if birthday has occurred for the current year
    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() &&
        currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  }

  ageInYear = calculateAge(dob);

  return (
    <div className="w-fit flex flex-col gap-4 max-w-[340px]">
      <div className="w-fit p-3 border border-indigo-900 rounded-md flex flex-col gap-5 justify-center items-center">
        <div className="p-5 pb-0 min-w-[100px] min-h-[200px]">
          <img src={image1} className="rounded-md" />
        </div>

        {/* Name, Age, Gender and Complexion */}

        <div className="w-full flex-col flex  justify-center text-center">
          <p className="font-Poppins text-2xl font-semibold text-[#EF4D48]">
            {`${firstName} ${surname}`}
          </p>
          <p className="font-Poppins text-sm text-gray-800">
            ({ageInYear}yr., {gender}, {complexion})
          </p>
        </div>
        {/* Svg section of phone, whatsapp and emial */}

        <div className="w-full flex flex-row justify-evenly items-center">
          {/* Phone */}

          <div>
            <a href={`tel:${phoneNumber1}`} className="hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                viewBox="0 0 512 512"
                fill="#EF4D48"
                className="group-hover:fill-white"
              >
                {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>
            </a>
          </div>

          {/* Whatsapp */}

          <div>
            <a
              href={`https://api.whatsapp.com/send?phone=${phoneNumber2}`}
              className="hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                viewBox="0 0 448 512"
                fill="#EF4D48"
                className="group-hover:fill-white"
              >
                {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
            </a>
          </div>

          {/* Email */}

          <div>
            <a href={`mailto:${email}`} className="hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                viewBox="0 0 512 512"
                fill="#EF4D48"
                className="group-hover:fill-white"
              >
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Caste, Subcaste and Gotra Section */}

        <div className="flex flex-col w-11/12 justify-center items-start border border-indigo-800  rounded-md p-2">
          <p className="font-Poppins text-base">
            <strong>Caste : </strong> <span>{caste}</span>
          </p>
          <p className="font-Poppins text-base">
            <strong>Sub-caste : </strong> <span>{subcaste}</span>
          </p>
          <p className="font-Poppins text-base">
            <strong>Gotra : </strong> <span>{gotra}</span>
          </p>
        </div>

        {/* Current Address and Native Place */}

        <div className="w-full flex flex-col gap-2 justify-center">
          {/* Native Place */}

          <div className="w-full flex flex-col justify-center">
            <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
              Native Place :
            </p>
            <p className="w-full text-justify font-sm text-gray-700 font-normal">
              {nativePlace}
            </p>
          </div>

          {/* Current Address */}

          <div className="w-full flex flex-col justify-center">
            <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
              Current Address :
            </p>
            <p className="w-full text-justify font-sm text-gray-700 font-normal">
              {currentAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodataCard;
