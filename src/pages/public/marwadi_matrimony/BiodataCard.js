import React from "react";

const BiodataCard = ({ data, setShowImage, setShowBiodataFrame }) => {
  const {
    image1,
    firstName,
    surname,
    dob,
    gender,
    complexion,
    phoneNumber1,
    phoneNumber2,
    emails,
    caste,
    subcaste,
    gotra,
    currentAddress,
    nativePlace,
    heightInCms,
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

  function capitalize(str) {
    if (!str) return "";
    const a = str.charAt(0).toUpperCase() + str.slice(1, str.length);
    return a;
  }

  const formatedGotra = capitalize(gotra);

  const formatedComplexion = capitalize(complexion);

  return (
    <div className="w-full fade-in shadow-md flex flex-col gap-4 min-h-full ">
      <div className="w-full min-h-full p-3 border border-indigo-900 rounded-md flex flex-col gap-5 justify-start items-center">
        <div
          className="h-52 w-52  overflow-hidden rounded-md flex justify-center shadow-lg hover:shadow-2xl z-20 items-start hover:cursor-pointer"
          onClick={() => {
            setShowImage(() => ({ imageURL: image1 }));
          }}
        >
          {/* <div className="my-auto"> */}
          <img
            src={image1}
            className="rounded-md shadow-lg object-contain my-auto "
          />
          {/* </div>{" "} */}
        </div>

        {/* Name, Age, Gotra, Height and Complexion */}

        <div className="w-full flex-col flex  justify-center text-center">
          <p
            className="font-Poppins text-2xl font-semibold text-[#EF4D48] hover:cursor-pointer"
            onClick={() => {
              setShowBiodataFrame(data);
            }}
          >
            {`${firstName} ${capitalize(surname)}`}
          </p>
          <p className="font-Poppins text-sm text-gray-800">
            ({formatedGotra}, {ageInYear}yr., {(heightInCms / 30.48).toFixed(2)}{" "}
            ft, {formatedComplexion});
          </p>
        </div>
        {/* Svg section of phone, emial */}

        <div className="w-full flex flex-row justify-evenly items-center">
          {/* Phone */}

          {phoneNumbers.length > 0 && (
            <div>
              <a
                href={`tel:${phoneNumbers[0]}`}
                className="hover:cursor-pointer"
              >
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
          )}

          {/* Email */}

          {emails.length > 0 && emails[0].length > 0 && (
            <div>
              <a href={`mailto:${emails[0]}`} className="hover:cursor-pointer">
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
          )}
        </div>

        {/* Education, Occupation */}

        <div className="flex flex-col w-11/12 shadow-lg gap-4 justify-center items-start border border-indigo-800  rounded-md p-2">
          {/* Education */}

          <div className="w-full flex flex-col justify-center">
            <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
              Education :
            </p>
            <p className="w-full text-center font-sm text-gray-700 font-normal">
              {education === "Professional" || education === "Other"
                ? education === "Professional"
                  ? profession === "Other"
                    ? `${otherProfession}`
                    : `${profession}`
                  : `${educationDetails}`
                : `${education}`}
            </p>
          </div>

          {/* Occupation */}

          <div className="w-full flex flex-col justify-center">
            <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
              Occupation :
            </p>
            <p className="w-full text-center font-sm text-gray-700 font-normal">
              {occupation === "Service/Job"
                ? `${serviceType}`
                : `${occupation}`}
            </p>
          </div>
        </div>

        {/* Present Address, Native Place */}

        <div className="w-full flex flex-col gap-2 justify-center">
          {/* Native Place */}

          <div className="w-full flex flex-col justify-center">
            <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
              Native Place :
            </p>
            <p className="w-full text-center font-sm text-gray-700 font-normal">
              {nativePlace !== "" ? nativePlace : "-"}
            </p>
          </div>

          {/* Present Address */}

          <div className="w-full flex flex-col justify-center">
            <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
              Present Address :
            </p>
            <p className="w-full text-center font-sm text-gray-700 font-normal">
              {currentAddressScope}, {currentAddressCity}, {currentAddressState}
              , {currentAddressCountry}
            </p>
          </div>

          <div className="w-full flex flex-col justify-center">
            <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
              Preference :
            </p>
            <p className="w-full text-center font-sm text-gray-700 font-normal">
              {preference !== "" ? preference : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodataCard;
