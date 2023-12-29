import React, { useState, useEffect, useRef } from "react";
import {
  useFormik,
  Formik,
  FieldArray,
  Field,
  ErrorMessage,
  getIn,
} from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
// import bioData from "../../../utils/biodata";
import indiaStates from "../../../utils/indiaStates";
import Swal from "sweetalert2";
import { POST_BIODATA } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import MultiStepProgressBar from "./progressBar/MultiStepProgressBar";
import MatrimonyLoader from "../../../components/MatrimonyLoader";

import mifBride from "../../../../assests/images/mifBride.webp";
import mifGroom from "../../../../assests/images/mifGroom.webp";

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
let res = {};
function Registration() {
  const navigate = useNavigate();

  const formikRef = useRef();

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
  const [bioData, setBioData] = useState({});

  const [intermediateMarriageStatus, setIntermediateMarriageStatus] =
    useState(null);

  // TICKET ISSUE : 6

  const [currentAddressLocation, setCurrentAddressLocation] = useState("");
  const [currentAddressSelectedCountry, setCurrentAddressSelectedCountry] =
    useState("");
  const [currentAddressSelectedState, setCurrentAddressSelectedState] =
    useState("");
  const [currentAddressSelectedCity, setCurrentAddressSelectedCity] =
    useState("");

  // TICKET ISSUE : 8

  const [showImageInput, setShowImageInput] = useState(1);

  // TICKET ISSUE : 4
  const [casteInput, setCasteInput] = useState("");
  // const [currentAddressOption, setCurrentAddressOption] = useState("Different");
  const [foundGotra, setFoundGotra] = useState("");
  const [foundSubcaste, setFoundSubcaste] = useState("");
  const [foundCaste, setFoundCaste] = useState("");

  const [biodataFile, setBiodataFile] = useState(null);

  const [image1File, setImage1File] = useState(null);
  const [image2File, setImage2File] = useState(null);
  const [image3File, setImage3File] = useState(null);
  const [showPopup, setShowPopup] = useState(null);

  const [minDOB, setMinDOB] = useState("");

  const [showPaternal, setShowPaternal] = useState(false);
  const [showMaternal, setShowMaternal] = useState(false);

  const [validateFirstPhoneNumber, setValidateFirstPhonenumber] =
    useState(null);

  const [validateOverallPhoneNumbers, setValidateOverallPhoneNumbers] =
    useState(null);

  function phoneNumberValidator(numbers) {
    if (numbers[0].length === 0) {
      setValidateFirstPhonenumber("*Required");

      return false;
    } else if (numbers[0].toString().length !== 10) {
      setValidateFirstPhonenumber("*Number should of length 10");

      return false;
    }

    for (let i = 1; i < numbers.length; i++) {
      if (
        numbers[i].toString().length === 0 ||
        numbers[i].toString().length === 10
      ) {
      } else {
        setValidateOverallPhoneNumbers(
          "*Phone numbers from 2, are optional, so either left them empty, or enter a valid number of length 10"
        );
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) navigate("/matrimony");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);
  
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    const token = jwtToken;

    const headers = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['authorization'] = `Bearer ${token}`;
    }

    fetch(`${BASE_URL}getBiodata`, { headers })
      .then(response => response.json())
      .then(data => setBioData(data))
      .catch(error => console.log(error));
  }, []);



  const castes = Object.keys(bioData);
  const subcastes = bioData && caste && bioData[caste] ? Object.keys(bioData[caste]) : [];
  const gotras = bioData && caste && subcaste && bioData[caste] && bioData[caste][subcaste] ? bioData[caste][subcaste] : [];

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
    if (currentAddressLocation === "abroad") {
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
  }, [currentAddressLocation]);

  useEffect(() => {
    if (currentAddressSelectedCountry) {
      axios
        .get(
          `https://www.universal-tutorial.com/api/states/${currentAddressSelectedCountry}`,
          config
        )
        .then((response) => setStates(response.data));
    }
  }, [currentAddressSelectedCountry]);

  useEffect(() => {
    if (currentAddressSelectedState) {
      axios
        .get(
          `https://www.universal-tutorial.com/api/cities/${currentAddressSelectedState}`,
          config
        )
        .then((response) => setCities(response.data));
    }
  }, [currentAddressSelectedState]);

  useEffect(() => {
    if (location === "india") {
      setSelectedCountry("india");
      formikRef.current.setFieldValue("country", "india");
    }
  }, [location]);

  useEffect(() => {
    if (currentAddressLocation === "india") {
      setCurrentAddressSelectedCountry("india");
      formikRef.current.setFieldValue("currentAddressCountry", "india");
    }
  }, [currentAddressLocation]);

  useEffect(() => {
    if (foundGotra) {
      setGotra(foundGotra);
      formikRef.current.setFieldValue("gotra", foundGotra);
    }
  }, [foundGotra]);

  useEffect(() => {
    if (foundCaste) {
      setCaste(foundCaste);
      formikRef.current.setFieldValue("caste", foundCaste);
    }
  }, [foundCaste]);
  useEffect(() => {
    if (foundSubcaste) {
      setCaste(foundSubcaste);
      formikRef.current.setFieldValue("subcaste", foundSubcaste);
    }
  }, [foundCaste]);

  // function getGotra(surname) {
  //   let result = {};
  //   Object.entries(bioData.Baniya).forEach(([key, values]) => {
  //     if (
  //       values
  //         .map((value) => value.toLowerCase())
  //         .includes(surname.toLowerCase())

  //     ) {
  //       result = {
  //         caste: "Baniya",
  //         subcaste: key,
  //         surname: values
  //           .map((value) => value.toLowerCase())
  //           .find((value) => value.includes(surname.toLowerCase())),

  //       };
  //     }
  //   });
  //   console.log(result);
  //   res = result;
  //   return result;
  // }
  function getGotra(surname) {
    let result = {};
    Object.entries(bioData.Baniya).forEach(([key, values]) => {
      if (
        values
          .map((value) => value.toLowerCase())
          .includes(surname.toLowerCase())
      ) {
        const foundSurname = values
          .map((value) => value.toLowerCase())
          .find((value) => value.includes(surname.toLowerCase()));
        const capitalizedSurname =
          foundSurname.charAt(0).toUpperCase() + foundSurname.slice(1);
        result = {
          caste: "Baniya",
          subcaste: key,
          surname: capitalizedSurname,
        };
      }
    });
    return result;
  }
  const validationSchema = Yup.object().shape({
    gender: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    surname: Yup.string().required("Required"),
    caste: Yup.string().required("Required"),
    subcaste: Yup.string().required("Required"),
    gotra: Yup.string().required("Required"),
    dob: Yup.string().required("Required"),
    manglik: Yup.string().required("Required"),
    // placeOfBirth: Yup.string().required('Required'),
    // currentAddress: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    city: Yup.string().required("Required"),

    // TICKET ISSUE : 6

    // nativePlaceLocation: Yup.string().required("Required"),
    // nativePlaceCity: Yup.string().required("Required"),
    // nativePlaceState: Yup.string().required("Required"),
    // nativePlaceCurrentAddress: Yup.string().required("Required"),
    currentAddressLocation: Yup.string().required("Required"),
    currentAddressCity: Yup.string().required("Required"),
    currentAddressState: Yup.string().required("Required"),
    // currentAddressScope: Yup.string().required("Required"),
    heightFeet: Yup.string().required("Required"),
    complexion: Yup.string().required("Required"),
    education: Yup.string().required("Required"),
    occupation: Yup.string().required("Required"),
    incomeBracket: Yup.string().required("Required"),
    maritalStatus: Yup.string().required("Required"),
    pwd: Yup.string().required("Required"),
    image1: Yup.mixed().required("Required"),

    // TICKET ISSUE : 8

    // image2: Yup.mixed().required("Required"),

    // TICKET ISSUE : 11

    // phoneNumber1: Yup.string().required("Required"),
    phoneNumbers: Yup.array().of(Yup.string()).min(1),
    emails: Yup.array().of(Yup.string().email()).notRequired(),
    disabilityMeasure: Yup.string().when("pwd", {
      is: "no",
      then: (schema) => schema.trim(),
      otherwise: (schema) =>
        schema.trim().required("Disability measure is required"),
    }),

    // TICKET ISSUE : 11

    // phoneNumber2: Yup.string().required("Required"),
    // email: Yup.string().required("Required"),
    // image3: Yup.mixed().notRequired(),
  });

  const nextStep = (formik) => {
    if (step === 1) {
      if (formik.values.gender) {
        setStep((prevStep) => prevStep + 1);
      } else {
        // alert('Please fill in the gender field before moving to the next step.');
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
          text: "Please fill in the gender field before moving to the next step.",
        });
      }
    } else if (step === 2) {
      console.log(formik.errors);
      if (
        formik.values.firstName &&
        formik.values.surname &&
        formik.values.dob &&
        formik.values.manglik &&
        formik.values.caste &&
        formik.values.subcaste &&
        formik.values.gotra
      ) {
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
      console.log(formik.errors);
      if (formik.values.state && formik.values.city) {
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
      console.log(formik.errors);
      if (
        formik.values.currentAddressLocation &&
        formik.values.currentAddressState &&
        formik.values.currentAddressCity &&
        formik.values.currentAddressScope
      ) {
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
    } else if (step === 5) {
      setStep((prevStep) => prevStep + 1);
      // TICKET ISSUE : 6
      //   console.log(formik.errors);
      //   if (
      //     nativeAddressOption === "SameAsPlaceOfBirth" ||
      //     nativeAddressOption === "SameAsCurrentAddress" ||
      //     (formik.values.nativePlaceLocation &&
      //       formik.values.nativePlaceCurrentAddress &&
      //       formik.values.nativePlaceState &&
      //       formik.values.nativePlaceCity)
      //   ) {
      //     setStep((prevStep) => prevStep + 1);
      //   } else {
      //     console.log(formik.errors);
      //     Swal.fire({
      //       width: 600,
      //       padding: "3em",
      //       background: "#fff url(/images/trees.png)",
      //       backdrop: `
      //         rgba(0,0,123,0.4)
      //         url("/images/nyan-cat.gif")
      //         left top
      //         no-repeat
      //       `,
      //       icon: "error",
      //       title: "Oops...",
      //       text: "Please fill in all required fields before moving to the next step.",
      //     });
      //   }
    } else if (step === 6) {
      console.log(formik.errors);
      if (
        formik.values.heightFeet &&
        formik.values.complexion &&
        formik.values.education &&
        formik.values.occupation &&
        formik.values.incomeBracket &&
        formik.values.maritalStatus &&
        formik.values.pwd &&
        formik.values.image1 &&
        // TICKET ISSUE : 8

        // formik.values.image2 &&
        formik.values.phoneNumbers.length > 0 &&
        phoneNumberValidator(formik.values.phoneNumbers)
        // TICKET ISSUE : 11

        // formik.values.phoneNumber2 &&
        // formik.values.email
      ) {
        // formik.handleSubmit();
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
    } else if (step === 7) {
      setStep((prevStep) => prevStep + 1);
      // TICKET ISSUE : 6
      //   console.log(formik.errors);
      //   if (
      //     nativeAddressOption === "SameAsPlaceOfBirth" ||
      //     nativeAddressOption === "SameAsCurrentAddress" ||
      //     (formik.values.nativePlaceLocation &&
      //       formik.values.nativePlaceCurrentAddress &&
      //       formik.values.nativePlaceState &&
      //       formik.values.nativePlaceCity)
      //   ) {
      //     setStep((prevStep) => prevStep + 1);
      //   } else {
      //     console.log(formik.errors);
      //     Swal.fire({
      //       width: 600,
      //       padding: "3em",
      //       background: "#fff url(/images/trees.png)",
      //       backdrop: `
      //         rgba(0,0,123,0.4)
      //         url("/images/nyan-cat.gif")
      //         left top
      //         no-repeat
      //       `,
      //       icon: "error",
      //       title: "Oops...",
      //       text: "Please fill in all required fields before moving to the next step.",
      //     });
      //   }
    } else if (step === 8) {
      // TICKET ISSUE : 6
      //   console.log(formik.errors);
      //   if (
      //     nativeAddressOption === "SameAsPlaceOfBirth" ||
      //     nativeAddressOption === "SameAsCurrentAddress" ||
      //     (formik.values.nativePlaceLocation &&
      //       formik.values.nativePlaceCurrentAddress &&
      //       formik.values.nativePlaceState &&
      //       formik.values.nativePlaceCity)
      //   ) {
      //     setStep((prevStep) => prevStep + 1);
      //   } else {
      //     console.log(formik.errors);
      //     Swal.fire({
      //       width: 600,
      //       padding: "3em",
      //       background: "#fff url(/images/trees.png)",
      //       backdrop: `
      //         rgba(0,0,123,0.4)
      //         url("/images/nyan-cat.gif")
      //         left top
      //         no-repeat
      //       `,
      //       icon: "error",
      //       title: "Oops...",
      //       text: "Please fill in all required fields before moving to the next step.",
      //     });
      //   }
    } else {
      formik.validateForm().then((errors) => {
        if (Object.keys(errors).length === 0) {
          setStep((prevStep) => prevStep + 1);
        } else {
          console.log("yes");
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
      });
    }
  };

  const prevStep = (formik) => {
    setStep((prevStep) => prevStep - 1);
  };

  const ErrorMessagePhoneNumber = ({ name }) => (
    <Field
      name={name}
      render={({ form }) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return touch && error ? (
          <p className="mt-1 text-sm fade-in font-mono leading-6 text-[#EF4D48]">
            {error}
          </p>
        ) : null;
      }}
    />
  );

  return (
    <div className="w-full flex justify-center my-4">
      <Formik
        initialValues={{
          gender: "",
          firstName: "",
          surname: "",
          caste: caste,
          subcaste: subcaste,
          gotra: gotra,
          dob: "",
          manglik: "",
          placeOfBirth: "",
          // TICKET ISSUE : 4
          timeOfBirth: "",
          // currentAddress: "",
          location: location,
          country: selectedCountry,
          state: selectedState,
          city: selectedCity,
          preference: "",

          // TICKET ISSUE : 6

          nativePlace: "",
          nativeName: "",
          currentAddressLocation: "",
          currentAddressCountry: "",
          currentAddressCity: "",
          currentAddressState: "",
          currentAddressScope: "",
          heightFeet: "",
          complexion: "",
          education: "",
          occupation: "",
          incomeBracket: "",
          maritalStatus: "single",
          pwd: "no",
          file: null,
          image1: null,
          image2: null,
          image3: null,

          willingForInterCast: false,

          disabilityMeasure: "",
          hobbies: "",
          fatherName: "",
          fatherOccupation: "",
          fatherPhone: "",
          motherName: "",
          motherOccupation: "",
          motherPhone: "",
          paternalGrandFatherName: "",
          paternalGrandMotherName: "",
          maternalGrandFatherName: "",
          maternalGrandMotherName: "",
          reference1Phone: "",
          reference2Phone: "",
          reference1Name: "",
          reference2Name: "",

          // TICKET ISSUE : 11

          phoneNumbers: [""],
          emails: [""],
          siblings: [""],
          paternalUncleAunt: [""],
          paternalAunt_Bhua: [""],
          maternalUncleAunt: [""],
          maternalAunt_Mosi: [""],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const formData = new FormData();

          for (const key in values) {
            if (
              key === "file" ||
              key === "image1" ||
              key === "image2" ||
              key === "image3"
            ) {
              formData.append(key, values[key]);
            } else formData.append(key, JSON.stringify(values[key]));
          }

          for (let pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
          }

          console.log(values);

          // return;

          // return;
          const jwtToken = localStorage.getItem("jwtToken");

          let fetchOptions = {
            method: "POST",
            body: formData,
          };

          if (jwtToken) {
            fetchOptions.headers = {
              authorization: `Bearer ${jwtToken}`,
            };
          }

          try {
            const response = await fetch(POST_BIODATA, fetchOptions);

            setSubmitting(false);
            if (response.status === 200) {
              setShowPopup("success");
            } else if (response.status === 500) {
              setShowPopup("fail");
            }

            const data = await response.json();
            console.log(data);

            // navigate("/matrimony");
          } catch (error) {
            setSubmitting(false);
            console.error(error);
            setShowPopup("fail unknown");
          }
        }}
      >
        {(formik) => {
          formikRef.current = formik;
          return (
            <div
              className={`w-full  max-w-6xl flex flex-col  items-center justify-center p-5 `}
            >
              <MultiStepProgressBar page={step} />
              <form
                onSubmit={formik.handleSubmit}
                className={`w-full flex flex-col justify-center mt-10 items-center gap-16 max-w-4xl ${formik.isSubmitting ? "opacity-50" : ""
                  }`}
              >
                {step === 1 && (
                  <div className="w-full max-w-full flex flex-col justify-between items-center gap-14">
                    <p className=" fade-in w-full text-center font-Poppins text-lg sm:text-xl font-semibold text-[#333]">
                      Select :
                    </p>

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
                            setStep((s) => s + 1);
                            setMinDOB(() => {
                              const a = new Date(
                                new Date().getFullYear() - 21,
                                new Date().getMonth(),
                                new Date().getDay()
                              );
                              return a.toISOString().slice(0, 10);
                            });
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
                            setStep((s) => s + 1);
                            setMinDOB(() => {
                              const a = new Date(
                                new Date().getFullYear() - 18,
                                new Date().getMonth(),
                                new Date().getDay()
                              );
                              return a.toISOString().slice(0, 10);
                            });
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
                  <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
                    <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                      <label
                        htmlFor="firstName"
                        className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                      >
                        First Name* :
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={(e) => {
                          let a = e.target.value;
                          a = a.replace(/\b\w/g, (match) =>
                            match.toUpperCase()
                          );
                          formik.setFieldValue("firstName", a);
                        }}
                        value={formik.values.firstName}
                        placeholder="firstName"
                        className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      />
                    </div>

                    <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                      <label
                        htmlFor="surname"
                        className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                      >
                        Last Name* :
                      </label>
                      <input
                        id="surname"
                        name="surname"
                        type="text"
                        onChange={(e) => {
                          const capitalizedInput =
                            e.target.value.charAt(0).toUpperCase() +
                            e.target.value.slice(1);
                          e.target.value = capitalizedInput;

                          formik.handleChange(e);

                          if (e.target.value === "") {
                            setFoundCaste("");
                            setFoundGotra("");
                            setFoundSubcaste("");
                            setGotra("");
                            setCaste("");
                            setSubcaste("");
                          } else {
                            const val = getGotra(e.target.value);
                            console.log(val);
                            if (val) {
                              setFoundCaste(val.caste);
                              setFoundGotra(val.surname);
                              setFoundSubcaste(val.subcaste);
                              setGotra(val.surname);
                              setCaste(val.caste);
                              setSubcaste(val.subcaste);
                            }
                          }
                          // console.log("asdfds");
                        }}
                        placeholder="surname"
                        className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      />
                    </div>

                    {step === 2 && (
                      <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8">
                        {caste !== "Others" ? (
                          <>
                            {/* Caste Dropdown */}
                            <div className="w-full flex gap-2 items-center justify-center">
                              <label
                                htmlFor="caste"
                                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
                              >
                                CASTE* :
                              </label>
                              <select
                                id="caste"
                                name="caste"
                                onChange={(e) => {
                                  setCaste(e.target.value);
                                  if (e.target.value === "Others") {
                                    setCasteInput("");
                                  } else {
                                    setCasteInput(e.target.value);
                                  }
                                  formik.setFieldValue("caste", e.target.value);
                                }}
                                value={caste}
                                placeholder="Caste"
                                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                              >
                                <option value="" disabled>
                                  Select Caste
                                </option>
                                {foundCaste && (
                                  <option value={foundCaste}>
                                    {foundCaste}
                                  </option>
                                )}
                                {!foundCaste &&
                                  castes.map((c) => (
                                    <option key={c} value={c}>
                                      {c}
                                    </option>
                                  ))}

                                <option value="Others">Others</option>
                              </select>
                            </div>
                            {/* SubCaste Dropdown */}
                            <div className="w-full flex gap-2 items-center justify-center">
                              <label
                                htmlFor="subcaste"
                                className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                              >
                                SUBCASTE* :
                              </label>
                              <select
                                // disabled={caste === "" ? true : false}
                                id="subcaste"
                                name="subcaste"
                                onChange={(e) => {
                                  setSubcaste(e.target.value);
                                  formik.setFieldValue(
                                    "subcaste",
                                    e.target.value
                                  );
                                }}
                                value={subcaste}
                                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                              >
                                <option value="" disabled>
                                  Select Subcaste
                                </option>
                                {foundSubcaste && (
                                  <option value={foundSubcaste}>
                                    {foundSubcaste}
                                  </option>
                                )}
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
                                GOTRA* :
                              </label>
                              <select
                                // disabled={
                                //   caste === "" || subcaste?.length === 0 ? true : false
                                // }
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
                                  Select Gotra* :
                                </option>
                                {foundGotra && (
                                  <option value={gotra}>{gotra}</option>
                                )}
                                {gotras.map((g) => (
                                  <option key={g} value={g}>
                                    {g}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Caste Input */}
                            <div className="w-full flex gap-2 items-center justify-center">
                              <label
                                htmlFor="caste"
                                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
                              >
                                CASTE* :
                              </label>
                              <input
                                id="caste"
                                name="caste"
                                onChange={(e) => {
                                  setCasteInput(e.target.value);
                                  formik.setFieldValue("caste", e.target.value);
                                }}
                                value={casteInput}
                                placeholder="Caste"
                                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                              />
                            </div>

                            {/* SubCaste Input */}
                            <div className="w-full flex gap-2 items-center justify-center">
                              <label
                                htmlFor="subcaste"
                                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
                              >
                                SUBCASTE* :
                              </label>
                              <input
                                id="subcaste"
                                name="subcaste"
                                onChange={(e) => {
                                  setSubcaste(e.target.value);
                                  formik.setFieldValue(
                                    "subcaste",
                                    e.target.value
                                  );
                                }}
                                value={subcaste}
                                placeholder="Subcaste"
                                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                              />
                            </div>

                            {/* Gotra Input */}
                            <div className="w-full flex gap-2 items-center justify-center">
                              <label
                                htmlFor="gotra"
                                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
                              >
                                GOTRA* :
                              </label>
                              <input
                                id="gotra"
                                name="gotra"
                                onChange={(e) => {
                                  setGotra(e.target.value);
                                  formik.setFieldValue("gotra", e.target.value);
                                }}
                                value={gotra}
                                placeholder="Gotra"
                                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* DOB */}

                    <div className="w-full flex gap-2 flex-col items-center justify-center">
                      <div className="w-full flex gap-2 items-center justify-center">
                        <label
                          htmlFor="dob"
                          className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                        >
                          DATE OF BIRTH* :
                        </label>
                        <input
                          id="dob"
                          name="dob"
                          type="date"
                          max={minDOB}
                          onChange={formik.handleChange}
                          value={formik.values.dob}
                          placeholder=""
                          className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                        />
                      </div>
                      <p className="mt-1 text-sm leading-6 w-full text-start text-gray-600">
                        {`*Your DOB should be before or on ${minDOB}, as per legal age requirements.`}
                      </p>
                    </div>

                    {/* Manglik */}

                    <div className="w-full flex gap-2 items-center justify-center">
                      <fieldset className="w-full flex gap-4 items-center justify-start">
                        <p className="font-semibold text-sm font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]">
                          MANGLIK* :
                        </p>
                        <div className="flex sm:flex-row flex-col gap-2 sm:gap-4">
                          {/* No */}

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

                          {/* Anshik */}

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

                          {/* Yes */}

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
                        </div>
                      </fieldset>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
                    <div className="Sharma w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                      <label
                        htmlFor="placeOfBirth"
                        className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                      >
                        Place of Birth* :
                      </label>

                      <select
                        id="location"
                        name="location"
                        value={formik.values.location}
                        onChange={(e) => {
                          // setLocation("");
                          // formik.setFieldValue("country", "");
                          // setSelectedCountry("");
                          // formik.setFieldValue("state", "");
                          // setSelectedState("");
                          // formik.setFieldValue("city", "");
                          // setSelectedCity("");

                          setLocation(e.target.value);
                          // if (e.target.value === "india") {
                          //   setSelectedCountry("india");
                          //   formik.setFieldValue("country", "india");
                          // }
                          formik.setFieldValue("location", e.target.value);
                        }}
                        className="w-full sm:w-1/2 border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      >
                        <option value="" disabled>
                          Select Place of Birth
                        </option>
                        <option value="india">India</option>
                        <option value="abroad">Abroad</option>
                      </select>
                    </div>
                    {location && (
                      <>
                        {/* At Step : 3,  commented the textarea field of current Address. TICKET ISSUE : 4*/}

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
                                  formik.setFieldValue(
                                    "country",
                                    e.target.value
                                  );
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

                    {/* TICKET ISSUE : 4, Field for Time Of Birth (add it in the useFormik also) */}

                    <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                      <label
                        htmlFor="timeOfBirth"
                        className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                      >
                        Time of Birth :
                      </label>
                      <input
                        id="timeOfBirth"
                        name="timeOfBirth"
                        type="time"
                        onChange={formik.handleChange}
                        value={formik.values.timeOfBirth}
                        placeholder="Time of Birth"
                        className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      />
                    </div>
                  </div>
                )}
                {step === 5 && (
                  <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
                    {/* TICKET ISSUE : 6, changed Native Address to Native Place  */}

                    {/* Text Field for native place */}

                    <div className="w-full flex flex-col sm:flex-row justify-center  gap-2 items-center">
                      <label
                        htmlFor="nativePlace"
                        className="font-semibold text-sm font-Poppins sm:w-fit self-start tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                      >
                        Native Place :
                      </label>
                      <textarea
                        id="nativePlace"
                        name="nativePlace"
                        onChange={(e) => {
                          let a = e.target.value;
                          a = a.replace(/\b\w/g, (match) =>
                            match.toUpperCase()
                          );
                          formik.setFieldValue("nativePlace", a);
                        }}
                        value={formik.values.nativePlace}
                        placeholder="Native Place"
                        className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      />
                    </div>

                    {/* Native Name */}

                    <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                      <label
                        htmlFor="nativeName"
                        className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                      >
                        Native Name :
                      </label>
                      <input
                        id="nativeName"
                        name="nativeName"
                        type="text"
                        onChange={(e) => {
                          let a = e.target.value;
                          a = a.replace(/\b\w/g, (match) =>
                            match.toUpperCase()
                          );
                          formik.setFieldValue("nativeName", a);
                        }}
                        value={formik.values.nativeName}
                        placeholder="Native Name"
                        className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      />
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
                    {/* TICKET ISSUE : 5, changed current address to present address and removed the option of present address being same as birth address.*/}

                    <>
                      <div className="w-full flex gap-2 items-center justify-center sm:justify-start">
                        <label
                          htmlFor="currentAddressLocation"
                          className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] text-left"
                        >
                          Present Address* :
                        </label>
                        <select
                          id="currentAddressLocation"
                          name="currentAddressLocation"
                          onChange={(e) => {
                            setCurrentAddressLocation(e.target.value);
                            formik.setFieldValue("currentAddressCountry", "");
                            formik.setFieldValue("currentAddressState", "");
                            formik.setFieldValue("currentAddressCity", "");
                            formik.setFieldValue(
                              "currentAddressLocation",
                              e.target.value
                            );
                          }}
                          value={currentAddressLocation}
                          className="w-full sm:w-1/2 border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                        >
                          <option value="">Select Location</option>
                          <option value="india">India</option>
                          <option value="abroad">Abroad</option>
                        </select>
                      </div>

                      {currentAddressLocation && (
                        <>
                          {/* TICKET ISSUE : 5, removed the textarea, as did for birth place, see ticker issue 4 */}

                          <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                            <label
                              htmlFor="currentAddressScope"
                              className="font-semibold text-sm self-start font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                            >
                              Address* :
                            </label>
                            <textarea
                              id="currentAddressScope"
                              name="currentAddressScope"
                              type="text"
                              onChange={(e) => {
                                let a = e.target.value;
                                a = a.replace(/\b\w/g, (match) =>
                                  match.toUpperCase()
                                );
                                formik.setFieldValue("currentAddressScope", a);
                              }}
                              value={formik.values.currentAddressScope}
                              placeholder="Address"
                              className="grow border h-28 w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                            />
                          </div>
                          {currentAddressLocation === "abroad" && (
                            <div className="w-full fade-in flex flex-col gap-3 sm:flex-row md:gap-8">
                              {/* Country */}

                              <div className="w-full flex gap-2 items-center justify-center">
                                <label
                                  htmlFor="currentAddressCountry"
                                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                                >
                                  Country* :
                                </label>
                                <select
                                  id="currentAddressCountry"
                                  name="currentAddressCountry"
                                  onChange={(e) => {
                                    setCurrentAddressSelectedCountry(
                                      e.target.value
                                    );
                                    formik.setFieldValue(
                                      "currentAddressCountry",
                                      e.target.value
                                    );
                                  }}
                                  value={currentAddressSelectedCountry}
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
                                  htmlFor="currentAddressState"
                                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                                >
                                  State* :
                                </label>
                                <select
                                  id="currentAddressState"
                                  name="currentAddressState"
                                  onChange={(e) => {
                                    setCurrentAddressSelectedState(
                                      e.target.value
                                    );
                                    formik.setFieldValue(
                                      "currentAddressState",
                                      e.target.value
                                    );
                                  }}
                                  value={currentAddressSelectedState}
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
                                  htmlFor="currentAddressCity"
                                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                                >
                                  City* :
                                </label>
                                <select
                                  id="currentAddressCity"
                                  name="currentAddressCity"
                                  onChange={(e) => {
                                    setCurrentAddressSelectedCity(
                                      e.target.value
                                    );
                                    formik.setFieldValue(
                                      "currentAddressCity",
                                      e.target.value
                                    );
                                  }}
                                  value={currentAddressSelectedCity}
                                  className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                >
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

                          {currentAddressLocation === "india" && (
                            <div className="w-full fade-in flex flex-col gap-3 sm:flex-row md:gap-8">
                              {/* State */}
                              <div className="w-full flex gap-2 items-center justify-center">
                                <label
                                  htmlFor="currentAddressState"
                                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                                >
                                  State* :
                                </label>
                                <select
                                  id="currentAddressState"
                                  name="currentAddressState"
                                  onChange={(e) => {
                                    setCurrentAddressSelectedState(
                                      e.target.value
                                    );
                                    formik.setFieldValue(
                                      "currentAddressState",
                                      e.target.value
                                    );
                                  }}
                                  value={currentAddressSelectedState}
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
                                  htmlFor="currentAddressCity"
                                  className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                                >
                                  City* :
                                </label>
                                <select
                                  id="currentAddressCity"
                                  name="currentAddressCity"
                                  value={formik.values.currentAddressCity}
                                  onChange={(e) => {
                                    setCurrentAddressSelectedCity(
                                      e.target.value
                                    );
                                    formik.setFieldValue(
                                      "currentAddressCity",
                                      e.target.value
                                    );
                                  }}
                                  className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                >
                                  <option value="" disabled>
                                    Select a City
                                  </option>
                                  {currentAddressSelectedState &&
                                    indiaStates[
                                      currentAddressSelectedState
                                    ].map((district) => (
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
                    </>
                  </div>
                )}

                {step === 6 && (
                  <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
                    {/* Height And Complextion */}

                    <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8">
                      {/* Height */}

                      <div className="w-full flex gap-2 items-center justify-center">
                        <label
                          htmlFor="heightFeet"
                          className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                        >
                          Height (in feet)* :
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
                          Complexion* :
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
                          Education* :
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
                              Profession* :
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
                                Detail* :
                              </label>
                              <input
                                id="otherProfession"
                                name="otherProfession"
                                type="text"
                                onChange={(e) => {
                                  let a = e.target.value;
                                  a = a.replace(/\b\w/g, (match) =>
                                    match.toUpperCase()
                                  );
                                  formik.setFieldValue("otherProfession", a);
                                }}
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
                            Education Detail* :
                          </label>
                          <input
                            id="otherEducation"
                            name="otherEducation"
                            type="text"
                            onChange={(e) => {
                              let a = e.target.value;

                              const capitalizedValue =
                                a.charAt(0).toUpperCase() + a.slice(1);

                              formik.setFieldValue(
                                "otherEducation",
                                capitalizedValue
                              );
                            }}
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
                          Occupation* :
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
                          <option value="Service/Job">Service/Job</option>
                          <option value="Business">Business</option>
                          <option value="Self Employed">Self Employed</option>
                          <option value="Defence">Defence</option>
                          <option value="Not Working/Studying">
                            Not Working/Studying
                          </option>
                        </select>
                      </div>

                      {formik.values.occupation === "Service/Job" && (
                        <div className="w-full fade-in flex flex-col gap-3 sm:flex-row md:gap-8">
                          <div className="w-full fade-in flex gap-2 items-center justify-center">
                            <label
                              htmlFor="serviceType"
                              className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                            >
                              Service Type* :
                            </label>
                            <select
                              id="serviceType"
                              name="serviceType"
                              onChange={formik.handleChange}
                              value={formik.values.serviceType}
                              className="w-full  border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                            >
                              <option value="">Select Service Type</option>
                              <option value="Government/Semi-government">
                                Government/Semi-government
                              </option>
                              <option value="Corporate/MNC's/Private">
                                Corporate/MNC's/Private{" "}
                              </option>
                            </select>
                          </div>
                          {formik.values.serviceType && (
                            <div className="w-full fade-in flex gap-2 items-center justify-center">
                              {" "}
                              <label
                                htmlFor="serviceDetails"
                                className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                              >
                                Service Details*
                              </label>
                              <input
                                id="serviceDetails"
                                name="serviceDetails"
                                type="text"
                                onChange={(e) => {
                                  let a = e.target.value;

                                  const capitalizedValue =
                                    a.charAt(0).toUpperCase() + a.slice(1);

                                  formik.setFieldValue(
                                    "serviceDetails",
                                    capitalizedValue
                                  );
                                }}
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
                            Business Details* :
                          </label>
                          <input
                            id="businessDetails"
                            name="businessDetails"
                            type="text"
                            onChange={(e) => {
                              let a = e.target.value;

                              const capitalizedValue =
                                a.charAt(0).toUpperCase() + a.slice(1);

                              formik.setFieldValue(
                                "businessDetails",
                                capitalizedValue
                              );
                            }}
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
                            Self Employed Details* :
                          </label>
                          <input
                            id="selfEmployedDetails"
                            name="selfEmployedDetails"
                            type="text"
                            onChange={(e) => {
                              let a = e.target.value;

                              const capitalizedValue =
                                a.charAt(0).toUpperCase() + a.slice(1);

                              formik.setFieldValue(
                                "selfEmployedDetails",
                                capitalizedValue
                              );
                            }}
                            value={formik.values.selfEmployedDetails}
                            placeholder="Employement Details"
                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                          />
                        </div>
                      )}

                      {formik.values.occupation === "Defence" && (
                        <div className="w-full fade-in flex gap-2 items-center justify-center">
                          <label
                            htmlFor="defenceDetails"
                            className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                          >
                            Defence Details* :
                          </label>
                          <input
                            id="defenceDetails"
                            name="defenceDetails"
                            type="text"
                            onChange={(e) => {
                              let a = e.target.value;

                              const capitalizedValue =
                                a.charAt(0).toUpperCase() + a.slice(1);

                              formik.setFieldValue(
                                "defenceDetails",
                                capitalizedValue
                              );
                            }}
                            value={formik.values.defenceDetails}
                            placeholder="Defence Details"
                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                          />
                        </div>
                      )}

                      {formik.values.occupation === "Not Working/Studying" && (
                        <div className="w-full fade-in flex gap-2 items-center justify-center">
                          <label
                            htmlFor="notWorkingOrStudyingDetails"
                            className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                          >
                            Details* :
                          </label>
                          <input
                            id="notWorkingOrStudyingDetails"
                            name="notWorkingOrStudyingDetails"
                            type="text"
                            onChange={(e) => {
                              let a = e.target.value;

                              const capitalizedValue =
                                a.charAt(0).toUpperCase() + a.slice(1);

                              formik.setFieldValue(
                                "notWorkingOrStudyingDetails",
                                capitalizedValue
                              );
                            }}
                            value={formik.values.notWorkingOrStudyingDetails}
                            placeholder="Details"
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
                        Income Bracket* :
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
                        <option value="Less than 5 lakhs">
                          Less than 5 lakhs
                        </option>
                        <option value="5 - 10 lakhs">5 - 10 lakhs</option>
                        <option value="10 - 15 lakhs">10 - 15 lakhs</option>
                        <option value="15 - 20 lakhs">15 - 20 lakhs</option>
                        <option value="20 - 30 lakhs">20 - 30 lakhs</option>
                        <option value="30 - 40 lakhs">30 - 40 lakhs</option>
                        <option value="More than 40 lakhs">
                          More than 40 lakhs
                        </option>
                      </select>
                    </div>

                    {/* Preference */}

                    <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                      <label
                        htmlFor="preference"
                        className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                      >
                        Preferences (if any) :
                      </label>
                      <input
                        id="preference"
                        name="preference"
                        type="text"
                        onChange={(e) => {
                          let a = e.target.value;

                          const capitalizedValue =
                            a.charAt(0).toUpperCase() + a.slice(1);

                          formik.setFieldValue("preference", capitalizedValue);
                        }}
                        value={formik.values.preference}
                        placeholder="Preference"
                        className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      />
                    </div>

                    {/* Hobbies */}

                    <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                      <label
                        htmlFor="hobbies"
                        className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                      >
                        Hobbies :
                      </label>
                      <input
                        id="hobbies"
                        name="hobbies"
                        type="text"
                        onChange={(e) => {
                          let a = e.target.value;

                          const capitalizedValue =
                            a.charAt(0).toUpperCase() + a.slice(1);

                          formik.setFieldValue("hobbies", capitalizedValue);
                        }}
                        value={formik.values.hobbies}
                        placeholder="Hobbies"
                        className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      />
                    </div>

                    {/* Other Caste Checkbox */}

                    <div className="w-full flex gap-2 items-start justify-center">
                      <fieldset className="w-full flex gap-4 items-center justify-start">
                        <div className="flex gap-2 hover:cursor-pointer">
                          <input
                            type="checkbox"
                            name="willingForInterCast"
                            id="willingForInterCast"
                            checked={formik.values.willingForInterCast}
                            onChange={() => {
                              formik.setFieldValue(
                                "willingForInterCast",
                                !formik.values.willingForInterCast
                              );
                            }}
                          />
                          <label
                            htmlFor="willingForInterCast"
                            className="font-semibold text-sm hover:cursor-pointer font-Poppins self-start tracking-wide sm:text-base sm:whitespace-nowrap  text-[#444]"
                          >
                            Are you willing to explore matches
                            outside your caste?
                          </label>{" "}
                        </div>
                      </fieldset>
                    </div>

                    {/* Marital Status And Pwd */}

                    <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8">
                      {/* Marital Status */}

                      <div className="w-full flex gap-2 items-start justify-center">
                        <fieldset className="w-full flex gap-4 items-center justify-start">
                          <p className="font-semibold text-sm font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]">
                            Marital Status* :
                          </p>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2 hover:cursor-pointer">
                              <input
                                id="single"
                                name="maritalStatus"
                                type="radio"
                                value="single"
                                onChange={() => {
                                  formik.setFieldValue(
                                    "maritalStatus",
                                    "single"
                                  );
                                  setIntermediateMarriageStatus(null);
                                }}
                                checked={
                                  formik.values.maritalStatus === "single"
                                }
                                className="hover:cursor-pointer"
                              />
                              <label
                                htmlFor="single"
                                className="font-semibold text-sm hover:cursor-pointer font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]"
                              >
                                Single
                              </label>
                            </div>

                            {/* Married */}

                            {intermediateMarriageStatus === null && (
                              <div className="flex gap-2 fade-in hover:cursor-pointer">
                                <input
                                  id="married"
                                  name="maritalStatus"
                                  type="radio"
                                  value="married"
                                  onChange={() => {
                                    setIntermediateMarriageStatus("married");
                                  }}
                                  checked={
                                    // formik.values.maritalStatus === "married"
                                    intermediateMarriageStatus === "married"
                                  }
                                  className="hover:cursor-pointer"
                                />
                                <label
                                  htmlFor="married"
                                  className="font-semibold text-sm hover:cursor-pointer font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]"
                                >
                                  Married
                                </label>
                              </div>
                            )}

                            {intermediateMarriageStatus === "married" && (
                              <>
                                <div className="flex gap-2 fade-in hover:cursor-pointer">
                                  <input
                                    id="divorced"
                                    name="maritalStatus"
                                    type="radio"
                                    value="divorced"
                                    onChange={formik.handleChange}
                                    checked={
                                      formik.values.maritalStatus === "divorced"
                                    }
                                    className="hover:cursor-pointer"
                                  />
                                  <label
                                    htmlFor="divorced"
                                    className="font-semibold text-sm hover:cursor-pointer font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]"
                                  >
                                    Divorced
                                  </label>
                                </div>
                                <div className="flex gap-2 fade-in hover:cursor-pointer">
                                  <input
                                    id="widow"
                                    name="maritalStatus"
                                    type="radio"
                                    value="widow"
                                    onChange={formik.handleChange}
                                    checked={
                                      formik.values.maritalStatus === "widow"
                                    }
                                    className="hover:cursor-pointer"
                                  />
                                  <label
                                    htmlFor="widow"
                                    className="font-semibold text-sm hover:cursor-pointer font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]"
                                  >
                                    Widow/Widower
                                  </label>
                                </div>
                              </>
                            )}
                          </div>
                        </fieldset>
                      </div>

                      {/* Pwd */}

                      <div className="w-full flex gap-2 items-start justify-center">
                        {" "}
                        <fieldset className="w-full flex gap-4 items-center justify-start">
                          <p className="font-semibold text-sm font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]">
                            Person with Disability* :
                          </p>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2 hover:cursor-pointer">
                              <input
                                id="pwd-no"
                                name="pwd"
                                type="radio"
                                value="no"
                                onChange={() => {
                                  formik.setFieldValue("pwd", "no");
                                  formik.setFieldValue("disabilityMeasure", "");
                                }}
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

                            {formik.values.pwd === "yes" && (
                              <div className="flex gap-2 hover:cursor-pointer">
                                <input
                                  name="disabilityMeasure"
                                  type="text"
                                  value={formik.values.disabilityMeasure}
                                  onChange={formik.handleChange}
                                  placeholder="Specify"
                                  className="grow border fade-in w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                />
                              </div>
                            )}
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    {/* File Upload */}

                    <div className="flex  justify-between items-center min-h-fit  w-full">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="file"
                          className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                        >
                          Upload Biodata :
                        </label>
                        <input
                          style={{
                            display: "none",
                          }}
                          id="file"
                          name="file"
                          type="file"
                          // TICKET ISSUE : 7

                          accept=".png, .jpeg, .pdf, .doc, .docx"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "file",
                              event.currentTarget.files[0]
                            );
                            setBiodataFile(event.currentTarget.files[0]);
                          }}
                        />
                        <label
                          htmlFor="file"
                          className="rounded-md bg-[#EF4D48] max-w-[250px] px-3 py-2 text-sm text-center font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Select File
                        </label>

                        {/* TICKET ISSUE : 7 */}

                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Upload upto 5 MB in PDF, JPEG, PNG format only.
                        </p>
                      </div>
                      {biodataFile ? (
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

                    {/* Image Upload */}

                    <div className="w-full flex flex-col gap-4">
                      {/* Image 1 */}

                      <div className="flex  justify-between items-center min-h-fit  w-full">
                        <div className=" flex flex-col">
                          <div className="flex flex-row items-center gap-2">
                            <label
                              htmlFor="image1"
                              className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                            >
                              Upload Image 1* :
                            </label>
                            <input
                              style={{
                                display: "none",
                              }}
                              id="image1"
                              name="image1"
                              type="file"
                              // TICKET ISSUE : 8

                              accept="image/png, image/jpeg, image/webp"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "image1",
                                  event.currentTarget.files[0]
                                );
                                setImage1File(event.currentTarget.files[0]);
                              }}
                            />
                            <label
                              htmlFor="image1"
                              className="rounded-md bg-[#EF4D48] px-8 py-2 text-sm text-center font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Select File
                            </label>
                          </div>
                          {/* TICKET ISSUE : 8 */}

                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Upload upto 5 MB in JPEG, PNG format only.
                          </p>
                        </div>
                        {image1File ? (
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

                      {/* Image 2 */}

                      {showImageInput >= 2 && (
                        <div className="flex  fade-in justify-between items-center min-h-fit  w-full">
                          <div className="flex flex-col">
                            <div className="flex flex-row items-center gap-2">
                              <label
                                htmlFor="image2"
                                className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                              >
                                Upload Image 2 :
                              </label>
                              <input
                                style={{
                                  display: "none",
                                }}
                                id="image2"
                                name="image2"
                                type="file"
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    "image2",
                                    event.currentTarget.files[0]
                                  );
                                  setImage2File(event.currentTarget.files[0]);
                                }}
                              />
                              <label
                                htmlFor="image2"
                                className="rounded-md bg-[#EF4D48] px-8 py-2 text-sm text-center font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Select File
                              </label>
                            </div>
                            {/* TICKET ISSUE : 8 */}

                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              Upload upto 5 MB in JPEG, PNG format only.
                            </p>
                          </div>
                          {image2File ? (
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
                      )}

                      {/* Image 3 */}

                      {showImageInput >= 3 && (
                        <div className="flex fade-in justify-between items-center min-h-fit  w-full">
                          <div className="flex flex-col">
                            <div className="flex flex-row items-center gap-2">
                              <label
                                htmlFor="image3"
                                className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                              >
                                Upload Image 3:
                              </label>
                              <input
                                style={{
                                  display: "none",
                                }}
                                id="image3"
                                name="image3"
                                type="file"
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    "image3",
                                    event.currentTarget.files[0]
                                  );
                                  setImage3File(event.currentTarget.files[0]);
                                }}
                              />
                              <label
                                htmlFor="image3"
                                className="rounded-md bg-[#EF4D48] px-8 py-2 text-sm text-center font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Select File
                              </label>
                            </div>
                            {/* TICKET ISSUE : 8 */}

                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              Upload upto 5 MB in JPEG, PNG format only.
                            </p>
                          </div>
                          {image3File ? (
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
                      )}

                      {/* TICKET ISSUE : 8 */}

                      {showImageInput < 3 && (
                        <div className={`w-full justify-start flex`}>
                          <button
                            onClick={() => {
                              setShowImageInput((s) => s + 1);
                            }}
                            type="button"
                            className="group flex w-full items-center gap-2 justify-center max-w-[100px] rounded-md bg-[#EF4D48] px-2 py-2 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
                          >
                            <p className=" transition duration-150 delay-150">
                              Add more
                            </p>{" "}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Phone Number */}

                    <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8">
                      <div className="w-full flex gap-2 flex-col items-center justify-center">
                        {/* TICKET ISSUE : 11 */}

                        <label
                          htmlFor="phoneNumbers"
                          className="font-semibold w-full text-left text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                        >
                          Phone Number* :
                        </label>

                        <FieldArray
                          name="phoneNumbers"
                          render={(arrayHelpers) => (
                            <div className="w-full flex flex-col gap-3">
                              <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:justify-start items-start">
                                {formik.values.phoneNumbers &&
                                  formik.values.phoneNumbers.map(
                                    (number, index) => (
                                      <div className="w-full flex flex-col max-w-sm">
                                        <div
                                          key={index}
                                          className="w-full max-w-sm flex flex-row justify-center gap-2 items-center"
                                        >
                                          <label className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left">
                                            {index + 1} :
                                          </label>
                                          <input
                                            name={`phoneNumbers.${index}`}
                                            type="number"
                                            onChange={formik.handleChange}
                                            value={
                                              formik.values.phoneNumbers[index]
                                            }
                                            placeholder="123-456-7890"
                                            className="grow border fade-in w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                          />
                                        </div>
                                        {index === 0 &&
                                          validateFirstPhoneNumber ? (
                                          <p className="mt-1 fade-in text-sm fade-in font-mono leading-6 text-[#EF4D48]">
                                            {validateFirstPhoneNumber}
                                          </p>
                                        ) : null}
                                      </div>
                                    )
                                  )}
                              </div>

                              {/* <ErrorMessage
                  name="phoneNumbers"
                  className="mt-1 text-sm fade-in font-mono leading-6 text-[#EF4D48]"
                  component="p"
                /> */}

                              {validateOverallPhoneNumbers ? (
                                <p className="mt-1 fade-in text-sm fade-in font-mono leading-6 text-[#EF4D48]">
                                  {validateOverallPhoneNumbers}
                                </p>
                              ) : null}

                              {/* <div className="w-full justify-center sm:justify-start flex"> */}
                              <button
                                onClick={() => arrayHelpers.push("")}
                                type="button"
                                className="group flex w-full items-center gap-2 justify-center max-w-[100px] rounded-md bg-[#EF4D48] px-2 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2"
                              >
                                {/* <p className="transition duration-150 delay-150"> */}
                                Add more
                                {/* </p> */}
                              </button>
                              {/* </div> */}
                            </div>
                          )}
                        />
                      </div>
                    </div>

                    {/* Email */}

                    <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8">
                      <div className="w-full flex gap-2 flex-col items-center justify-center">
                        <label
                          htmlFor="emails"
                          className="font-semibold w-full text-left text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                        >
                          Email :
                        </label>

                        <FieldArray
                          name="emails"
                          render={(arrayHelpers) => (
                            <div className="w-full flex flex-col gap-3">
                              <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:justify-start items-center">
                                {formik.values.emails &&
                                  formik.values.emails.map((email, index) => (
                                    <div
                                      key={index}
                                      className=" w-full max-w-sm"
                                    >
                                      <input
                                        name={`emails.${index}`}
                                        type="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.emails[index]}
                                        placeholder="abc@xyz.com"
                                        className="grow border fade-in w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                      />
                                      {/* <Field name={`phoneNumbers.${index}`} /> */}
                                    </div>
                                  ))}
                              </div>

                              {/* <div className="w-full justify-center sm:justify-start flex"> */}
                              <button
                                onClick={() => arrayHelpers.push("")}
                                type="button"
                                className="group flex w-full items-center gap-2 justify-center max-w-[100px] rounded-md bg-[#EF4D48] px-2 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2"
                              >
                                {/* <p className="transition duration-150 delay-150"> */}
                                Add more
                                {/* </p> */}
                              </button>
                              {/* </div> */}
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Family Details */}

                {step === 7 && (
                  <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
                    {/* Father  */}

                    <div className="w-full fade-in gap-3 flex flex-col justify-center items-center">
                      {/* Father Name */}

                      <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                        <label
                          htmlFor="fatherName"
                          className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                        >
                          Father's Name :
                        </label>
                        <input
                          id="fatherName"
                          name="fatherName"
                          type="text"
                          onChange={(e) => {
                            let a = e.target.value;
                            a = a.replace(/\b\w/g, (match) =>
                              match.toUpperCase()
                            );
                            formik.setFieldValue("fatherName", a);
                          }}
                          value={formik.values.fatherName}
                          placeholder="Name"
                          className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                        />
                      </div>

                      {/* Father Occupation and Phone Number */}

                      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3">
                        {/* Father Occupation */}

                        <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                          <label
                            htmlFor="fatherOccupation"
                            className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                          >
                            Father's Occupation :
                          </label>
                          <input
                            id="fatherOccupation"
                            name="fatherOccupation"
                            type="text"
                            onChange={(e) => {
                              let a = e.target.value;
                              a = a.replace(/\b\w/g, (match) =>
                                match.toUpperCase()
                              );
                              formik.setFieldValue("fatherOccupation", a);
                            }}
                            value={formik.values.fatherOccupation}
                            placeholder="Occupation"
                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                          />
                        </div>

                        {/* Father Phone */}

                        <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                          <label
                            htmlFor="fatherPhone"
                            className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                          >
                            Phone :
                          </label>
                          <input
                            id="fatherPhone"
                            name="fatherPhone"
                            type="number"
                            onChange={(e) => {
                              let a = e.target.value;
                              // a = a.replace(/\b\w/g, (match) =>
                              //   match.toUpperCase()
                              // );
                              formik.setFieldValue("fatherPhone", a);
                            }}
                            value={formik.values.fatherPhone}
                            placeholder="Phone Number"
                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mother */}

                    <div className="w-full fade-in gap-3 flex flex-col justify-center items-center">
                      {/* Mother Name */}

                      <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                        <label
                          htmlFor="motherName"
                          className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                        >
                          Mother's Name :
                        </label>
                        <input
                          id="motherName"
                          name="motherName"
                          type="text"
                          onChange={(e) => {
                            let a = e.target.value;
                            a = a.replace(/\b\w/g, (match) =>
                              match.toUpperCase()
                            );
                            formik.setFieldValue("motherName", a);
                          }}
                          value={formik.values.motherName}
                          placeholder="Name"
                          className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                        />
                      </div>

                      {/* Mother Occupation and Phone Number */}

                      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3">
                        {/* Mother Occupation */}

                        <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                          <label
                            htmlFor="motherOccupation"
                            className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                          >
                            Mother's Occupation :
                          </label>
                          <input
                            id="motherOccupation"
                            name="motherOccupation"
                            type="text"
                            onChange={(e) => {
                              let a = e.target.value;
                              a = a.replace(/\b\w/g, (match) =>
                                match.toUpperCase()
                              );
                              formik.setFieldValue("motherOccupation", a);
                            }}
                            value={formik.values.motherOccupation}
                            placeholder="Occupation"
                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                          />
                        </div>

                        {/* Mother Phone */}

                        <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                          <label
                            htmlFor="motherPhone"
                            className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                          >
                            Phone :
                          </label>
                          <input
                            id="motherPhone"
                            name="motherPhone"
                            type="number"
                            onChange={(e) => {
                              let a = e.target.value;
                              // a = a.replace(/\b\w/g, (match) =>
                              //   match.toUpperCase()
                              // );
                              formik.setFieldValue("motherPhone", a);
                            }}
                            value={formik.values.motherPhone}
                            placeholder="Phone Number"
                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sibling-Spouse */}

                    <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8">
                      <div className="w-full flex gap-2 flex-col items-center justify-center">
                        <label
                          htmlFor="siblings"
                          className="font-semibold w-full text-left text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                        >
                          Siblings :
                        </label>

                        <FieldArray
                          name="siblings"
                          render={(arrayHelpers) => (
                            <div className="w-full flex flex-col gap-3">
                              <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:justify-start items-center">
                                {formik.values.siblings &&
                                  formik.values.siblings.map((email, index) => (
                                    <div
                                      key={index}
                                      className=" w-full max-w-sm"
                                    >
                                      <input
                                        name={`siblings.${index}`}
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.siblings[index]}
                                        placeholder="sibling-spouse (if any)"
                                        className="grow border fade-in w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                      />
                                      {/* <Field name={`phoneNumbers.${index}`} /> */}
                                    </div>
                                  ))}
                              </div>

                              {/* <div className="w-full justify-center sm:justify-start flex"> */}
                              {formik.values.siblings.length < 3 && (
                                <button
                                  onClick={() => arrayHelpers.push("")}
                                  type="button"
                                  className="group flex w-full items-center gap-2 justify-center max-w-[100px] rounded-md bg-[#EF4D48] px-2 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2"
                                >
                                  {/* <p className="transition duration-150 delay-150"> */}
                                  Add more
                                  {/* </p> */}
                                </button>
                              )}
                              {/* </div> */}
                            </div>
                          )}
                        />
                      </div>
                    </div>

                    {/* Paternal Family */}

                    <div className="w-full flex flex-col gap-5   md:gap-8">
                      <p
                        className="w-full text-center hover:cursor-pointer flex gap-3 font-Poppins text-sm items-center font-semibold text-[#EF4D48]"
                        onClick={() => {
                          setShowPaternal((p) => !p);
                        }}
                      >
                        <span>Paternal Family</span>{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1rem"
                          className="fill-[#EF4D48]"
                          viewBox="0 0 448 512"
                        >
                          {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                      </p>

                      {showPaternal && (
                        <div className="w-full flex flex-col fade-in  justify-center items-center gap-3">
                          {/* Paternal GrandParent */}

                          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3">
                            {/* Paternal GrandFather Name */}

                            <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                              <label
                                htmlFor="paternalGrandFatherName"
                                className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                              >
                                GrandFather's Name :
                              </label>
                              <input
                                id="paternalGrandFatherName"
                                name="paternalGrandFatherName"
                                type="text"
                                onChange={(e) => {
                                  let a = e.target.value;
                                  a = a.replace(/\b\w/g, (match) =>
                                    match.toUpperCase()
                                  );
                                  formik.setFieldValue(
                                    "paternalGrandFatherName",
                                    a
                                  );
                                }}
                                value={formik.values.paternalGrandFatherName}
                                placeholder="Name"
                                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                              />
                            </div>

                            {/* Paternal GrandMother Name */}

                            <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                              <label
                                htmlFor="paternalGrandMotherName"
                                className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                              >
                                GrandMother's Name :
                              </label>
                              <input
                                id="paternalGrandMotherName"
                                name="paternalGrandMotherName"
                                type="text"
                                onChange={(e) => {
                                  let a = e.target.value;
                                  // a = a.replace(/\b\w/g, (match) =>
                                  //   match.toUpperCase()
                                  // );
                                  formik.setFieldValue(
                                    "paternalGrandMotherName",
                                    a
                                  );
                                }}
                                value={formik.values.paternalGrandMotherName}
                                placeholder="Name"
                                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                              />
                            </div>
                          </div>

                          {/* Paternal Uncle-Aunt */}

                          <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8">
                            <div className="w-full flex gap-2 flex-col items-center justify-center">
                              <label
                                htmlFor="paternalUncleAunt"
                                className="font-semibold w-full text-left text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                              >
                                Uncle-Aunt (Tauji-Taiji/Chachaji-Chachiji) :
                              </label>

                              <FieldArray
                                name="paternalUncleAunt"
                                render={(arrayHelpers) => (
                                  <div className="w-full flex flex-col gap-3">
                                    <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:justify-start items-center">
                                      {formik.values.paternalUncleAunt &&
                                        formik.values.paternalUncleAunt.map(
                                          (email, index) => (
                                            <div
                                              key={index}
                                              className=" w-full max-w-sm"
                                            >
                                              <input
                                                name={`paternalUncleAunt.${index}`}
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={
                                                  formik.values
                                                    .paternalUncleAunt[index]
                                                }
                                                placeholder="Uncle-Aunt"
                                                className="grow border fade-in w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                              />
                                              {/* <Field name={`phoneNumbers.${index}`} /> */}
                                            </div>
                                          )
                                        )}
                                    </div>

                                    {/* <div className="w-full justify-center sm:justify-start flex"> */}
                                    {/* {formik.values.paternalUncleAunt.length <
                                      3 && ( */}
                                    <button
                                      onClick={() => arrayHelpers.push("")}
                                      type="button"
                                      className="group flex w-full items-center gap-2 justify-center max-w-[100px] rounded-md bg-[#EF4D48] px-2 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2"
                                    >
                                      {/* <p className="transition duration-150 delay-150"> */}
                                      Add more
                                      {/* </p> */}
                                    </button>
                                    {/* )} */}
                                    {/* </div> */}
                                  </div>
                                )}
                              />
                            </div>
                          </div>

                          {/* Paternal Aunt (bhua)*/}

                          <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8">
                            <div className="w-full flex gap-2 flex-col items-center justify-center">
                              <label
                                htmlFor="paternalAunt_Bhua"
                                className="font-semibold w-full text-left text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                              >
                                Aunt (Bhuaji) :
                              </label>

                              <FieldArray
                                name="paternalAunt_Bhua"
                                render={(arrayHelpers) => (
                                  <div className="w-full flex flex-col gap-3">
                                    <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:justify-start items-center">
                                      {formik.values.paternalAunt_Bhua &&
                                        formik.values.paternalAunt_Bhua.map(
                                          (email, index) => (
                                            <div
                                              key={index}
                                              className=" w-full max-w-sm"
                                            >
                                              <input
                                                name={`paternalAunt_Bhua.${index}`}
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={
                                                  formik.values
                                                    .paternalAunt_Bhua[index]
                                                }
                                                placeholder="Aunt"
                                                className="grow border fade-in w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                              />
                                              {/* <Field name={`phoneNumbers.${index}`} /> */}
                                            </div>
                                          )
                                        )}
                                    </div>

                                    {/* <div className="w-full justify-center sm:justify-start flex"> */}
                                    {/* {formik.values.paternalUncleAunt.length <
                                      3 && ( */}
                                    <button
                                      onClick={() => arrayHelpers.push("")}
                                      type="button"
                                      className="group flex w-full items-center gap-2 justify-center max-w-[100px] rounded-md bg-[#EF4D48] px-2 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2"
                                    >
                                      {/* <p className="transition duration-150 delay-150"> */}
                                      Add more
                                      {/* </p> */}
                                    </button>
                                    {/* )} */}
                                    {/* </div> */}
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Maternal Family */}

                    <div className="w-full flex flex-col gap-5  md:gap-8">
                      <p
                        className="w-full text-center hover:cursor-pointer flex gap-3 font-Poppins text-sm items-center font-semibold text-[#EF4D48]"
                        onClick={() => {
                          setShowMaternal((p) => !p);
                        }}
                      >
                        <span> Maternal Family</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1rem"
                          className="fill-[#EF4D48]"
                          viewBox="0 0 448 512"
                        >
                          {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                      </p>

                      {showMaternal && (
                        <div className="w-full flex flex-col  justify-center items-center gap-3">
                          {/* Maternal GrandParent */}

                          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3">
                            {/* Maternal GrandFather Name */}

                            <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                              <label
                                htmlFor="maternalGrandFatherName"
                                className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                              >
                                GrandFather's Name :
                              </label>
                              <input
                                id="maternalGrandFatherName"
                                name="maternalGrandFatherName"
                                type="text"
                                onChange={(e) => {
                                  let a = e.target.value;
                                  a = a.replace(/\b\w/g, (match) =>
                                    match.toUpperCase()
                                  );
                                  formik.setFieldValue(
                                    "maternalGrandFatherName",
                                    a
                                  );
                                }}
                                value={formik.values.maternalGrandFatherName}
                                placeholder="Name"
                                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                              />
                            </div>

                            {/* Maternal GrandMother Name */}

                            <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                              <label
                                htmlFor="maternalGrandMotherName"
                                className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                              >
                                GrandMother's Name :
                              </label>
                              <input
                                id="maternalGrandMotherName"
                                name="maternalGrandMotherName"
                                type="text"
                                onChange={(e) => {
                                  let a = e.target.value;
                                  // a = a.replace(/\b\w/g, (match) =>
                                  //   match.toUpperCase()
                                  // );
                                  formik.setFieldValue(
                                    "maternalGrandMotherName",
                                    a
                                  );
                                }}
                                value={formik.values.maternalGrandMotherName}
                                placeholder="Name"
                                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                              />
                            </div>
                          </div>

                          {/* Maternal Uncle-Aunt */}

                          <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8">
                            <div className="w-full flex gap-2 flex-col items-center justify-center">
                              <label
                                htmlFor="maternalUncleAunt"
                                className="font-semibold w-full text-left text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                              >
                                Uncle-Aunt (Mamaji-Mamiji) :
                              </label>

                              <FieldArray
                                name="maternalUncleAunt"
                                render={(arrayHelpers) => (
                                  <div className="w-full flex flex-col gap-3">
                                    <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:justify-start items-center">
                                      {formik.values.maternalUncleAunt &&
                                        formik.values.maternalUncleAunt.map(
                                          (email, index) => (
                                            <div
                                              key={index}
                                              className=" w-full max-w-sm"
                                            >
                                              <input
                                                name={`maternalUncleAunt.${index}`}
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={
                                                  formik.values
                                                    .maternalUncleAunt[index]
                                                }
                                                placeholder="Uncle-Aunt"
                                                className="grow border fade-in w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                              />
                                              {/* <Field name={`phoneNumbers.${index}`} /> */}
                                            </div>
                                          )
                                        )}
                                    </div>

                                    {/* <div className="w-full justify-center sm:justify-start flex"> */}
                                    {/* {formik.values.maternalUncleAunt.length <
                                      3 && ( */}
                                    <button
                                      onClick={() => arrayHelpers.push("")}
                                      type="button"
                                      className="group flex w-full items-center gap-2 justify-center max-w-[100px] rounded-md bg-[#EF4D48] px-2 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2"
                                    >
                                      {/* <p className="transition duration-150 delay-150"> */}
                                      Add more
                                      {/* </p> */}
                                    </button>
                                    {/* )} */}
                                    {/* </div> */}
                                  </div>
                                )}
                              />
                            </div>
                          </div>

                          {/* Maternal Aunt (Mosi) */}

                          <div className="w-full flex flex-col gap-3 sm:flex-row md:gap-8">
                            <div className="w-full flex gap-2 flex-col items-center justify-center">
                              <label
                                htmlFor="maternalAunt_Mosi"
                                className="font-semibold w-full text-left text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                              >
                                Aunt (Mosiji) :
                              </label>

                              <FieldArray
                                name="maternalAunt_Mosi"
                                render={(arrayHelpers) => (
                                  <div className="w-full flex flex-col gap-3">
                                    <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:justify-start items-center">
                                      {formik.values.maternalAunt_Mosi &&
                                        formik.values.maternalAunt_Mosi.map(
                                          (email, index) => (
                                            <div
                                              key={index}
                                              className=" w-full max-w-sm"
                                            >
                                              <input
                                                name={`maternalAunt_Mosi.${index}`}
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={
                                                  formik.values
                                                    .maternalAunt_Mosi[index]
                                                }
                                                placeholder="Uncle-Aunt"
                                                className="grow border fade-in w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                              />
                                              {/* <Field name={`phoneNumbers.${index}`} /> */}
                                            </div>
                                          )
                                        )}
                                    </div>

                                    {/* <div className="w-full justify-center sm:justify-start flex"> */}
                                    {/* {formik.values.maternalUncleAunt.length <
                                      3 && ( */}
                                    <button
                                      onClick={() => arrayHelpers.push("")}
                                      type="button"
                                      className="group flex w-full items-center gap-2 justify-center max-w-[100px] rounded-md bg-[#EF4D48] px-2 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2"
                                    >
                                      {/* <p className="transition duration-150 delay-150"> */}
                                      Add more
                                      {/* </p> */}
                                    </button>
                                    {/* )} */}
                                    {/* </div> */}
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Refrence */}

                {step === 8 && (
                  <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
                    {/* Reference 1 */}

                    <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3">
                      {/* Name */}

                      <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                        <label
                          htmlFor="reference1Name"
                          className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                        >
                          Reference 1 :
                        </label>
                        <input
                          id="reference1Name"
                          name="reference1Name"
                          type="text"
                          onChange={(e) => {
                            let a = e.target.value;
                            a = a.replace(/\b\w/g, (match) =>
                              match.toUpperCase()
                            );
                            formik.setFieldValue("reference1Name", a);
                          }}
                          value={formik.values.reference1Name}
                          placeholder="Name"
                          className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                        />
                      </div>

                      {/* Phone */}

                      <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                        <label
                          htmlFor="reference1Phone"
                          className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                        >
                          Phone :
                        </label>
                        <input
                          id="reference1Phone"
                          name="reference1Phone"
                          type="number"
                          onChange={(e) => {
                            let a = e.target.value;
                            // a = a.replace(/\b\w/g, (match) =>
                            //   match.toUpperCase()
                            // );
                            formik.setFieldValue("reference1Phone", a);
                          }}
                          value={formik.values.reference1Phone}
                          placeholder="Phone Number"
                          className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                        />
                      </div>
                    </div>

                    {/* Reference 2 */}

                    <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3">
                      {/* Name */}

                      <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                        <label
                          htmlFor="reference2Name"
                          className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                        >
                          Reference 2 :
                        </label>
                        <input
                          id="reference2Name"
                          name="reference2Name"
                          type="text"
                          onChange={(e) => {
                            let a = e.target.value;
                            a = a.replace(/\b\w/g, (match) =>
                              match.toUpperCase()
                            );
                            formik.setFieldValue("reference2Name", a);
                          }}
                          value={formik.values.reference2Name}
                          placeholder="Name"
                          className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                        />
                      </div>

                      {/* Phone */}

                      <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                        <label
                          htmlFor="reference2Phone"
                          className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                        >
                          Phone :
                        </label>
                        <input
                          id="reference2Phone"
                          name="reference2Phone"
                          type="number"
                          onChange={(e) => {
                            let a = e.target.value;
                            // a = a.replace(/\b\w/g, (match) =>
                            //   match.toUpperCase()
                            // );
                            formik.setFieldValue("reference2Phone", a);
                          }}
                          value={formik.values.reference2Phone}
                          placeholder="Phone Number"
                          className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                        />
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
                          prevStep(formik);
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
                  {step < 8 && step > 1 && (
                    <div
                      className={`w-full  flex ${step === 1
                          ? "justify-center"
                          : "sm:justify-end justify-center"
                        }`}
                    >
                      <button
                        onClick={() => {
                          nextStep(formik);
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

                  {step === 8 && (
                    <button
                      type="submit"
                      className="group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
                      onClick={() => {
                        nextStep(formik);
                      }}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>

              <div>
                {showPopup === null ? null : showPopup === "success" ? (
                  <Popup
                    message={"Your Details have been saved successfully."}
                    redirect={"/"}
                    buttontext={"Okay"}
                  />
                ) : (
                  <Popup
                    message={"Unexpected error occurred, please try again..."}
                    redirect={"/matrimony"}
                    buttontext={"Try Again"}
                  />
                )}
              </div>
              {formik.isSubmitting ? <MatrimonyLoader /> : null}
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Registration;
