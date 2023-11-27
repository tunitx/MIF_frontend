import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import bioData from "../../../utils/biodata";
import indiaStates from "../../../utils/indiaStates";

const config = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJpbXRhODE5QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IldEZkxFV0hLSFVmLWNKVWI4QUV2UHlMZExqVC1uZS1YY2tDaGx2NjB5eU5xNVk0UmZJbHhNcEJQUmgzUUZuRllvdFUifSwiZXhwIjoxNzAwMzAxMDc4fQ.4UpMLd14gVPRfgF87tqLq0NgGoyMBDi1u1gOSqMRLMQ",
    Accept: "application/json",
  },
};

async function getNewToken() {
  const headers = {
    "api-token":
      "WDfLEWHKHUf-cJUb8AEvPyLdLjT-ne-XckChlv60yyNq5Y4RfIlxMpBPRh3QFnFYotU",
    "user-email": "imta819@gmail.com",
    Accept: "application/json",
  };

  try {
    const response = await axios.get(
      "https://www.universal-tutorial.com/api/getaccesstoken",
      { headers }
    );
    config.headers.Authorization = `Bearer ${response.data.auth_token}`;
  } catch (error) {
    console.error("Failed to get new token:", error);
  }
}

setInterval(getNewToken, 20 * 60 * 60 * 1000);

function Registration() {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [caste, setCaste] = useState("");
  const [subcaste, setSubcaste] = useState("");
  const [gotra, setGotra] = useState("");

  const castes = Object.keys(bioData);
  const subcastes = caste ? Object.keys(bioData[caste]) : [];
  const gotras = caste && subcaste ? bioData[caste][subcaste] : [];

  useEffect(() => {
    if (location === "abroad") {
      axios
        .get("https://www.universal-tutorial.com/api/countries", config)
        .then((response) => {
          console.log(response.data);
          setCountries(response.data);
        })
        .catch((error) => {
          console.log("Error fetching countries: ", error);
        });
    }
  }, [location]);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://www.universal-tutorial.com/api/states/${selectedCountry}`,
          config
        )
        .then((response) => setStates(response.data));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      axios
        .get(
          `https://www.universal-tutorial.com/api/cities/${selectedState}`,
          config
        )
        .then((response) => setCities(response.data));
    }
  }, [selectedState]);

  useEffect(() => {
    if (location === "india") {
      setSelectedCountry("india");
      formik.setFieldValue("country", "india");
    }
  }, [location]);

  const formik = useFormik({
    initialValues: {
      gender: "female",
      fullName: "",
      caste: caste,
      subcaste: subcaste,
      gotra: gotra,
      dob: "",
      manglik: "",
      placeOfBirth: "",
      currentAddress: "",
      location: location,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      heightFeet: "",
      complexion: "",
      education: "",
      occupation: "",
      incomeBracket: "",
      maritalStatus: "",
      pwd: "",
      file: null,
      image1: null,
      image2: null,
      phoneNumber1: "",
    },

    onSubmit: async (values) => {
      const formData = new FormData();

      // for (const key in values) {
      //   formData.append(key, values[key]);
      // }
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }

      console.log(values);

      return;

      try {
        const response = await fetch(
          "http://localhost:3000/postMarriageDetails",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="w-full flex justify-center my-4">
      <div className="w-full max-w-4xl flex justify-center p-5">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col gap-16"
        >
          {step === 1 && (
            <div className="w-full max-w-full flex flex-col justify-between items-center gap-14">
              {/* <label
                htmlFor="gender"
                className="font-Poppins font-semibold text-lg text-[#B0B1B1]"
              >
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                onChange={formik.handleChange}
                value={formik.values.gender}
                className="font-Poppins text-sm w-full px-3 py-2 border rounded-md border-indigo-900 min-w-xl"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select> */}
              <p className=" fade-in w-full text-center font-Poppins text-lg sm:text-xl font-semibold text-[#333]">
                CHOOSE YOUR GENDER
              </p>

              <div className="w-full flex justify-between sm:justify-evenly gap-6">
                <div className="w-1/2 sm:w-1/4 lg:w-1/5 ">
                  {/* Male Avatar */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // width={532}
                    // height={532}
                    viewBox="0 0 532 532"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className={`fade-in w-full hover:cursor-pointer bg-[#f7f3f5] box-border shadow-xl delay-150 duration-300 transition-transform border-2 border-orange-500 rounded-full p-2 ${
                      formik.values.gender === "male"
                        ? ""
                        : "border-none hover:scale-110"
                    } `}
                    onClick={() => {
                      formik.setFieldValue("gender", "male");
                    }}
                  >
                    <g>
                      <g>
                        <circle
                          cx="270.759"
                          cy="260.92941"
                          r="86.34897"
                          fill="#a0616a"
                        />
                        <polygon
                          points="199.2879 366.61365 217.2879 320.61365 310.2879 306.61365 320.28003 408.44043 226.28003 410.44043 199.2879 366.61365"
                          fill="#a0616a"
                        />
                      </g>
                      <path
                        d="M357.94449,276.8613c-1.12067,4.48965-3.38602,15.17972-6.9238,15.23233-2.89023,.04208-5.65668-46.33466-2.76953-54.00568,3.31638-8.81271-5.39886-19.96062-11.96411-25.6832-11.80423-10.2894-38.00696,11.80466-64.65118,1.79587-.70633-.26482-.56558-.23502-8.97934-3.59174-25.88966-10.32974-27.2506-10.62788-28.73386-10.77521-12.55046-1.24167-27.86705,9.02844-34.12146,21.55038-6.50168,13.01653-1.06937,24.18106-7.18346,55.67184-.71246,3.67065-1.83138,8.90216-3.59174,8.97934-3.21819,.14029-6.3605-17.04846-7.18346-21.55038-3.44792-18.86186-6.7722-37.04675,0-57.46771,.73878-2.22729,5.29158-10.49458,14.36693-26.93799,13.0744-23.68825,19.65018-35.57709,21.55038-37.7132,13.62859-15.32624,38.43575-29.30734,59.26357-23.34626,10.52704,3.01299,8.63953,7.85691,21.55038,12.57105,23.00821,8.40057,43.00476-1.87303,46.69254,5.3876,1.9537,3.84602-3.51236,7.01686-3.59174,14.36693-.13593,12.6114,15.81424,16.25575,25.14212,28.73386,5.01447,6.70819,13.59753,6.78012-8.87228,96.78212l.00003,.00003Z"
                        fill="#2f2e41"
                      />
                    </g>
                    <path
                      d="M464.92017,442.61035c-3.48022,3.91016-7.09009,7.74023-10.83008,11.48047-50.23999,50.23926-117.04004,77.90918-188.09009,77.90918-61.40991,0-119.63989-20.66992-166.75-58.71973-.03003-.01953-.05005-.04004-.07983-.07031-6.25-5.03906-12.30005-10.39941-18.14014-16.05957,.10986-.87988,.22998-1.75,.35986-2.61035,.82007-5.7998,1.73022-11.33008,2.75-16.41992,8.3501-41.71973,118.22021-85.51953,121.08008-86.66016,.04004-.00977,.06006-.01953,.06006-.01953,0,0,14.14014,52.12012,74.72998,51.4502,41.27002-.4502,33.27002-51.4502,33.27002-51.4502,0,0,.5,.09961,1.43994,.2998,11.91992,2.53027,94.68018,20.70996,127.33008,45.52051,9.94995,7.55957,17.08984,23.66016,22.21997,42.85938,.21997,.82031,.42993,1.66016,.65015,2.49023Z"
                      fill="#ff4848"
                    />
                    <path
                      d="M454.09009,77.91016C403.8501,27.6709,337.05005,0,266,0S128.15015,27.6709,77.90991,77.91016C27.67017,128.15039,0,194.9502,0,266c0,64.85059,23.05005,126.16016,65.29004,174.57031,4.03003,4.62988,8.23999,9.13965,12.61987,13.52051,1.03003,1.0293,2.07007,2.05957,3.12012,3.05957,5.84009,5.66016,11.89014,11.02051,18.14014,16.05957,.02979,.03027,.0498,.05078,.07983,.07031,47.11012,38.0498,105.3401,58.71973,166.75001,58.71973,71.05005,0,137.8501-27.66992,188.09009-77.90918,3.73999-3.74023,7.34985-7.57031,10.83008-11.48047,43.36987-48.71973,67.07983-110.83984,67.07983-176.61035,0-71.0498-27.66992-137.84961-77.90991-188.08984Zm10.17993,362.20996c-7.86987,8.9502-16.33008,17.37012-25.33008,25.18066-17.06982,14.84961-36.06982,27.5293-56.55981,37.62988-7.19019,3.5498-14.56006,6.7793-22.1001,9.66992-29.29004,11.24023-61.08008,17.39941-94.28003,17.39941-32.04004,0-62.76001-5.73926-91.18994-16.23926-11.67017-4.30078-22.94995-9.41016-33.78003-15.26074-1.59009-.85938-3.16992-1.72949-4.73999-2.61914-8.26001-4.68066-16.25-9.79004-23.91992-15.31055-10.98999-7.87988-21.3501-16.58984-30.98022-26.03027-5.3999-5.29004-10.55981-10.7998-15.48975-16.5293C26.09009,391.77051,2,331.65039,2,266,2,120.43066,120.42993,2,266,2s264,118.43066,264,264c0,66.66016-24.82983,127.62012-65.72998,174.12012Z"
                      fill="#3f3d56"
                    />
                  </svg>
                </div>

                <div className="w-1/2 sm:w-1/4 lg:w-1/5">
                  {/* Female Avatar */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // width={532}
                    // height={532}
                    viewBox="0 0 532 532"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className={`fade-in w-full hover:cursor-pointer bg-[#f7f3f5] box-border delay-150 shadow-xl duration-300 transition-transform border-2 border-orange-500 rounded-full p-2 ${
                      formik.values.gender === "female"
                        ? ""
                        : "border-none hover:scale-110"
                    }`}
                    onClick={() => {
                      formik.setFieldValue("gender", "female");
                    }}
                  >
                    <g>
                      <polygon
                        points="297.05536 387.22083 309.71625 308.09024 224.2552 273.27277 211.59431 393.55127 297.05536 387.22083"
                        fill="#a0616a"
                      />
                      <path
                        d="M382.94672,504.16492c-7.33743,3.57727-14.81442,6.80649-22.40332,9.67133-15.17813,5.74329-30.84525,10.07666-46.91769,12.97015-15.70908,2.83618-31.83749,4.27606-47.96591,4.27606-21.78879,0-43.45168-2.61371-64.40176-7.7851-8.20377-2.01178-16.47781-4.47125-24.61163-7.3374-.85269-.30707-1.71902-.6142-2.57172-.92267-10.09067-3.66052-20.01379-7.9516-29.5592-12.80093-1.28603-.64285-2.57172-1.30069-3.85741-1.99951-1.42558-.7261-2.83717-1.49451-4.26276-2.29156-1.81696-.99225-3.61992-2.02679-5.4229-3.07501-6.03741-3.49402-11.97723-7.26782-17.65159-11.19449l-.37738-.25113c-.33541-.23749-.67082-.46133-.99225-.69879,.2095-1.10416,.40536-2.11142,.58689-3.0054,.6988-3.50766,1.16012-5.43619,1.16012-5.43619l38.26627-79.04932,10.66391-22.02594,5.19905-2.13873,39.27284-16.14206h95.98743l30.28601,12.52249s.1539,.57324,.46133,1.6774c3.01871,10.83145,20.62866,72.32608,47.95193,132.49271,.37704,.83801,.76874,1.69104,1.15979,2.54407l-.00006,.00003Z"
                        fill="#ff4848"
                      />
                      <circle
                        cx="275.45874"
                        cy="246.37804"
                        r="87.14982"
                        fill="#a0616a"
                      />
                      <path
                        d="M167.97998,370.32001l-.14996,.75-26.57001,126.32996-.22998,1.10004-.37006,1.73999c-1.42999-.72998-2.83997-1.5-4.25995-2.28998-1.82001-1-3.62-2.03003-5.43005-3.08002-6.02997-3.48999-11.96997-7.27002-17.64996-11.19l-.38-.26001c-.33002-.22998-.66998-.46002-.98999-.69-4.34003-3.02997-8.57001-6.19-12.70001-9.45001-.03003-.01996-.04999-.03998-.08002-.07001-7.37-5.94-14.46997-12.32996-21.26001-19.12-4.37994-4.38-8.58997-8.88995-12.62-13.51996l.61005-2.56,.06-.26001,.75995-3.26001c6.76001-28.54999,29.63-50.46002,58.44-55.97998l38.28003-7.33002,4.53998-.85999Z"
                        fill="#ff4848"
                      />
                      <path
                        d="M439.39618,467.22528c-11.27878,9.60172-23.36792,18.29581-36.12823,25.92667-1.24371,.75476-2.51575,1.49451-3.78745,2.23563-5.42255,3.13095-10.94336,6.05173-16.53378,8.77734-7.33743,3.57727-14.81442,6.80649-22.40332,9.67133l-.58722-2.76791-30.00653-142.6813,3.88538,.74112,38.93744,7.46298c28.80444,5.52081,51.68341,27.43481,58.43362,55.98746l7.44934,31.5444,.74078,3.10229h-.00003Z"
                        fill="#ff4848"
                      />
                      <path
                        d="M375.81912,269.67435c-2.26428,8.44159-13.65463,46.16327-42.82281,54.10123-5.72998,1.56549-19.39859,3.36844-15.77869,0,.82437-.7684,1.62109-1.52316,2.41782-2.26428,31.65561-29.76871,44.56949-47.96487,38.67163-88.35622-3.74582-25.71648-46.40042-49.07042-70.39752-51.39066-10.11865-.97723-23.0325,2.44582-31.55768,11.26546-14.07397,14.53429-11.75407,59.14709-19.55247,85.3522-2.09641,7.01532-4.90561,12.71765-8.94489,16.16937-2.51576,2.15237-4.12286-.58688-5.31097-5.07315-2.5294-9.5321-3.18623-26.98715-6.77818-22.0546-10.38411,14.29816-.4893,33.24908,2.50177,40.5592,.61485,1.49588,1.24371,2.93442,1.87257,4.30472v.01364c.36339,.78207,.74077,1.56549,1.10416,2.30658v.01364c9.97874,20.34854,21.97031,27.63,32.53629,40.30673,4.15086,4.96124,8.0782,10.73315,11.5862,18.44867,2.40384,5.28333,4.13687,10.59396,5.32495,15.8063,6.05139,26.1355-1.13214,49.88113-3.07501,56.33823-4.06689,13.44513-11.05493,36.54657-31.55769,49.5863-25.74413,16.38092-49.23761,1.94354-60.47441,17.49872-.13989,.18152-.26579,.36304-.39137,.54456-.41936,.62921-.79672,1.25836-1.11815,1.88623-10.09067-3.66052-20.01379-7.9516-29.5592-12.80093-1.28603-.64285-2.57172-1.30069-3.85741-1.99951-1.42558-.7261-2.83717-1.49451-4.26276-2.29156-.05595-1.09052-.11192-2.17966-.15388-3.28384-.82437-18.90997,.41936-39.69254,5.12944-60.41913,3.01871-13.23492,6.00977-26.35931,10.59361-39.00739,2.99107-8.24506,6.6526-16.2963,11.47427-24.05273,3.85776-6.23325,8.44159-12.285,14.00403-18.09927,12.21539-12.75998,23.07481-18.08426,24.79384-31.55804,2.45946-19.23071-17.56799-25.0163-24.79384-54.10123-4.93324-19.88721-10.09067-48.55177-5.08713-67.86711,4.72408-18.25212,8.83296-34.0871,22.54355-49.60133,3.29816-3.71785,30.36993-29.57355,61.73212-33.82232,14.45102-1.94218,27.33725,16.56245,44.80731,20.54507,20.0834,4.57088,31.58566,7.18456,42.82248,15.77902,18.99359,14.50697,24.34616,36.19852,29.30774,56.35188,3.88538,15.76537,8.9169,36.1562,2.25027,60.86543l.00003,.00012Z"
                        fill="#2f2e41"
                      />
                    </g>
                    <path
                      d="M454.09003,77.90997C403.84998,27.66998,337.04999,0,266,0S128.15002,27.66998,77.90997,77.90997C27.66998,128.14996,0,194.95001,0,266c0,64.84998,23.04999,126.15997,65.28998,174.57001,4.03003,4.63,8.24005,9.13995,12.62,13.51996,6.79004,6.79004,13.89001,13.17999,21.26001,19.12,.03003,.03003,.04999,.05005,.08002,.07001,47.10999,38.04999,105.34002,58.72003,166.74999,58.72003,71.04999,0,137.84998-27.67004,188.09003-77.91003,50.23999-50.23999,77.90997-117.03998,77.90997-188.08997s-27.66998-137.85004-77.90997-188.09003Zm-15.15002,387.39001c-17.07001,14.84998-36.07001,27.52997-56.56,37.63-7.19,3.54999-14.56,6.77997-22.09998,9.66998-29.29004,11.23999-61.08002,17.40002-94.28003,17.40002-32.03998,0-62.76001-5.73999-91.19-16.23999-11.66998-4.30005-22.95001-9.41003-33.77997-15.26001-1.59003-.85999-3.17004-1.73004-4.74005-2.62-8.25995-4.67999-16.25-9.79004-23.91998-15.31-17.14001-12.30005-32.75-26.60004-46.46997-42.56C26.09003,391.76996,2,331.64996,2,266,2,120.42999,120.42999,2,266,2s264,118.42999,264,264c0,79.47998-35.29999,150.87-91.06,199.29999Z"
                      fill="#3f3d56"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
              <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                <label
                  htmlFor="fullName"
                  className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                >
                  FULL NAME:
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  placeholder="Name"
                  className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                />
              </div>

              {step === 2 && (
                <>
                  <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8">
                    {/* Caste Dropdown */}

                    <div className="w-full flex gap-2 items-center justify-center">
                      <label
                        htmlFor="caste"
                        className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                      >
                        CASTE:
                      </label>
                      <select
                        id="caste"
                        name="caste"
                        onChange={(e) => {
                          setCaste(e.target.value);
                          formik.setFieldValue("caste", e.target.value);
                        }}
                        value={caste}
                        placeholder="Caste"
                        className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      >
                        <option value="" disabled>
                          Select Caste
                        </option>
                        {castes.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* SubCaste Dropdown */}

                    <div className="w-full flex gap-2 items-center justify-center">
                      <label
                        htmlFor="subcaste"
                        className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                      >
                        SUBCASTE:
                      </label>
                      <select
                        disabled={caste === "" ? true : false}
                        id="subcaste"
                        name="subcaste"
                        onChange={(e) => {
                          setSubcaste(e.target.value);
                          formik.setFieldValue("subcaste", e.target.value);
                        }}
                        value={subcaste}
                        className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      >
                        <option value="" disabled>
                          Select Subcaste
                        </option>
                        {subcastes.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Gotra DropDown */}

                    <div className="w-full flex gap-2 items-center justify-center">
                      <label
                        htmlFor="gotra"
                        className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                      >
                        GOTRA:
                      </label>
                      <select
                        disabled={
                          caste === "" || subcaste?.length === 0 ? true : false
                        }
                        id="gotra"
                        name="gotra"
                        onChange={(e) => {
                          setGotra(e.target.value);
                          formik.setFieldValue("gotra", e.target.value);
                        }}
                        value={gotra}
                        className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      >
                        <option value="" disabled>
                          Select Gotra
                        </option>
                        {gotras.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* DOB */}

              <div className="w-full flex gap-2 items-center justify-center">
                <label
                  htmlFor="dob"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  DATE OF BIRTH:
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.dob}
                  placeholder=""
                  className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                />
                {formik.errors.dob && formik.touched.dob && (
                  <div>{formik.errors.dob}</div>
                )}
              </div>

              {/* Manglik */}

              <div className="w-full flex gap-2 items-center justify-center">
                <fieldset className="w-full flex gap-4 items-center justify-start">
                  <p className="font-semibold text-sm font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]">
                    MANGLIK:
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 hover:cursor-pointer">
                      <input
                        id="manglik-yes"
                        name="manglik"
                        type="radio"
                        value="yes"
                        onChange={formik.handleChange}
                        checked={formik.values.manglik === "yes"}
                        className="hover:cursor-pointer"
                      />

                      <label
                        htmlFor="manglik-yes"
                        className="font-semibold text-sm hover:cursor-pointer font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="flex gap-2 hover:cursor-pointer">
                      <input
                        id="manglik-no"
                        name="manglik"
                        type="radio"
                        value="no"
                        onChange={formik.handleChange}
                        checked={formik.values.manglik === "no"}
                        className="hover:cursor-pointer"
                      />
                      <label
                        htmlFor="manglik-no"
                        className="font-semibold hover:cursor-pointer text-sm font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]"
                      >
                        No
                      </label>
                    </div>
                    <div className="flex gap-2 hover:cursor-pointer">
                      <input
                        id="manglik-anshik"
                        name="manglik"
                        type="radio"
                        value="anshik"
                        onChange={formik.handleChange}
                        checked={formik.values.manglik === "anshik"}
                        className="hover:cursor-pointer"
                      />
                      <label
                        htmlFor="manglik-anshik"
                        className="font-semibold hover:cursor-pointer text-sm font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]"
                      >
                        Anshik
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
              <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                <label
                  htmlFor="placeOfBirth"
                  className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                >
                  Place of Birth:
                </label>
                <input
                  id="placeOfBirth"
                  name="placeOfBirth"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.placeOfBirth}
                  placeholder="Birth Place"
                  className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                />
              </div>

              <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                <label
                  htmlFor="currentAddress"
                  className="font-semibold text-sm self-start font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                >
                  Current Address:
                </label>
                <textarea
                  id="currentAddress"
                  name="currentAddress"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.currentAddress}
                  placeholder="Address"
                  className="grow border h-28 w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                />
              </div>

              <div className="w-full flex gap-2 items-center justify-center sm:justify-start">
                <label
                  htmlFor="location"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] text-left"
                >
                  Address:
                </label>
                <select
                  id="location"
                  name="location"
                  value={formik.values.location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    formik.setFieldValue("location", e.target.value);
                  }}
                  className="w-full sm:w-1/2 border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                >
                  <option value="" disabled>
                    Select Location
                  </option>
                  <option value="india">India</option>
                  <option value="abroad">Abroad</option>
                </select>
              </div>

              {location === "abroad" && (
                <div className="w-full fade-in flex flex-col gap-3 sm:flex-row md:gap-8">
                  {/* Country */}

                  <div className="w-full flex gap-2 items-center justify-center">
                    <label
                      htmlFor="country"
                      className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                    >
                      Country:
                    </label>
                    <select
                      id="country"
                      name="country"
                      onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        formik.setFieldValue("country", e.target.value);
                      }}
                      value={selectedCountry}
                      className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    >
                      {countries.map((country) => (
                        <option
                          key={country.country_name}
                          value={country.country_name}
                        >
                          {country.country_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* State */}

                  <div className="w-full flex gap-2 items-center justify-center">
                    <label
                      htmlFor="state"
                      className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                    >
                      State:
                    </label>
                    <select
                      id="state"
                      name="state"
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        formik.setFieldValue("state", e.target.value);
                      }}
                      value={selectedCountry}
                      className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    >
                      {states.map((state) => (
                        <option key={state.state_name} value={state.state_name}>
                          {state.state_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City */}

                  <div className="w-full flex gap-2 items-center justify-center">
                    <label
                      htmlFor="city"
                      className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                    >
                      City:
                    </label>
                    <select
                      id="city"
                      name="city"
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                        formik.setFieldValue("city", e.target.value);
                      }}
                      value={selectedCity}
                      className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    >
                      {cities.map((city) => (
                        <option key={city.city_name} value={city.city_name}>
                          {city.city_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {location === "india" && (
                <div className="w-full fade-in flex flex-col gap-3 sm:flex-row md:gap-8">
                  {/* State */}

                  <div className="w-full flex gap-2 items-center justify-center">
                    <label
                      htmlFor="state"
                      className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                    >
                      State:
                    </label>
                    <select
                      id="state"
                      name="state"
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        formik.setFieldValue("state", e.target.value);
                      }}
                      value={formik.values.state}
                      className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    >
                      <option value="" disabled>
                        Select a state
                      </option>
                      {Object.keys(indiaStates).map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City */}

                  <div className="w-full flex gap-2 items-center justify-center">
                    <label
                      htmlFor="district"
                      className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                    >
                      City
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formik.values.city}
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                        formik.setFieldValue("city", e.target.value);
                      }}
                      className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    >
                      <option value="" disabled>
                        Select a City
                      </option>
                      {selectedState &&
                        indiaStates[selectedState].map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
          {step === 4 && (
            <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
              {/* Height And Complextion */}

              <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8">
                {/* Height */}

                <div className="w-full flex gap-2 items-center justify-center">
                  <label
                    htmlFor="heightFeet"
                    className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                  >
                    Height (in feet):
                  </label>
                  <input
                    id="heightFeet"
                    name="heightFeet"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.heightFeet}
                    placeholder="Height"
                    className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                  />
                </div>

                {/* Complexion */}

                <div className="w-full flex gap-2 items-center justify-center">
                  <label
                    htmlFor="complexion"
                    className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                  >
                    Complexion:
                  </label>
                  <select
                    id="complexion"
                    name="complexion"
                    onChange={formik.handleChange}
                    value={formik.values.complexion}
                    className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                  >
                    <option value="">Select Complexion</option>
                    <option value="fair">Fair</option>
                    <option value="medium">Medium</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>

              {/* Education */}

              <div className="w-full fade-in gap-3 flex flex-col justify-center items-center">
                <div className="w-full flex gap-2 items-center justify-center sm:justify-start">
                  <label
                    htmlFor="education"
                    className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                  >
                    Education:
                  </label>
                  <select
                    id="education"
                    name="education"
                    onChange={formik.handleChange}
                    value={formik.values.education}
                    className="w-full sm:w-1/2 border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                  >
                    <option value="" disabled>
                      Select Education
                    </option>
                    <option value="Under Graduate">Under Graduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="Professional">Professional</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* <div className="w-full fade-in gap-3 flex flex-col justify-center items-center"> */}
                {formik.values.education === "Professional" && (
                  <div className="w-full fade-in flex flex-col gap-3 sm:flex-row md:gap-8">
                    <div className="w-full fade-in flex gap-2 items-center justify-center">
                      <label
                        htmlFor="profession"
                        className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                      >
                        Profession:
                      </label>
                      <select
                        id="profession"
                        name="profession"
                        onChange={formik.handleChange}
                        value={formik.values.profession}
                        className="w-full  border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      >
                        <option value="">Select Profession</option>
                        <option value="Engineer">Engineer</option>
                        <option value="Doctor">Doctor</option>
                        <option value="CA">CA</option>
                        <option value="Advocate">Advocate</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    {formik.values.profession === "Other" && (
                      <div className="w-full fade-in flex gap-2 items-center justify-center">
                        <label
                          htmlFor="otherProfession"
                          className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                        >
                          Detail:
                        </label>
                        <input
                          id="otherProfession"
                          name="otherProfession"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.otherProfession}
                          placeholder="Details"
                          className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                        />
                      </div>
                    )}
                  </div>
                )}
                {formik.values.education === "Other" && (
                  <div className="w-full fade-in flex gap-2 items-center justify-center">
                    <label
                      htmlFor="otherEducation"
                      className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                    >
                      Education Detail:
                    </label>
                    <input
                      id="otherEducation"
                      name="otherEducation"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.otherEducation}
                      placeholder="Details"
                      className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    />
                  </div>
                )}
                {/* </div> */}
              </div>

              {/* Occupation */}

              <div className="w-full fade-in gap-3 flex flex-col justify-center items-center">
                <div className="w-full flex gap-2 items-center justify-center sm:justify-start">
                  <label
                    htmlFor="occupation"
                    className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                  >
                    Occupation:
                  </label>
                  <select
                    id="occupation"
                    name="occupation"
                    onChange={formik.handleChange}
                    value={formik.values.occupation}
                    className="w-full sm:w-1/2 border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                  >
                    <option value="" disabled>
                      Select Occupation
                    </option>
                    <option value="Service">Service</option>
                    <option value="Business">Business</option>
                    <option value="Self Employed">Self Employed</option>
                  </select>
                </div>

                {formik.values.occupation === "Service" && (
                  <div className="w-full fade-in flex flex-col gap-3 sm:flex-row md:gap-8">
                    <div className="w-full fade-in flex gap-2 items-center justify-center">
                      <label
                        htmlFor="serviceType"
                        className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                      >
                        Service Type:
                      </label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        onChange={formik.handleChange}
                        value={formik.values.serviceType}
                        className="w-full  border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      >
                        <option value="">Select Service Type</option>
                        <option value="Government">Government</option>
                        <option value="Private">Private</option>
                      </select>
                    </div>
                    {formik.values.serviceType && (
                      <div className="w-full fade-in flex gap-2 items-center justify-center">
                        {" "}
                        <label
                          htmlFor="serviceDetails"
                          className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                        >
                          Service Details
                        </label>
                        <input
                          id="serviceDetails"
                          name="serviceDetails"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.serviceDetails}
                          placeholder="Details"
                          className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                        />
                      </div>
                    )}
                  </div>
                )}
                {formik.values.occupation === "Business" && (
                  <div className="w-full fade-in flex gap-2 items-center justify-center">
                    <label
                      htmlFor="businessDetails"
                      className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                    >
                      Business Details
                    </label>
                    <input
                      id="businessDetails"
                      name="businessDetails"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.businessDetails}
                      placeholder="Business Details"
                      className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    />
                  </div>
                )}
                {formik.values.occupation === "Self Employed" && (
                  <div className="w-full fade-in flex gap-2 items-center justify-center">
                    <label
                      htmlFor="selfEmployedDetails"
                      className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                    >
                      Self Employed Details
                    </label>
                    <input
                      id="selfEmployedDetails"
                      name="selfEmployedDetails"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.selfEmployedDetails}
                      placeholder="Employement Details"
                      className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Income Bracket */}

              <div className="w-full flex gap-2 items-center justify-center sm:justify-start">
                <label
                  htmlFor="incomeBracket"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Income Bracket:
                </label>
                <select
                  id="incomeBracket"
                  name="incomeBracket"
                  onChange={formik.handleChange}
                  value={formik.values.incomeBracket}
                  className="w-full sm:w-1/2 border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                >
                  <option value="" disabled>
                    Select Income Bracket
                  </option>
                  <option value="less than 1 lakh">Less than 1 Lakh</option>
                  <option value="1-5 lakhs">1-5 Lakhs</option>
                  <option value="5-10 lakhs">5-10 Lakhs</option>
                  <option value="more than 10 lakhs">More than 10 Lakhs</option>
                </select>
              </div>

              {/* Marital Status And Pwd */}

              <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8">
                {/* Marital Status */}

                <div className="w-full flex gap-2 items-center justify-center">
                  <fieldset className="w-full flex gap-4 items-center justify-start">
                    <p className="font-semibold text-sm font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]">
                      Marital Status:
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 hover:cursor-pointer">
                        <input
                          id="single"
                          name="maritalStatus"
                          type="radio"
                          value="single"
                          onChange={formik.handleChange}
                          checked={formik.values.maritalStatus === "single"}
                          className="hover:cursor-pointer"
                        />
                        <label
                          htmlFor="single"
                          className="font-semibold text-sm hover:cursor-pointer font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]"
                        >
                          Single
                        </label>
                      </div>
                      <div className="flex gap-2 hover:cursor-pointer">
                        <input
                          id="divorced"
                          name="maritalStatus"
                          type="radio"
                          value="divorced"
                          onChange={formik.handleChange}
                          checked={formik.values.maritalStatus === "divorced"}
                          className="hover:cursor-pointer"
                        />
                        <label
                          htmlFor="divorced"
                          className="font-semibold text-sm hover:cursor-pointer font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]"
                        >
                          Divorced
                        </label>
                      </div>
                      <div className="flex gap-2 hover:cursor-pointer">
                        <input
                          id="married"
                          name="maritalStatus"
                          type="radio"
                          value="married"
                          onChange={formik.handleChange}
                          checked={formik.values.maritalStatus === "married"}
                          className="hover:cursor-pointer"
                        />
                        <label
                          htmlFor="married"
                          className="font-semibold text-sm hover:cursor-pointer font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]"
                        >
                          Married
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                {/* Pwd */}

                <div className="w-full flex gap-2 items-start justify-center">
                  {" "}
                  <fieldset className="w-full flex gap-4 items-center justify-start">
                    <p className="font-semibold text-sm font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]">
                      PwD:
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 hover:cursor-pointer">
                        <input
                          id="pwd-yes"
                          name="pwd"
                          type="radio"
                          value="yes"
                          onChange={formik.handleChange}
                          checked={formik.values.pwd === "yes"}
                          className="hover:cursor-pointer"
                        />
                        <label
                          htmlFor="pwd-yes"
                          className="font-semibold text-sm hover:cursor-pointer font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="flex gap-2 hover:cursor-pointer">
                        <input
                          id="pwd-no"
                          name="pwd"
                          type="radio"
                          value="no"
                          onChange={formik.handleChange}
                          checked={formik.values.pwd === "no"}
                          className="hover:cursor-pointer"
                        />
                        <label
                          htmlFor="pwd-no"
                          className="font-semibold text-sm hover:cursor-pointer font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>

              {/* File Upload */}

              <div>
                <label htmlFor="file">Upload File:</label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) => {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}
                />
              </div>

              {/* Image Upload */}

              <div>
                <div>
                  <label htmlFor="image1">Upload Image 1:</label>
                  <input
                    id="image1"
                    name="image1"
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "image1",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="image2">Upload Image 2:</label>
                  <input
                    id="image2"
                    name="image2"
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "image2",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="image3">Upload Image 3:</label>
                  <input
                    id="image3"
                    name="image3"
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "image3",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                </div>
              </div>

              {/* Phone Number */}

              <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8">
                {/* Phone Number 1 */}

                <div className="w-full flex gap-2 items-center justify-center">
                  <label
                    htmlFor="phoneNumber1"
                    className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                  >
                    Phone Number 1:
                  </label>
                  <input
                    id="phoneNumber1"
                    name="phoneNumber1"
                    type="tel"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber1}
                    placeholder="123-456-7890"
                    className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                  />
                </div>

                {/* Phone Number 2 */}

                <div className="w-full flex gap-2 items-center justify-center">
                  <label
                    htmlFor="phoneNumber2"
                    className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                  >
                    Phone Number 2:
                  </label>
                  <input
                    id="phoneNumber2"
                    name="phoneNumber2"
                    type="tel"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber2}
                    placeholder="123-456-7890"
                    className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                  />
                </div>
              </div>

              {/* Email */}

              <div className="w-full flex gap-2 items-center justify-center">
                <label
                  htmlFor="email"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Email:
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                />
              </div>
            </div>
          )}
          <div className="w-full flex flex-col items-center justify-center sm:flex-row sm:justify-between gap-4">
            {step > 1 && (
              <div className={`w-full justify-center sm:justify-start flex`}>
                <button
                  onClick={() => {
                    prevStep();
                  }}
                  type="button"
                  className="group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.2em"
                    viewBox="0 0 448 512"
                    fill="#fff"
                    className="group-hover:-translate-x-3 transition duration-200 delay-[200ms]"
                  >
                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                  </svg>
                  <p className="group-hover:-translate-x-1 transition duration-150 delay-150">
                    PREVIOUS
                  </p>{" "}
                </button>
              </div>
            )}
            {step < 4 && (
              <div
                className={`w-full  flex ${
                  step === 1
                    ? "justify-center"
                    : "sm:justify-end justify-center"
                }`}
              >
                <button
                  onClick={() => {
                    nextStep();
                  }}
                  type="button"
                  className="group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
                >
                  <p className="group-hover:translate-x-1 transition duration-150 delay-150">
                    NEXT
                  </p>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.2em"
                    viewBox="0 0 448 512"
                    fill="#fff"
                    className="group-hover:translate-x-3 transition duration-200 delay-[200ms]"
                  >
                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  </svg>
                </button>
              </div>
            )}
            {step === 4 && (
              <button
                type="submit"
                className="group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
