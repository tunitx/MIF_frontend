import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { Formik, Field, Form } from "formik";
import indiaStates from "../../../utils/indiaStates";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { equal } from "assert";
import { useNavigate } from "react-router-dom";

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
const RegistrationFormForMembership = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState(""); // Add this line
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [membershipTypes, setMembershipTypes] = useState([]);
  const formikRef = useRef();
  const [idProof, setIdProof] = useState(null);
  const [idProof2, setIdProof2] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);

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
    axios
      .get(`${BASE_URL}member/memberType/all`)
      .then((response) => {
        setMembershipTypes(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    location: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    // orgType: Yup.string().required('Required'),
    // ccpLocation: Yup.string().required('Required'),
    gender: Yup.string().required("Required"),
    membershipType: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    idProof: Yup.mixed().required("Required"),
    idProof2: Yup.mixed().required("Required"),
    // ccpState: Yup.string().required('Required'),
    // certification: Yup.mixed().required('Required'),
    consentCheckbox: Yup.bool().oneOf([true], "Must agree to something"),
    // email: Yup.string().email('Invalid email address').required('Required'),
    // idProof: Yup.mixed().required('Required'),
    occupation: Yup.string().required("Required"),
    // orgAddress: Yup.string().required('Required'),
    // orgPhoto: Yup.mixed().required('Required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Required"),
    photo: Yup.mixed().required("Required"),
  });

  return (
    <div className="w-full flex justify-center my-4">
      <Formik
        initialValues={{
          name: "",
          email: "",
          location: "",
          state: "",
          city: "",
          gender: "",
          membershipType: "",
          address: "",
          idProof: null,
          idProof2: null,
          consentCheckbox: true,
          designation: "",
          occupation: "",
          phoneNumber: "",
          photo: null,
        }}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnChange={false}
        validate={(values) => {
          let errors = {};
          try {
            validationSchema.validateSync(values, { abortEarly: false });
          } catch (err) {
            err.inner.forEach((error) => {
              errors[error.path] = error.message;
            });
            if (Object.keys(errors).length) {
              console.log(errors);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in all required fields correctly",
              });
            }
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            console.log(values);
            setIsSubmitting(true);

            const formData = new FormData();

            for (let key in values) {
              formData.append(key, values[key]);
            }

            const response = await fetch(`${BASE_URL}postMemberDetailsX`, {
              method: "POST",
              body: formData,
            });

            if (!response.ok) {
              setIsSubmitting(false);
              const data = await response.json();
              if (data.message === "member already exists") {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Member already exists, please enter unique Email address & Phone Number",
                });
              } else {
                console.error("Failed to submit form", response);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Failed to submit form",
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate("/");
                  }
                });
              }
            } else {
              setIsSubmitting(false);
              const data = await response.json();
              console.log("Form submitted successfully", data);
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Form submitted successfully",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/");
                }
              });
              //   navigate("/");
            }
          } catch (error) {
            setIsSubmitting(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Network error",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/");
              }
            });
          }
        }}
      >
        {(formik) => {
          formikRef.current = formik;
          return (
            <div
              className={`w-full max-w-7xl flex flex-col items-center justify-center p-5 border border-gray-500 rounded-md`}
              style={{ opacity: isSubmitting ? 0.5 : 1 }}
            >
              <Form>
                <div className="w-full fade-in gap-8 flex flex-col justify-center items-center ">
                  <h1 className="font-semibold text-lg font-Poppins tracking-wide sm:text-xl whitespace-nowrap text-[#444]">
                    Become a Member of MIF
                  </h1>
                  <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                    <label
                      htmlFor="name"
                      className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                    >
                      Name* :
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={(e) => {
                        let a = e.target.value;
                        a = a.replace(/\b\w/g, (match) => match.toUpperCase());
                        formik.setFieldValue("name", a);
                      }}
                      value={formik.values.name}
                      placeholder="Name"
                      className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    />
                    <label
                      htmlFor="gender"
                      className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                    >
                      Gender* :
                    </label>

                    <select
                      id="gender"
                      name="gender"
                      onChange={formik.handleChange}
                      value={formik.values.gender}
                      className="w-full sm:w-1/2 border rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <label
                      htmlFor="email"
                      className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                    >
                      Email* :
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      placeholder="Email"
                      className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    />
                  </div>
                  <div className="Sharma w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                    <label
                      htmlFor="location"
                      className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
                    >
                      Location* :
                    </label>

                    <div
                      className="flex gap-2 hover:cursor-pointer"
                      onChange={(e) => {
                        setLocation(e.target.value);
                        formik.setFieldValue("location", e.target.value);
                      }}
                    >
                      <label className="font-semibold hover:cursor-pointer text-sm font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]">
                        India
                      </label>
                      <input
                        type="radio"
                        value="india"
                        name="location"
                        className="hover:cursor-pointer"
                      />
                      <label className="font-semibold hover:cursor-pointer text-sm font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]">
                        Abroad
                      </label>
                      <input
                        type="radio"
                        value="abroad"
                        name="location"
                        className="hover:cursor-pointer"
                      />
                    </div>
                  </div>
                  {location && (
                    <div className="w-full flex flex-col sm:flex-row justify-center  gap-2 items-center">
                      <label
                        htmlFor="address"
                        className="font-semibold text-sm font-Poppins sm:w-fit self-start tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                      >
                        Address* :
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Address"
                        rows="3"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      />
                    </div>
                  )}
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
                              <option value="" disabled>
                                Select country
                              </option>
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
                              <option value="" disabled>
                                Select State
                              </option>
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
                              <option value="" disabled>
                                Select City
                              </option>
                              {cities.map((city) => (
                                <option
                                  key={city.city_name}
                                  value={city.city_name}
                                >
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
                              City* :
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
                  <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                    <label
                      htmlFor="phoneNumber"
                      className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                    >
                      Phone Number* :
                    </label>

                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="Phone Number"
                      onChange={formik.handleChange}
                      value={formik.values.phoneNumber}
                      className="w-full sm:w-1/2 border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm "
                    />

                    <label
                      htmlFor="membershipType"
                      className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left "
                    >
                      Membership Type* :
                    </label>

                    <select
                      id="membershipType"
                      name="membershipType"
                      onChange={formik.handleChange}
                      value={formik.values.membershipType}
                      className="w-full sm:w-1/2 border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm "
                    >
                      <option value="" disabled>
                        Select membership Type
                      </option>
                      {membershipTypes.map((type, index) => (
                        <option key={index} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full flex flex-col sm:flex-row gap-2 ">
                    <label
                      htmlFor="occupation"
                      className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                    >
                      Occupation* :
                    </label>

                    <input
                      id="occupation"
                      name="occupation"
                      type="text"
                      placeholder="Occupation"
                      onChange={formik.handleChange}
                      value={formik.values.occupation}
                      className="w-full sm:w-1/2 border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm "
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center min-h-fit w-full gap-8 mb-8 mt-8">
                    <div className="flex  justify-between items-center min-h-fit  w-full">
                      <div className="flex flex-col gap-2">
                        {/* Chief Contact Person Photo */}
                        <label
                          htmlFor="photo"
                          className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
                        >
                          Photo* :
                        </label>
                        <input
                          style={{ display: "none" }}
                          id="photo"
                          name="photo"
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            const maxSize = 5 * 1024 * 1024; // 5 MB

                            if (file.size > maxSize) {
                              Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "File is too large, please select a file less than 5MB.",
                              });
                              return;
                            }

                            formik.setFieldValue("photo", file);
                            setPhoto(file);
                          }}
                        />
                        <label
                          htmlFor="photo"
                          className="rounded-md bg-[#EF4D48] max-w-[250px] px-3 py-2 text-sm text-center font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Select File
                        </label>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Upload upto 5 MB in PDF, JPEG, PNG, Docs format only.
                        </p>
                      </div>
                      {photo ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="2rem"
                          viewBox="0 0 512 512"
                          // fill="#EF4D48"
                          className="fade-in fill-green-700"
                        >
                          {/*!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                        </svg>
                      ) : null}
                    </div>
                    <div className="flex  justify-between items-center min-h-fit  w-full">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="idProof"
                          className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
                        >
                          PAN Card*:
                        </label>
                        <input
                          style={{ display: "none" }}
                          id="idProof"
                          name="idProof"
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            const maxSize = 5 * 1024 * 1024; // 5 MB

                            if (file.size > maxSize) {
                              Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "File is too large, please select a file less than 5MB.",
                              });
                              return;
                            }

                            formik.setFieldValue("idProof", file);
                            setIdProof(file);
                          }}
                        />
                        <label
                          htmlFor="idProof"
                          className="rounded-md bg-[#EF4D48] max-w-[250px] px-3 py-2 text-sm text-center font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Select File
                        </label>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Upload upto 5 MB in PDF, JPEG, PNG, Docs format only.
                        </p>
                      </div>
                      {idProof ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="2rem"
                          viewBox="0 0 512 512"
                          // fill="#EF4D48"
                          className="fade-in fill-green-700"
                        >
                          {/*!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                        </svg>
                      ) : null}
                    </div>
                    <div className="flex  justify-between items-center min-h-fit  w-full">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="idProof"
                          className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
                        >
                          Aadhar Card* :
                        </label>
                        <input
                          style={{ display: "none" }}
                          id="idProof2"
                          name="idProof2"
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            const maxSize = 5 * 1024 * 1024; // 5 MB

                            if (file.size > maxSize) {
                              Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "File is too large, please select a file less than 5MB.",
                              });
                              return;
                            }

                            formik.setFieldValue("idProof2", file);
                            setIdProof2(file);
                          }}
                        />
                        <label
                          htmlFor="idProof2"
                          className="rounded-md bg-[#EF4D48] max-w-[250px] px-3 py-2 text-sm text-center font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Select File
                        </label>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Upload upto 5 MB in PDF, JPEG, PNG, Docs format only.
                        </p>
                      </div>
                      {idProof2 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="2rem"
                          viewBox="0 0 512 512"
                          // fill="#EF4D48"
                          className="fade-in fill-green-700"
                        >
                          {/*!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                        </svg>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex  justify-between items-center min-h-fit  w-full">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="idProof"
                        className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
                      >
                        Proof of Payment:
                      </label>
                      <input
                        style={{ display: "none" }}
                        id="paymentProof"
                        name="paymentProof"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "paymentProof",
                            event.currentTarget.files[0]
                          );
                          setPaymentProof(event.currentTarget.files[0]);
                        }}
                      />
                      <label
                        htmlFor="paymentProof"
                        className="rounded-md bg-[#EF4D48] max-w-[250px] px-3 py-2 text-sm text-center font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Select File
                      </label>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Upload upto 5 MB in PDF, JPEG, PNG, Docs format only.
                      </p>
                    </div>
                    {paymentProof ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="2rem"
                        viewBox="0 0 512 512"
                        // fill="#EF4D48"
                        className="fade-in fill-green-700"
                      >
                        {/*!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                      </svg>
                    ) : null}
                  </div>
                  <div className="w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                    <label
                      htmlFor="consentCheckbox"
                      className="font-semibold text-sm sm:text-base font-Poppins tracking-wide text-[#444] w-full sm:w-4/4"
                    >
                      <input
                        id="consentCheckbox"
                        name="consentCheckbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        value={formik.values.consentCheckbox}
                        className="mr-2"
                        defaultChecked
                      />
                      By submitting this form, I willingly authorize the Founder
                      General Secretary of the Marwadi International Federation
                      (MIF) to use my name and particulars for the records of
                      MIF and its office bearers list. I confirm my
                      understanding and acceptance of all the terms and
                      conditions set forth by MIF.
                      <br></br>
                      Furthermore, I recognize that the approval or rejection of
                      my membership in MIF is subject to the discretion of the
                      Founder General Secretary.
                    </label>
                  </div>
                  <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                    <label
                      htmlFor="orgName"
                      className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name"
                      autoComplete="off"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 ${
                      formik.values.consentCheckbox
                        ? "bg-[#EF4D48]"
                        : "bg-[#ccc]"
                    }`}
                    disabled={!formik.values.consentCheckbox}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={formik.resetForm}
                    className="group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#000080] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2"
                  >
                    Reset
                  </button>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};
export default RegistrationFormForMembership;
