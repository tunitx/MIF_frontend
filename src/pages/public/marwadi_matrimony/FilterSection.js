import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";

const FilterSection = ({
  filteredBiodatas,
  setFilteredBioDatas,
  searchedBiodatas,
}) => {
  const [complexion, setComplexion] = useState(new Set());

  const [education, setEducation] = useState(new Set());

  const [profession, setProfession] = useState(new Set());

  const [occupation, setOccupation] = useState(new Set());

  const [income, setIncome] = useState(new Set());

  const [maritalStatus, setMaritalStatus] = useState(new Set());

  const [pwd, setPwd] = useState(false);

  const [show, setShow] = useState(null);

  const filterBtnRef = useRef();

  const [showFilters, setShowFilters] = useState(() => {
    if (window.innerWidth >= 768) {
      return true;
    } else return false;
  });

  const handleComplexionChange = (tone) => {
    const newComplexion = new Set(complexion);
    if (complexion.has(tone)) {
      newComplexion.delete(tone);
    } else {
      newComplexion.add(tone);
    }
    setComplexion(newComplexion);
  };

  const handleEducationChange = (level) => {
    const newEducation = new Set(education);
    if (education.has(level)) {
      newEducation.delete(level);
    } else {
      newEducation.add(level);
    }
    setEducation(newEducation);
  };

  const handleProfessionChange = (title) => {
    const newProfession = new Set(profession);
    if (profession.has(title)) {
      newProfession.delete(title);
    } else {
      newProfession.add(title);
    }
    setProfession(newProfession);
  };

  const handleOccupationChange = (type) => {
    const newOccupation = new Set(occupation);
    if (occupation.has(type)) {
      newOccupation.delete(type);
    } else {
      newOccupation.add(type);
    }
    setOccupation(newOccupation);
  };

  const handleIncomeChange = (range) => {
    const newIncome = new Set(income);
    if (income.has(range)) {
      newIncome.delete(range);
    } else {
      newIncome.add(range);
    }
    setIncome(newIncome);
  };

  const handleMaritalStatusChange = (status) => {
    const newMaritalStatus = new Set(maritalStatus);
    if (maritalStatus.has(status)) {
      newMaritalStatus.delete(status);
    } else {
      newMaritalStatus.add(status);
    }
    setMaritalStatus(newMaritalStatus);
  };

  const handlePwdChange = () => {
    setPwd(!pwd);
  };

  const applyFilters = () => {
    const filteredBiodatas = searchedBiodatas.filter((biodata) => {
      // Complexion filter
      if (complexion.size > 0 && !complexion.has(biodata.complexion)) {
        return false;
      }

      // Education filter
      if (education.size > 0 && !education.has(biodata.education)) {
        return false;
      }

      // Profession filter
      if (profession.size > 0 && !profession.has(biodata.profession)) {
        return false;
      }

      // Occupation filter
      if (occupation.size > 0 && !occupation.has(biodata.occupation)) {
        return false;
      }

      // Income filter
      if (income.size > 0 && !income.has(biodata.incomeBracket)) {
        return false;
      }

      // Marital Status filter
      if (maritalStatus.size > 0 && !maritalStatus.has(biodata.maritalStatus)) {
        return false;
      }

      // Pwd filter
      if (pwd && biodata.pwd !== "yes") {
        return false;
      }

      return true;
    });

    setFilteredBioDatas(filteredBiodatas);
  };

  // Call this function whenever there's a change in filters
  useEffect(() => {
    applyFilters();
  }, [
    complexion,
    education,
    profession,
    occupation,
    income,
    maritalStatus,
    pwd,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setShowFilters(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="md:w-fit w-full  flex-row flex-wrap fade-in flex md:flex-col gap-5 md:max-w-[200px] item font-Poppins ">
      <button
        ref={filterBtnRef}
        onClick={() => {
          setShowFilters((p) => !p);
        }}
        className="flex  justify-center md:hidden w-fit  rounded-md bg-[#EF4D48] px-7 sm:py-3 py-2 text-sm sm:text-base  font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
      >
        Filters
      </button>

      {showFilters && (
        <>
          {/* Complexion */}

          <div className="w-full flex flex-col gap-2">
            <label
              className="text-base font-semibold text-[#EF4D48] flex items-center justify-between w-full hover:cursor-pointer gap-1"
              onClick={() => {
                setShow("complexion");
              }}
            >
              <span>Select Skin Tones</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1rem"
                className="fill-[#EF4D48]"
                viewBox="0 0 448 512"
              >
                {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </label>
            {show === "complexion" ? (
              <div className="w-full fade-in flex flex-col ">
                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="fair"
                    value="fair"
                    checked={complexion.has("fair")}
                    onChange={() => handleComplexionChange("fair")}
                    className="hover:cursor-pointer rounded-full"
                  />
                  <label
                    htmlFor="fair"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Fair
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="medium"
                    value="medium"
                    checked={complexion.has("medium")}
                    onChange={() => handleComplexionChange("medium")}
                    className="hover:cursor-pointer"
                  />
                  <label
                    htmlFor="medium"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Medium
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="dark"
                    value="dark"
                    checked={complexion.has("dark")}
                    onChange={() => handleComplexionChange("dark")}
                    className="hover:cursor-pointer"
                  />
                  <label
                    htmlFor="dark"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Dark
                  </label>
                </div>
              </div>
            ) : null}
          </div>

          {/* Education */}

          <div className="w-full flex flex-col gap-2">
            <label
              className="text-base font-semibold text-[#EF4D48] flex items-center justify-between w-full hover:cursor-pointer gap-1"
              onClick={() => {
                setShow("education");
              }}
            >
              Select Education Levels
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1rem"
                className="fill-[#EF4D48]"
                viewBox="0 0 448 512"
              >
                {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </label>
            {show === "education" ? (
              <div className="w-full fade-in flex flex-col ">
                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="undergraduate"
                    value="Under Graduate"
                    checked={education.has("Under Graduate")}
                    className="hover:cursor-pointer"
                    onChange={() => handleEducationChange("Under Graduate")}
                  />
                  <label
                    htmlFor="undergraduate"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Under Graduate
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="graduate"
                    value="Graduate"
                    checked={education.has("Graduate")}
                    onChange={() => handleEducationChange("Graduate")}
                    className="hover:cursor-pointer"
                  />
                  <label
                    htmlFor="graduate"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Graduate
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="postgraduate"
                    value="Post Graduate"
                    checked={education.has("Post Graduate")}
                    onChange={() => handleEducationChange("Post Graduate")}
                    className="hover:cursor-pointer"
                  />
                  <label
                    htmlFor="postgraduate"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Post Graduate
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="professional"
                    value="Professional"
                    checked={education.has("Professional")}
                    onChange={() => handleEducationChange("Professional")}
                    className="hover:cursor-pointer"
                  />
                  <label
                    htmlFor="professional"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Professional
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="otherProfession"
                    value="Other"
                    checked={education.has("Other")}
                    onChange={() => handleEducationChange("Other")}
                    className="hover:cursor-pointer"
                  />
                  <label
                    htmlFor="otherProfession"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Other
                  </label>
                </div>
              </div>
            ) : null}
          </div>

          {/* Profession */}

          <div className="w-full flex flex-col gap-2">
            <label
              className="text-base font-semibold text-[#EF4D48] flex items-center justify-between w-full hover:cursor-pointer gap-1"
              onClick={() => {
                setShow("profession");
              }}
            >
              Select Professions{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1rem"
                className="fill-[#EF4D48]"
                viewBox="0 0 448 512"
              >
                {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </label>
            {show === "profession" ? (
              <div className="w-full fade-in flex flex-col ">
                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="engineer"
                    value="Engineer"
                    checked={profession.has("Engineer")}
                    onChange={() => handleProfessionChange("Engineer")}
                    className="hover:cursor-pointer"
                  />
                  <label
                    htmlFor="engineer"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Engineer
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="doctor"
                    value="Doctor"
                    checked={profession.has("Doctor")}
                    onChange={() => handleProfessionChange("Doctor")}
                    className="hover:cursor-pointer"
                  />
                  <label
                    htmlFor="doctor"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Doctor
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="ca"
                    value="CA"
                    checked={profession.has("CA")}
                    onChange={() => handleProfessionChange("CA")}
                    className="hover:cursor-pointer"
                  />
                  <label
                    htmlFor="ca"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    CA
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="advocate"
                    value="Advocate"
                    checked={profession.has("Advocate")}
                    onChange={() => handleProfessionChange("Advocate")}
                    className="hover:cursor-pointer"
                  />
                  <label
                    htmlFor="advocate"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Advocate
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="otherProfession"
                    value="Other"
                    checked={profession.has("Other")}
                    onChange={() => handleProfessionChange("Other")}
                    className="hover:cursor-pointer"
                  />
                  <label
                    htmlFor="otherProfession"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Other
                  </label>
                </div>
              </div>
            ) : null}
          </div>

          {/* Occupation */}

          <div className="w-full flex flex-col gap-2">
            <label
              className="text-base font-semibold text-[#EF4D48] flex items-center justify-between w-full hover:cursor-pointer gap-1"
              onClick={() => {
                setShow("occupation");
              }}
            >
              Select Occupation
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1rem"
                className="fill-[#EF4D48]"
                viewBox="0 0 448 512"
              >
                {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </label>
            {show === "occupation" ? (
              <div className="w-full fade-in flex flex-col ">
                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="service"
                    value="Service"
                    checked={occupation.has("Service")}
                    onChange={() => handleOccupationChange("Service")}
                    className="hover:cursor-pointer"
                  />
                  <label
                    htmlFor="service"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Service / Job
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="business"
                    value="Business"
                    checked={occupation.has("Business")}
                    onChange={() => handleOccupationChange("Business")}
                    className="hover:cursor-pointer"
                  />
                  <label
                    htmlFor="business"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Business
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="selfemployed"
                    value="Self Employed"
                    checked={occupation.has("Self Employed")}
                    onChange={() => handleOccupationChange("Self Employed")}
                    className="hover:cursor-pointer"
                  />
                  <label
                    htmlFor="selfemployed"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Self Employed
                  </label>
                </div>
              </div>
            ) : null}
          </div>

          {/* Income */}

          <div className="w-full flex flex-col gap-2">
            <label
              className="text-base font-semibold text-[#EF4D48] flex items-center justify-between w-full hover:cursor-pointer gap-1"
              onClick={() => {
                setShow("income");
              }}
            >
              Select Income Range
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1rem"
                className="fill-[#EF4D48]"
                viewBox="0 0 448 512"
              >
                {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </label>
            {show === "income" && (
              <div className="w-full fade-in flex flex-col ">
                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="lessthan5"
                    value="Less than 5 lakhs"
                    checked={income.has("Less than 5 lakhs")}
                    onChange={() => handleIncomeChange("Less than 5 lakhs")}
                  />
                  <label
                    htmlFor="lessthan5"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Less than 5 lakhs
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="5to10"
                    value="5 - 10 lakhs"
                    checked={income.has("5 - 10 lakhs")}
                    onChange={() => handleIncomeChange("5 - 10 lakhs")}
                  />
                  <label
                    htmlFor="5to10"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    5 - 10 lakhs
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="10to15"
                    value="10 - 15 lakhs"
                    checked={income.has("10 - 15 lakhs")}
                    onChange={() => handleIncomeChange("10 - 15 lakhs")}
                  />
                  <label
                    htmlFor="10to15"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    10 - 15 lakhs
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="15to20"
                    value="15 - 20 lakhs"
                    checked={income.has("15 - 20 lakhs")}
                    onChange={() => handleIncomeChange("15 - 20 lakhs")}
                  />
                  <label
                    htmlFor="15to20"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    15 - 20 lakhs
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="20to30"
                    value="20 - 30 lakhs"
                    checked={income.has("20 - 30 lakhs")}
                    onChange={() => handleIncomeChange("20 - 30 lakhs")}
                  />
                  <label
                    htmlFor="20to30"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    20 - 30 lakhs
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="30to40"
                    value="30 - 40 lakhs"
                    checked={income.has("30 - 40 lakhs")}
                    onChange={() => handleIncomeChange("30 - 40 lakhs")}
                  />
                  <label
                    htmlFor="30to40"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    30 - 40 lakhs
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="morethan40"
                    value="More than 40 lakhs"
                    checked={income.has("More than 40 lakhs")}
                    onChange={() => handleIncomeChange("More than 40 lakhs")}
                  />
                  <label
                    htmlFor="morethan40"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    More than 40 lakhs
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Marital status */}

          <div className="w-full flex flex-col gap-2">
            <label
              className="text-base font-semibold text-[#EF4D48] flex items-center justify-between w-full hover:cursor-pointer gap-1"
              onClick={() => {
                setShow("maritalStatus");
              }}
            >
              Select Marital Status
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1rem"
                className="fill-[#EF4D48]"
                viewBox="0 0 448 512"
              >
                {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </label>
            {show === "maritalStatus" && (
              <div className="w-full fade-in flex flex-col ">
                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="single"
                    value="single"
                    checked={maritalStatus.has("single")}
                    onChange={() => handleMaritalStatusChange("single")}
                  />
                  <label
                    htmlFor="single"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Single
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="divorced"
                    value="divorced"
                    checked={maritalStatus.has("divorced")}
                    onChange={() => handleMaritalStatusChange("divorced")}
                  />
                  <label
                    htmlFor="divorced"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Divorced
                  </label>
                </div>

                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="widow"
                    value="widow"
                    checked={maritalStatus.has("widow")}
                    onChange={() => handleMaritalStatusChange("widow")}
                  />
                  <label
                    htmlFor="widow"
                    className="text-sm text-[#444] hover:cursor-pointer"
                  >
                    Widow/Widower
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Person With disablilty */}

          <div className="w-full flex flex-col gap-2">
            <label className="text-base font-semibold text-[#EF4D48] flex items-center justify-between w-full hover:cursor-pointer gap-1">
              Persons with Disabilities (Pwd)
            </label>
            <div className="flex gap-2 items-center ">
              <input
                type="checkbox"
                id="pwd"
                checked={pwd}
                onChange={handlePwdChange}
              />
              <label
                htmlFor="pwd"
                className="text-sm text-[#444] hover:cursor-pointer"
              >
                Pwd
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterSection;
