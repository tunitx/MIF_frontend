import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import indiaStates from "../../../utils/indiaStates";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const config = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJpbXRhODE5QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IldEZkxFV0hLSFVmLWNKVWI4QUV2UHlMZExqVC1uZS1YY2tDaGx2NjB5eU5xNVk0UmZJbHhNcEJQUmgzUUZuRllvdFUifSwiZXhwIjoxNzAxMTU5OTc5fQ.i_d_b3QLjzmuZkdDDBMRZvN4LebBgHXSPmtv-alKy3Y",
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
    // console.log(response.data);
  } catch (error) {
    console.error("Failed to get new token:", error);
  }
}
getNewToken();

function FranchiseDetails() {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);

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
      industry: "",
      sector: "",
      service: "",
      product: "",
      brandName: "",
      parentCompanyName: "",
      registrationNumber: "",
      certificate: null,
      about: "",
      termsAndConditions: "",
      brochure: null,
      contactPhone: "",
      contactEmail: "",
      contactWebsite: "",
      contactInstagram: "",
      contactFacebook: "",
      contactLinkedin: "",
      investmentRange: "",
      roi: "",
    },
    validationSchema: Yup.object({
      // Add your validation rules here
    }),
    onSubmit: async (values) => {
      const formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      console.log(values);
      return;
    },
  });

  const nextStep = () => {
    if (step === 1) {
      if (formik.values.industry && formik.values.sector) {
        setStep((prevStep) => prevStep + 1);
      } else {
        Swal.fire({
          width: 600,
          padding: "3em",
          background: "#fff url(/images/trees.png)",
          backdrop: `
                      rgba(0,0,123,0.4)
                      url("/images/nyan-cat.gif")
                      left top
                      no-repeat
                    `,
          icon: "error",
          title: "Oops...",

          text: "Please fill in all required fields before moving to the next step.",
        });
      }
    } else if (step === 2) {
      if (
        formik.values.brandName &&
        formik.values.parentCompanyName &&
        formik.values.registrationNumber
      ) {
        // setStep(step + 1);
        setStep((prevStep) => prevStep + 1);
      } else {
        Swal.fire({
          width: 600,
          padding: "3em",
          background: "#fff url(/images/trees.png)",
          backdrop: `
                      rgba(0,0,123,0.4)
                      url("/images/nyan-cat.gif")
                      left top
                      no-repeat
                    `,
          icon: "error",
          title: "Oops...",

          text: "Please fill in all required fields before moving to the next step.",
        });
      }
    } else if (step === 3) {
      if (
        formik.values.about &&
        formik.values.termsAndConditions &&
        formik.values.contactPhone &&
        formik.values.contactEmail &&
        formik.values.contactWebsite &&
        formik.values.contactInstagram &&
        formik.values.contactFacebook &&
        formik.values.contactLinkedin
      ) {
        // setStep(step + 1);
        setStep((prevStep) => prevStep + 1);
      } else {
        Swal.fire({
          width: 600,
          padding: "3em",
          background: "#fff url(/images/trees.png)",
          backdrop: `
                      rgba(0,0,123,0.4)
                      url("/images/nyan-cat.gif")
                      left top
                      no-repeat
                    `,
          icon: "error",
          title: "Oops...",

          text: "Please fill in all required fields before moving to the next step.",
        });
      }
    } else if (step === 4) {
      if (formik.values.investmentRange && formik.values.roi) {
        formik.handleSubmit();
      } else {
        Swal.fire({
          width: 600,
          padding: "3em",
          background: "#fff url(/images/trees.png)",
          backdrop: `
                      rgba(0,0,123,0.4)
                      url("/images/nyan-cat.gif")
                      left top
                      no-repeat
                    `,
          icon: "error",
          title: "Oops...",

          text: "Please fill in all required fields before moving to the next step.",
        });
      }
    }
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <>
        {step === 1 && (
          <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Nature of Business
            </h1>
            <>
              <div className="Sharma w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                <label
                  htmlFor="industry"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Industry:
                </label>
                <select
                  id="industry"
                  name="industry"
                  onChange={formik.handleChange}
                  value={formik.values.industry}
                >
                  <option value="">Select Industry</option>
                  <option value="Education">Education</option>
                  <option value="Energy">Energy</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Food and Beverage">Food and Beverage</option>
                  <option value="Government and Public Administration">
                    Government and Public Administration
                  </option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Information Technology (IT)">
                    Information Technology (IT)
                  </option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Media and Communications">
                    Media and Communications
                  </option>
                  <option value="Nonprofit and Social Services">
                    Nonprofit and Social Services
                  </option>
                </select>
              </div>

              <div className="Sharma w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                <label
                  htmlFor="sector"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Sector:
                </label>
                <select
                  id="sector"
                  name="sector"
                  onChange={formik.handleChange}
                  value={formik.values.sector}
                >
                  <option value="">Select Sector</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Banking and Finance">
                    Banking and Finance
                  </option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Information Technology (IT)">
                    Information Technology (IT)
                  </option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Retail">Retail</option>
                  <option value="Tourism and Hospitality">
                    Tourism and Hospitality
                  </option>
                </select>
              </div>
              <div className="Sharma w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                <label
                  htmlFor="product"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Select Product:
                </label>
                <select
                  id="product"
                  name="product"
                  onChange={formik.handleChange}
                  value={formik.values.product}
                >
                  <option value="">Select Product</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Home Appliances">Home Appliances</option>
                  <option value="Clothing and Apparel">
                    Clothing and Apparel
                  </option>
                  <option value="Beauty and Personal Care">
                    Beauty and Personal Care
                  </option>
                  <option value="Software Applications">
                    Software Applications
                  </option>
                  <option value="Hardware Products">Hardware Products</option>
                  <option value="Food and Beverages">Food and Beverages</option>
                  <option value="Health and Wellness Products">
                    Health and Wellness Products
                  </option>
                  <option value="Sporting Goods">Sporting Goods</option>
                </select>
              </div>
            </>
          </div>
        )}

        {step === 2 && (
          <>
            <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Business Details
              </h1>
              <div className="Sharma w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                <label
                  htmlFor="brandName"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Brand Name:
                </label>
                <input
                  id="brandName"
                  name="brandName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.brandName}
                />
              </div>

              <div className="Sharma w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                <label
                  htmlFor="parentCompanyName"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Parent Company Name:
                </label>
                <input
                  id="parentCompanyName"
                  name="parentCompanyName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.parentCompanyName}
                />
              </div>

              <div className="Sharma w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                <label
                  htmlFor="registrationNumber"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Registration Number:
                </label>
                <input
                  id="registrationNumber"
                  name="registrationNumber"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.registrationNumber}
                />
              </div>

              <div className="Sharma w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                <label
                  htmlFor="certificate"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Upload Certificate:
                </label>
                <input
                  id="certificate"
                  name="certificate"
                  type="file"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "certificate",
                      event.currentTarget.files[0]
                    );
                  }}
                />
              </div>
              <div className="Sharma w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                <label
                  htmlFor="headQuarterLocation"
                  className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                >
                  HeadQuarter Location* :
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
                  <option value="">Select HQ location</option>
                  <option value="india">India</option>
                  <option value="abroad">Abroad</option>
                </select>
              </div>

              {location && (
                <>
                  {location === "abroad" && (
                    <div className="w-full fade-in flex flex-col gap-3 sm:flex-row md:gap-8">
                      {/* Country */}

                      <div className="w-full flex gap-2 items-center justify-center">
                        <label
                          htmlFor="country"
                          className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                        >
                          Country* :
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
                          State* :
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
                            <option
                              key={state.state_name}
                              value={state.state_name}
                            >
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
                          City* :
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
                          State* :
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
                          City*
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
                </>
              )}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                {" "}
                Business Description{" "}
              </h1>
              <div className="w-full flex gap-2 items-center justify-center">
                <label
                  htmlFor="about"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  About:
                </label>
                <textarea
                  id="about"
                  name="about"
                  onChange={formik.handleChange}
                  value={formik.values.about}
                />
              </div>

              <div className="w-full flex gap-2 items-center justify-center">
                <label
                  htmlFor="termsAndConditions"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  T&C:
                </label>
                <textarea
                  id="termsAndConditions"
                  name="termsAndConditions"
                  onChange={formik.handleChange}
                  value={formik.values.termsAndConditions}
                />
              </div>

              <div className="w-full flex gap-2 items-center justify-center">
                <label
                  htmlFor="brochure"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Upload Brochure/Template:
                </label>
                <input
                  id="brochure"
                  name="brochure"
                  type="file"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "brochure",
                      event.currentTarget.files[0]
                    );
                  }}
                />
              </div>
              <div className="w-full flex gap-2 items-center justify-center">
                <label
                  htmlFor="contactPhone"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Phone:
                </label>
                <input
                  id="contactPhone"
                  name="contactPhone"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.contactPhone}
                />
              </div>
              <div className="w-full flex gap-2 items-center justify-center">
                <label
                  htmlFor="contactEmail"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Email:
                </label>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.contactEmail}
                />
              </div>
              <div className="w-full flex gap-2 items-center justify-center">
                <label
                  htmlFor="contactWebsite"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Website:
                </label>
                <input
                  id="contactWebsite"
                  name="contactWebsite"
                  type="url"
                  onChange={formik.handleChange}
                  value={formik.values.contactWebsite}
                />
              </div>
              <div className="w-full flex gap-2 items-center justify-center">
                <label
                  htmlFor="contactInstagram"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Instagram:
                </label>
                <input
                  id="contactInstagram"
                  name="contactInstagram"
                  type="url"
                  onChange={formik.handleChange}
                  value={formik.values.contactInstagram}
                />
              </div>
              <div className="w-full flex gap-2 items-center justify-center">
                <label
                  htmlFor="contactFacebook"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  Facebook:
                </label>
                <input
                  id="contactFacebook"
                  name="contactFacebook"
                  type="url"
                  onChange={formik.handleChange}
                  value={formik.values.contactFacebook}
                />
              </div>
              <div className="w-full flex gap-2 items-center justify-center">
                <label
                  htmlFor="contactLinkedin"
                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                >
                  LinkedIn:
                </label>
                <input
                  id="contactLinkedin"
                  name="contactLinkedin"
                  type="url"
                  onChange={formik.handleChange}
                  value={formik.values.contactLinkedin}
                />
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Investment Details
            </h1>
            <div className="w-full flex gap-2 items-center justify-center">
              <label
                htmlFor="investmentRange"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                Select Investment Range:
              </label>
              <select
                id="investmentRange"
                name="investmentRange"
                onChange={formik.handleChange}
                value={formik.values.investmentRange}
              >
                <option value="">Select Investment Range</option>
                <option value="Less than ₹50,000">Less than ₹50,000</option>
                <option value="₹50,000 - ₹2,50,000">₹50,000 - ₹2,50,000</option>
                <option value="₹2,50,001 - ₹5,00,000">
                  ₹2,50,001 - ₹5,00,000
                </option>
                <option value="₹5,00,001 - ₹25,00,000">
                  ₹5,00,001 - ₹25,00,000
                </option>
                <option value="₹25,00,001 - ₹50,00,000">
                  ₹25,00,001 - ₹50,00,000
                </option>
                <option value="₹50,00,001 - ₹1,00,00,000">
                  ₹50,00,001 - ₹1,00,00,000
                </option>
                <option value="₹1,00,00,001 - ₹5,00,00,000">
                  ₹1,00,00,001 - ₹5,00,00,000
                </option>
                <option value="₹5,00,00,001 - ₹10,00,00,000">
                  ₹5,00,00,001 - ₹10,00,00,000
                </option>
                <option value="₹10,00,00,001 - ₹50,00,00,000">
                  ₹10,00,00,001 - ₹50,00,00,000
                </option>
                <option value="More than ₹50,00,00,000">
                  More than ₹50,00,00,000
                </option>
              </select>
            </div>
            <div className="w-full flex gap-2 items-center justify-center">
              <label
                htmlFor="roi"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                ROI/Yield in %:
              </label>
              <input
                id="roi"
                name="roi"
                type="number"
                min="0"
                max="100"
                step="0.01"
                onChange={formik.handleChange}
                value={formik.values.roi}
              />
            </div>
          </div>
        )}
      </>

      <div className="w-full flex flex-col items-center justify-center sm:flex-row sm:justify-between gap-4">
        {step > 1 && (
          <div className={"w-full justify-center sm:justify-start flex"}>
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
              step === 1 ? "justify-center" : "sm:justify-end justify-center"
            }`}
          >
            <button
              onClick={nextStep}
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
            onClick={nextStep}
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}
export default FranchiseDetails;
