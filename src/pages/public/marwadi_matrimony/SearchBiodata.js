import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useFormik, Formik, FieldArray, Form } from "formik";
import bioData from "../../../utils/biodata";
import indiaStates from "../../../utils/indiaStates";
import { Slider } from "@mui/material";
import BiodataCard from "./BiodataCard";
import { GET_BIODATAS } from "../../../utils/constants";
import Popup from "./Popup";
import FilterSection from "./FilterSection";
import ImagePreview from "../press/ImagePreview";
import { useNavigate } from "react-router-dom";
import BiodataFrame from "./biodataFrame/BiodataFrame";
import ReactPaginate from "react-paginate";
import mifBride from "../../../../assests/images/mifBride.webp";
import mifGroom from "../../../../assests/images/mifGroom.webp";
import { usePagination } from "../../../hooks/usePagination";
import { BASE_URL } from "../../../utils/constants";
const heights = [
  "Less than 4 fts.",
  "4-4.5 fts.",
  "4.5-5 fts.",
  "5-5.5 fts",
  "5.5-6 fts",
  "6-6.5 fts",
  "Greater than 6.5 fts.",
];

function SearchBiodata() {
  const [step, setStep] = useState(1);
  const [ageRange, setAgeRange] = useState([{ min: 18, max: 100 }]);
  const [caste, setCaste] = useState("");
  const [subcaste, setSubcaste] = useState("");
  const [excludedGotras, setExcludedGotras] = useState([]);
  const [height, setHeight] = useState("");
  const [bioData, setBioData] = useState({});
  // const gotras = caste && subcaste ? bioData[caste][subcaste] : [];
  // const castes = Object.keys(bioData);
  // const subcastes = caste ? Object.keys(bioData[caste]) : [];

  const navigate = useNavigate();

  const [searchedBiodatas, setSearchedBiodatas] = useState(null);

  const [filteredBiodatas, setFilteredBioDatas] = useState(searchedBiodatas);

  const [noresponseError, setNoResponseError] = useState(null);

  const [minAge, setMinAge] = useState(null);

  const [showImage, setShowImage] = useState(null);

  const [showBiodataFrame, setShowBiodataFrame] = useState(null);

  // For Pagination
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) navigate("/matrimony");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const token = jwtToken;

    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["authorization"] = `Bearer ${token}`;
    }

    fetch(`${BASE_URL}getBiodata`, { headers })
      .then((response) => response.json())
      .then((data) => setBioData(data))
      .catch((error) => console.log(error));
  }, []);

  const castes = Object.keys(bioData);
  const subcastes =
    bioData && caste && bioData[caste] ? Object.keys(bioData[caste]) : [];
  const gotras =
    bioData && caste && subcaste && bioData[caste] && bioData[caste][subcaste]
      ? bioData[caste][subcaste]
      : [];
  const {
    currentPage,
    handlePageChange,
    currentItems,
    totalPages,
    setItemsPerPage,
  } = usePagination(() => {
    if (window.innerWidth < 640) {
      return 4;
    } else if (window.innerWidth < 1024) {
      return 4;
    } else return 6;
  }, filteredBiodatas);

  useEffect(() => {
    const handleResize = (e) => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(6);
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) navigate("/matrimony");
  }, []);

  useEffect(() => {
    setFilteredBioDatas(searchedBiodatas);
  }, [searchedBiodatas]);

  useEffect(() => {
    handlePageChange({ selected: 0 });
  }, [filteredBiodatas]);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const sliderStyle = {
    color: (theme) => `rgba(239, 77, 72, 0.7)`, // Color of the rod with 0.6 opacity
    "& .MuiSlider-thumb": {
      backgroundColor: "rgba(239, 77, 72, 1)", // Color of the controller balls with 1 opacity
    },
  };
  return (
    <div className="w-full flex justify-center my-4">
      {filteredBiodatas === null ? (
        <Formik
          initialValues={{
            gender: "",
            caste: caste,
            subcaste: subcaste,
            gotra: [""],
            manglik: "",
            height: height,
            age: "",
            ageRange: ageRange,
          }}
          onSubmit={async (values) => {
            const formData = new FormData();

            for (const key in values) {
              if (key === "ageRange") {
                formData.append(key, JSON.stringify(values[key]));
              } else if (key === "gotra") {
                const includedGotras = gotras.filter((g) =>
                  values.gotra.includes(g)
                );
                formData.append(key, includedGotras);
              } else {
                formData.append(key, values[key]);
              }
            }

            try {
              const response = await fetch(
                `${GET_BIODATAS}?gender=${values.gender}&height=${
                  values.height
                }&ageRange=${JSON.stringify(values.ageRange)}&manglik=${
                  values.manglik
                }&caste=${values.caste}&subcaste=${values.subcaste}&gotra=${
                  values.gotra
                }`,
                {
                  method: "GET",
                }
              );

              if (response.status === 500) {
                setNoResponseError(true);
              }

              let data = await response.json();

              data = data.filter((d) => {
                return !d.matured && !d.discard;
              });

              setSearchedBiodatas(data);
            } catch (error) {
              setNoResponseError(true);

              console.error(error);
            }
          }}
        >
          {(formik) => {
            return (
              <div
                className={`w-full max-w-4xl flex justify-center p-5 ${
                  formik.isSubmitting ? "opacity-50" : ""
                }`}
              >
                <form
                  onSubmit={formik.handleSubmit}
                  className="w-full flex flex-col gap-16"
                >
                  {step === 1 && (
                    <div className="w-full max-w-full flex flex-col justify-between items-center gap-14">
                      <p className=" fade-in w-full text-center font-Poppins text-lg sm:text-xl font-semibold text-[#333]">
                        Looking for...
                      </p>{" "}
                      <div className="w-full flex justify-between sm:justify-evenly gap-6">
                        <div className="w-1/2 sm:w-1/4 lg:w-1/5 ">
                          {/* Male Avatar */}

                          <img
                            src={mifGroom}
                            alt="groom"
                            className={`fade-in w-full hover:cursor-pointer bg-[#f7f3f5] box-border shadow-xl delay-150 duration-300 transition-transform border-2 border-orange-500 rounded-full p-2 ${
                              formik.values.gender === "male"
                                ? ""
                                : "border-none hover:scale-110"
                            } `}
                            onClick={() => {
                              formik.setFieldValue("gender", "male");
                              setMinAge(21);
                              setStep((s) => s + 1);
                            }}
                          />
                          <p className="w-full text-center font-semibold font-Poppins text-sm text-[#EF4D48] mt-3">
                            Groom
                          </p>
                        </div>

                        <div className="w-1/2 sm:w-1/4 lg:w-1/5">
                          {/* Female Avatar */}

                          <img
                            src={mifBride}
                            alt="bride"
                            className={`fade-in w-full hover:cursor-pointer bg-[#f7f3f5] box-border shadow-xl delay-150 duration-300 transition-transform border-2 border-orange-500 rounded-full p-2 ${
                              formik.values.gender === "female"
                                ? ""
                                : "border-none hover:scale-110"
                            } `}
                            onClick={() => {
                              formik.setFieldValue("gender", "female");
                              setMinAge(18);
                              setStep((s) => s + 1);
                            }}
                          />
                          <p className="w-full text-center font-semibold font-Poppins text-sm text-[#EF4D48] mt-3">
                            Bride
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="w-full fade-in gap-8 flex flex-col pt-1 justify-center items-center">
                      {/* Caste And SubCaste Dropdown */}

                      {/* <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8"> */}
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                        {/* Caste Dropdown */}

                        <div className="w-full flex gap-2 flex-col items-center justify-center">
                          <label
                            htmlFor="caste"
                            className="font-semibold text-sm font-Poppins w-full text-left tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                          >
                            Caste:
                          </label>
                          <select
                            id="caste"
                            name="caste"
                            onChange={(e) => {
                              setCaste(e.target.value);
                              formik.setFieldValue("caste", e.target.value);
                            }}
                            value={caste}
                            className="grow border w-full rounded border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                          >
                            <option value="" disabled>
                              -- Select Caste --
                            </option>
                            {castes.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* SubCaste Dopdown */}

                        <div className="w-full flex gap-2 flex-col items-center justify-center">
                          <label
                            htmlFor="subcaste"
                            className="font-semibold text-sm font-Poppins w-full text-left tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                          >
                            Subcaste:
                          </label>
                          <select
                            id="subcaste"
                            name="subcaste"
                            onChange={(e) => {
                              setSubcaste(e.target.value);
                              formik.setFieldValue("subcaste", e.target.value);
                            }}
                            value={subcaste}
                            className="grow border w-full rounded border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                          >
                            <option value="" disabled>
                              -- Select Subcaste --
                            </option>
                            {subcastes.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Exclude Gotra */}

                      <div className="w-full flex flex-col  justify-center gap-2 items-center">
                        <label
                          htmlFor="gotra"
                          className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                        >
                          Exclude Gotras:
                        </label>

                        <FieldArray
                          name="gotra"
                          render={(arrayHelpers) => (
                            <div className="w-full flex flex-col gap-3">
                              {/* <div className="w-full flex flex-col  items-center gap-2 sm:flex-row sm:flex-wrap"> */}
                              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                                {formik.values.gotra &&
                                  formik.values.gotra.map((g, index) => (
                                    <div
                                      key={index}
                                      // className=" w-full fade-in max-w-sm "
                                      className=" w-full fade-in "
                                    >
                                      <select
                                        id={`gotra.${index}`}
                                        name={`gotra.${index}`}
                                        onChange={formik.handleChange}
                                        value={formik.values.gotra[index]}
                                        placeholder="Gotra"
                                        className="w-full  border  rounded border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                      >
                                        <option value={""} disabled>
                                          -- Select Gotra to Exclude --
                                        </option>
                                        {gotras.map((gg, index) => {
                                          return (
                                            <option key={index} value={gg}>
                                              {gg}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </div>
                                  ))}
                              </div>

                              <button
                                onClick={() => arrayHelpers.push("")}
                                type="button"
                                className="group flex w-full items-center gap-2 justify-center max-w-[100px] rounded-md bg-[#EF4D48] px-2 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2"
                              >
                                {/* <p className="transition duration-150 delay-150"> */}
                                Add Field
                                {/* </p> */}
                              </button>
                              {/* </div> */}
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="w-full fade-in gap-8 flex flex-col pt-1 justify-center items-center">
                      {/* Manglik and Height */}

                      {/* <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8"> */}
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                        {/* Manglik */}

                        <div className="w-full flex gap-2 flex-col items-center justify-center">
                          <label
                            htmlFor="manglik"
                            className="font-semibold text-sm font-Poppins w-full text-left tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                          >
                            Manglik:
                          </label>
                          <select
                            id="manglik"
                            name="manglik"
                            onChange={formik.handleChange}
                            value={formik.values.manglik}
                            className="grow border w-full rounded border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                          >
                            <option value="" disabled>
                              -- Select Manglik --
                            </option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="Anshik">Anshik</option>
                          </select>
                        </div>

                        {/* Height */}

                        <div className="w-full flex gap-2 flex-col items-center justify-center">
                          <label
                            htmlFor="height"
                            className="font-semibold text-sm font-Poppins w-full text-left tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                          >
                            Height:
                          </label>
                          <select
                            id="height"
                            name="height"
                            onChange={(e) => {
                              setHeight(e.target.value);
                              formik.setFieldValue("height", e.target.value);
                            }}
                            value={height}
                            className="grow border w-full rounded border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                          >
                            <option value="" disabled>
                              -- Select Height --
                            </option>

                            {heights.map((h) => (
                              <option key={h} value={h}>
                                {h}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Age Slider */}

                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                        <div className="w-full flex gap-2 items-center flex-col justify-center sm:justify-start">
                          <label
                            htmlFor="ageRange"
                            className="font-semibold text-sm font-Poppins w-full tracking-wide sm:text-base whitespace-nowrap  text-[#444] text-left"
                          >
                            Age Range:
                          </label>
                          <div className="w-full  border flex justify-center items-center px-8 py-2 rounded border-[#ca403b]  text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm">
                            <Slider
                              sx={sliderStyle}
                              getAriaLabel={() => "Age Range"}
                              onChange={(event, newValue) => {
                                const newAgeRange = {
                                  min: newValue[0],
                                  max: newValue[1],
                                };
                                formik.setFieldValue("ageRange", newAgeRange);
                                setAgeRange(newAgeRange);
                              }}
                              value={[ageRange.min, ageRange.max]}
                              min={minAge}
                              max={100}
                              valueLabelDisplay="auto"
                              valueLabelFormat={(value, index) =>
                                index === 0
                                  ? `Min Age: ${value}`
                                  : `Max Age: ${value}`
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="w-full flex flex-col items-center justify-center sm:flex-row sm:justify-between gap-4">
                    {step > 1 && (
                      <div
                        className={`w-full justify-center sm:justify-start flex`}
                      >
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
                    {step < 3 && step > 1 && (
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
                    {step === 3 && (
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
            );
          }}
        </Formik>
      ) : (
        <div className="w-full max-w-7xl flex justify-center p-5 flex-col">
          <div className="  w-full flex flex-col justify-center items-center gap-4 mb-8">
            <h2 className="w-full text-4xl font-semibold font-PlayFair text-center ">
              Available Biodatas
            </h2>
          </div>

          {filteredBiodatas && (
            <div className="w-full flex flex-col gap-4 justify-center items-center">
              {totalPages > 1 && (
                <div className="w-full  items-center justify-end hidden sm:flex ">
                  <ReactPaginate
                    forcePage={currentPage}
                    pageCount={totalPages}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageChange}
                    containerClassName={
                      "flex justify-center items-center gap-6 font-Poppins text-sm text-[#333]  rounded-md p-3"
                    }
                    pageClassName={"font-bold"}
                    activeClassName={
                      "bg-[#EF4D48] text-white rounded-md py-2 px-4"
                    }
                    disabledClassName={
                      "hover:cursor-not-allowed fill-gray-500 hidden"
                    }
                    previousLabel={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1.4rem"
                        viewBox="0 0 320 512"
                        fill="#EF4D48"
                      >
                        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                      </svg>
                    }
                    // className="flex hover:cursor-not-allowed w-full  justify-center font-Poppins text-sm text-[#333] gap-2 items-center "
                    nextLabel={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1.4rem"
                        fill="#EF4D48"
                        viewBox="0 0 320 512"
                      >
                        <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                      </svg>
                    }
                  />
                </div>
              )}
              <div className="w-full flex md:flex-row flex-col gap-6  justify-center">
                <FilterSection
                  filteredBiodatas={filteredBiodatas}
                  setFilteredBioDatas={setFilteredBioDatas}
                  searchedBiodatas={searchedBiodatas}
                />

                <div className="w-full flex justify-center gap-6 items-center">
                  {/* <div className="w-[2px] h-full rounded-lg bg-[#EF4D48]" /> */}

                  {filteredBiodatas && filteredBiodatas?.length === 0 ? (
                    <div className="w-full fade-in flex flex-col justify-center items-center gap-8">
                      <div className="w-full flex flex-col justify-center items-center gap-2">
                        <p className="w-full text-center font-Poppins text-xl font-semibold text-[#EF4D48]">
                          Sorry, no Biodata available...
                        </p>
                        <p className="w-full text-center font-Poppins text-base text-[#EF4D48]">
                          Please try changing filters.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col justify-center items-center">
                      <div className="w-full grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3   gap-4">
                        {currentItems?.map((biodata) => {
                          return (
                            <BiodataCard
                              key={biodata._id}
                              data={biodata}
                              setShowImage={setShowImage}
                              setShowBiodataFrame={setShowBiodataFrame}
                            />
                          );
                        })}
                      </div>
                      <div className="w-full flex items-center flex-col sm:flex-row justify-start gap-4 sm:justify-between mt-5">
                        {totalPages > 1 && (
                          <ReactPaginate
                            forcePage={currentPage}
                            pageCount={totalPages}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            onPageChange={handlePageChange}
                            containerClassName={
                              "flex justify-center items-center gap-6 font-Poppins text-sm text-[#333]  rounded-md p-3"
                            }
                            pageClassName={"font-bold"}
                            activeClassName={
                              "bg-[#EF4D48] text-white rounded-md py-2 px-4"
                            }
                            disabledClassName={
                              "hover:cursor-not-allowed fill-gray-500 hidden"
                            }
                            previousLabel={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.4rem"
                                viewBox="0 0 320 512"
                                fill="#EF4D48"
                              >
                                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                              </svg>
                            }
                            // className="flex hover:cursor-not-allowed w-full  justify-center font-Poppins text-sm text-[#333] gap-2 items-center "
                            nextLabel={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.4rem"
                                fill="#EF4D48"
                                viewBox="0 0 320 512"
                              >
                                <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                              </svg>
                            }
                          />
                        )}
                        {totalPages >= 1 ? (
                          <p className="text-base w-full text-center sm:text-right tracking-wide font-Poppins text-[#333] font-semibold">
                            Page : {currentPage + 1} of {totalPages}
                          </p>
                        ) : (
                          <p className="text-base w-full text-center sm:text-right tracking-wide font-Poppins text-[#333] font-semibold">
                            Page : {currentPage} of {totalPages}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {showImage && (
        <ImagePreview
          data={showImage}
          showImage={showImage}
          setShowImage={setShowImage}
        />
      )}

      {showBiodataFrame && (
        <div className=" z-50 fixed flex-col justify-center gap-5 sm:gap-8 items-center w-screen h-screen top-0 left-0 bg-[#323233] bg-opacity-90 overflow-x-auto overflow-y-auto ">
          <div className="w-full flex flex-col gap-5  justify-center items-center">
            <div
              className="self-end flex justify-end pr-5 sm:pr-20 hover:cursor-pointer group mt-5"
              onClick={() => {
                setShowBiodataFrame(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2em"
                viewBox="0 0 384 512"
                fill="#fff"
                className="group-hover:fill-[#EF4D48]"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="max-w-md rounded-lg">
                <BiodataFrame info={showBiodataFrame} />
              </div>
            </div>
          </div>
        </div>
      )}

      {noresponseError === true ? (
        <Popup
          message={"Unexpected error occurred, please try again..."}
          redirect={"/matrimony"}
          buttontext={"Try Again"}
        />
      ) : null}
    </div>
  );
}

export default SearchBiodata;
