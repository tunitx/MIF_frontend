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
import bioData from "../../../utils/biodata";
import indiaStates from "../../../utils/indiaStates";
import Swal from "sweetalert2";
import { POST_BIODATA } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import MultiStepProgressBar from "./progressBar/MultiStepProgressBar";

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

  const [intermediateMarriageStatus, setIntermediateMarriageStatus] =
    useState(null);

  // TICKET ISSUE : 6

  // const [nativePlaceLocation, setNativePlaceLocation] = useState("");
  // const [nativePlaceSelectedCountry, setNativePlaceSelectedCountry] =
  //   useState("");
  // const [nativePlaceSelectedState, setNativePlaceSelectedState] = useState("");
  // const [nativePlaceSelectedCity, setNativePlaceSelectedCity] = useState("");
  // const [nativeAddressOption, setNativeAddressOption] = useState("Different");
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
        numbers[i].toString().lenght === 10
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
    window.scrollTo(0, 0);
  }, [step]);

  const castes = Object.keys(bioData);
  const subcastes =
    bioData && caste && bioData[caste] ? Object.keys(bioData[caste]) : [];
  const gotras =
    bioData && caste && subcaste && bioData[caste] && bioData[caste][subcaste]
      ? bioData[caste][subcaste]
      : [];

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

  // useEffect(() => {
  //   if (nativePlaceLocation === "abroad") {
  //     axios
  //       .get("https://www.universal-tutorial.com/api/countries", config)
  //       .then((response) => {
  //         console.log(response.data);
  //         setCountries(response.data);
  //       })
  //       .catch((error) => {
  //         console.log("Error fetching countries: ", error);
  //       });
  //   }
  // }, [nativePlaceLocation]);

  // useEffect(() => {
  //   if (nativePlaceSelectedCountry) {
  //     axios
  //       .get(
  //         `https://www.universal-tutorial.com/api/states/${nativePlaceSelectedCountry}`,
  //         config
  //       )
  //       .then((response) => setStates(response.data));
  //   }
  // }, [nativePlaceSelectedCountry]);

  // useEffect(() => {
  //   if (nativePlaceSelectedState) {
  //     axios
  //       .get(
  //         `https://www.universal-tutorial.com/api/cities/${nativePlaceSelectedState}`,
  //         config
  //       )
  //       .then((response) => setCities(response.data));
  //   }
  // }, [nativePlaceSelectedState]);

  // useEffect(() => {
  //   if (nativePlaceLocation === "india") {
  //     setNativePlaceSelectedCountry("india");
  //     formik.setFieldValue("nativePlaceCountry", "india");
  //   }
  // }, [nativePlaceLocation]);

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

  function getGotra(surname) {
    let result = {};
    Object.entries(bioData.baniya).forEach(([key, values]) => {
      if (
        values
          .map((value) => value.toLowerCase())
          .includes(surname.toLowerCase())
      ) {
        result = {
          caste: "baniya",
          subcaste: key,
          surname: values
            .map((value) => value.toLowerCase())
            .find((value) => value.includes(surname.toLowerCase())),
        };
      }
    });
    console.log(result);
    res = result;
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
    file: Yup.mixed().required("Required"),
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
        formik.values.currentAddressCity
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
        formik.values.file &&
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
          maternalUncleAunt: [""],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const formData = new FormData();

          for (const key in values) {
            formData.append(key, values[key]);
          }

          for (let pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
          }

          console.log(values);

          // return;

          try {
            const response = await fetch(POST_BIODATA, {
              method: "POST",
              body: formData,
            });

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
              className={`w-full  max-w-6xl flex flex-col  items-center justify-center p-5 ${
                formik.isSubmitting ? "opacity-50" : ""
              }`}
            >
              <MultiStepProgressBar page={step} />
              <form
                onSubmit={formik.handleSubmit}
                className="w-full flex flex-col justify-center mt-10 items-center gap-16 max-w-4xl"
              >
                {step === 1 && (
                  <div className="w-full max-w-full flex flex-col justify-between items-center gap-14">
                    <p className=" fade-in w-full text-center font-Poppins text-lg sm:text-xl font-semibold text-[#333]">
                      CHOOSE YOUR GENDER* :
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
                        value={formik.values.surname}
                        onChange={(e) => {
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

                        {/* <div className="CurrentAddressTushar w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                    <label
                      htmlFor="currentAddress"
                      className="font-semibold text-sm self-start font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                    >
                      Current Address* :
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
                  </div> */}

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

                    {/* <div className="w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                <label
                  htmlFor="nativeAddressOption"
                  className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                >
                  Native Address* :
                </label>
                <select
                  id="nativeAddressOption"
                  name="nativeAddressOption"
                  onChange={(e) => {
                    setNativeAddressOption(e.target.value);
                    if (e.target.value === "SameAsCurrentAddress") {
                      formik.values.nativePlaceLocation =
                        formik.values.currentAddressLocation;
                      formik.values.nativePlaceCountry =
                        formik.values.currentAddressCountry;
                      formik.values.nativePlaceState =
                        formik.values.currentAddressState;
                      formik.values.nativePlaceCity =
                        formik.values.currentAddressCity;
                      formik.values.nativePlaceCurrentAddress =
                        formik.values.currentAddressScope;
                    } else if (e.target.value === "SameAsPlaceOfBirth") {
                      formik.values.nativePlaceLocation =
                        formik.values.location;
                      formik.values.nativePlaceCountry = formik.values.country;
                      formik.values.nativePlaceState = formik.values.state;
                      formik.values.nativePlaceCity = formik.values.city;
                      formik.values.nativePlaceCurrentAddress =
                        formik.values.currentAddress;
                    }
                  }}
                  value={nativeAddressOption}
                  className="w-full sm:w-1/2 border rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                >
                  <option value="Different">Different</option>
                  <option value="SameAsPlaceOfBirth">
                    Same as Place of Birth
                  </option>
                  <option value="SameAsCurrentAddress">
                    Same as Current Address
                  </option>
                </select>
              </div> */}

                    {/* {nativeAddressOption === "Different" && (
                <>
                  <div className="w-full flex gap-2 items-center justify-center sm:justify-start">
                    <label
                      htmlFor="nativePlaceLocation"
                      className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] text-left"
                    >
                      Address* :
                    </label>
                    <select
                      id="nativePlaceLocation"
                      name="nativePlaceLocation"
                      value={formik.values.nativePlaceLocation}
                      onChange={(e) => {
                        setNativePlaceLocation(e.target.value);
                        formik.setFieldValue(
                          "nativePlaceLocation",
                          e.target.value
                        );
                      }}
                      className="w-full sm:w-1/2 border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    >
                      <option value="">Select Location</option>
                      <option value="india">India</option>
                      <option value="abroad">Abroad</option>
                    </select>
                  </div> */}

                    {/* {nativePlaceLocation && (
                    <>
                      <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                        <label
                          htmlFor="nativePlaceCurrentAddress"
                          className="font-semibold text-sm self-start font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                        >
                          Current Address at Native Place* :
                        </label>
                        <textarea
                          id="nativePlaceCurrentAddress"
                          name="nativePlaceCurrentAddress"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.nativePlaceCurrentAddress}
                          placeholder="Address"
                          className="grow border h-28 w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                        />
                      </div> */}

                    {/* {nativePlaceLocation === "abroad" && (
                        <div className="w-full fade-in flex flex-col gap-3 sm:flex-row md:gap-8"> */}
                    {/* Country */}

                    {/* <div className="w-full flex gap-2 items-center justify-center">
                            <label
                              htmlFor="nativePlaceCountry"
                              className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                            >
                              Country* :
                            </label>
                            <select
                              id="nativePlaceCountry"
                              name="nativePlaceCountry"
                              onChange={(e) => {
                                setNativePlaceSelectedCountry(e.target.value);
                                formik.setFieldValue(
                                  "nativePlaceCountry",
                                  e.target.value
                                );
                              }}
                              value={nativePlaceSelectedCountry}
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
                          </div> */}

                    {/* State */}

                    {/* <div className="w-full flex gap-2 items-center justify-center">
                            <label
                              htmlFor="nativePlaceState"
                              className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                            >
                              State* :
                            </label>
                            <select
                              id="nativePlaceState"
                              name="nativePlaceState"
                              onChange={(e) => {
                                setNativePlaceSelectedState(e.target.value);
                                formik.setFieldValue(
                                  "nativePlaceState",
                                  e.target.value
                                );
                              }}
                              value={nativePlaceSelectedState}
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
                          </div> */}

                    {/* City */}
                    {/* 
                          <div className="w-full flex gap-2 items-center justify-center">
                            <label
                              htmlFor="nativePlaceCity"
                              className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                            >
                              City* :
                            </label>
                            <select
                              id="nativePlaceCity"
                              name="nativePlaceCity"
                              onChange={(e) => {
                                setNativePlaceSelectedCity(e.target.value);
                                formik.setFieldValue(
                                  "nativePlaceCity",
                                  e.target.value
                                );
                              }}
                              value={nativePlaceSelectedCity}
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
                          </div> */}
                    {/* </div>
                      )} */}

                    {/* {nativePlaceLocation === "india" && (
                        <div className="w-full fade-in flex flex-col gap-3 sm:flex-row md:gap-8"> */}
                    {/* State */}
                    {/* <div className="w-full flex gap-2 items-center justify-center">
                            <label
                              htmlFor="nativePlaceState"
                              className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                            >
                              State* :
                            </label>
                            <select
                              id="nativePlaceState"
                              name="nativePlaceState"
                              onChange={(e) => {
                                setNativePlaceSelectedState(e.target.value);
                                formik.setFieldValue(
                                  "nativePlaceState",
                                  e.target.value
                                );
                              }}
                              value={formik.values.nativePlaceState}
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
                          </div> */}

                    {/* City */}
                    {/* <div className="w-full flex gap-2 items-center justify-center">
                            <label
                              htmlFor="nativePlaceCity"
                              className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                            >
                              City*
                            </label>
                            <select
                              id="nativePlaceCity"
                              name="nativePlaceCity"
                              value={formik.values.nativePlaceCity}
                              onChange={(e) => {
                                setNativePlaceSelectedCity(e.target.value);
                                formik.setFieldValue(
                                  "nativePlaceCity",
                                  e.target.value
                                );
                              }}
                              className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                            >
                              <option value="" disabled>
                                Select a City
                              </option>
                              {nativePlaceSelectedState &&
                                indiaStates[nativePlaceSelectedState].map(
                                  (district) => (
                                    <option key={district} value={district}>
                                      {district}
                                    </option>
                                  )
                                )}
                            </select>
                          </div> */}
                    {/* </div>
                      )}
                    </>
                  )}
                </>
              )}*/}
                  </div>
                )}
                {step === 4 && (
                  <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">
                    {/* <div className="w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                <label
                  htmlFor="currentAddressOption"
                  className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                >
                  Present Address* :
                </label>
                <select
                  id="nativeAddressOption"
                  name="nativeAddressOption"
                  onChange={(e) => {
                    setCurrentAddressOption(e.target.value);

                    if (e.target.value === "SameAsPlaceOfBirth") {
                      formik.values.currentAddressLocation =
                        formik.values.location;
                      formik.values.currentAddressCountry =
                        formik.values.country;
                      formik.values.currentAddressState = formik.values.state;
                      formik.values.currentAddressCity = formik.values.city;
                      formik.values.currentAddressScope =
                        formik.values.currentAddress;
                    }
                  }}
                  value={currentAddressOption}
                  className="w-full sm:w-1/2 border rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                >
                  <option value="Different">Different</option>
                  <option value="SameAsPlaceOfBirth">
                    Same as Place of Birth
                  </option>
                </select>
              </div> */}

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
                                  // value={formik.values.currentAddressCity}
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
                          <option value="Service">Service/Job</option>
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
                              <option value="Government">
                                Government/Semi-government
                              </option>
                              <option value="Private">
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
                            className="font-semibold text-sm hover:cursor-pointer font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]"
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

                            {/* Divorced */}

                            {/* <div className="flex gap-2 hover:cursor-pointer">
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
                            </div> */}

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
                          Upload Biodata* :
                        </label>
                        <input
                          style={{
                            display: "none",
                          }}
                          id="file"
                          name="file"
                          type="file"
                          // TICKET ISSUE : 7

                          accept=".png, .jpeg, .pdf"
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
                          className="rounded-md bg-[#EF4D48] px-3 py-2 text-sm text-center font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

                              accept="image/png, image/jpeg"
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
                        <div
                          className={`w-full justify-center sm:justify-start flex`}
                        >
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
                                          className="w-full max-w-sm flex flex-col sm:flex-row justify-center gap-2 items-center"
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

                        {/* <label
                    htmlFor="phoneNumber1"
                    className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                  >
                    Phone Number 1* :
                  </label> */}
                        {/* <input
                    id="phoneNumber1"
                    name="phoneNumber1"
                    type="tel"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber1}
                    placeholder="123-456-7890"
                    className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                  /> */}
                      </div>

                      {/* Phone Number 2 */}

                      {/* <div className="w-full flex gap-2 items-center justify-center">
                  <label
                    htmlFor="phoneNumber2"
                    className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                  >
                    Phone Number 2 :
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
                </div> */}
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

                        {/* <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                      /> */}
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

                    <div className="w-full flex flex-col gap-5 border border-indigo-700 rounded-md p-5 md:gap-8">
                      <p className="w-full text-center font-Poppins text-sm font-semibold text-[#EF4D48]">
                        Paternal Family
                      </p>

                      <div className="w-full flex flex-col  justify-center items-center gap-3">
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
                              Uncle-Aunt :
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
                                                formik.values.paternalUncleAunt[
                                                  index
                                                ]
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
                                  {formik.values.paternalUncleAunt.length <
                                    3 && (
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
                      </div>
                    </div>

                    {/* Maternal Family */}

                    <div className="w-full flex flex-col gap-5 border border-indigo-700 rounded-md p-5 md:gap-8">
                      <p className="w-full text-center  font-Poppins text-sm font-semibold text-[#EF4D48]">
                        Maternal Family
                      </p>

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
                              Uncle-Aunt :
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
                                                formik.values.maternalUncleAunt[
                                                  index
                                                ]
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
                                  {formik.values.maternalUncleAunt.length <
                                    3 && (
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
                      </div>
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
                      className={`w-full  flex ${
                        step === 1
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
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Registration;
