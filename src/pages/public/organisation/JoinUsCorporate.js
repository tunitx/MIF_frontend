import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/constants';
import { Formik, Field, Form } from 'formik';
import indiaStates from '../../../utils/indiaStates';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

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


const RegistrationForm = () => {
    const [location, setLocation] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState(''); // Add this line
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const formikRef = useRef();
    const [orgPhoto, setOrgPhoto] = useState(null);
    const [certification, setCertification] = useState(null);
    const [idProof, setIdProof] = useState(null);
    const [selectedCountryCcp, setSelectedCountryCcp] = useState('');
    const [selectedStateCcp, setSelectedStateCcp] = useState('');
    const [selectedCityCcp, setSelectedCityCcp] = useState('');
    const [countriesCcp, setCountriesCcp] = useState([]);
    const [statesCcp, setStatesCcp] = useState([]);
    const [citiesCcp, setCitiesCcp] = useState([]);
    const [ccpLocation, setCcpLocation] = useState('');
    const [photo, setPhoto] = useState('');
    const [ccpIdProof, setCCPIdProof] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // const [idProof, setIdProof] = useState('');

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
        if (ccpLocation === "abroad") {
            axios
                .get("https://www.universal-tutorial.com/api/countries", config)
                .then((response) => {
                    console.log(response.data);
                    setCountriesCcp(response.data);
                })
                .catch((error) => {
                    console.log("Error fetching countries: ", error);
                });
        }
    }, [ccpLocation]);

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
        if (selectedCountryCcp) {
            axios
                .get(
                    `https://www.universal-tutorial.com/api/states/${selectedCountryCcp}`,
                    config
                )
                .then((response) => setStatesCcp(response.data));
        }
    }, [selectedCountryCcp]);

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
        if (selectedStateCcp) {
            axios
                .get(
                    `https://www.universal-tutorial.com/api/cities/${selectedStateCcp}`,
                    config
                )
                .then((response) => setCitiesCcp(response.data));
        }
    }, [selectedStateCcp]);
    const validationSchema = Yup.object({
        orgName: Yup.string().required('Required'),
        orgEmail: Yup.string().email('Invalid email address').required('Required'),
        location: Yup.string().required('Required'),
        state: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        orgType: Yup.string().required('Required'),
        ccpLocation: Yup.string().required('Required'),
        gender: Yup.string().required('Required'),
        membershipType: Yup.string().required('Required'),
        ccpAddress: Yup.string().required('Required'),
        ccpIdProof: Yup.mixed().required('Required'),
        ccpState: Yup.string().required('Required'),
        certification: Yup.mixed().required('Required'),
        consentCheckbox: Yup.bool().oneOf([true], 'Must agree to something'),
        designation: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        idProof: Yup.mixed().required('Required'),
        name: Yup.string().required('Required'),
        orgAddress: Yup.string().required('Required'),
        orgPhoto: Yup.mixed().required('Required'),
        phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits').required('Required'),
        photo: Yup.mixed().required('Required'),
    });
    return (
        <div className="w-full flex justify-center my-4">
            <Formik
                initialValues={{
                    orgName: '',
                    orgEmail: '',
                    location: '',
                    state: '',
                    city: '',
                    orgType: '',
                    ccpLocation: '',
                    gender: '',
                    membershipType: '',
                    ccpAddress: '',
                    ccpIdProof: null,
                    ccpState: '',
                    ccpCity: '',
                    certification: null,
                    consentCheckbox: true,
                    designation: '',
                    email: '',
                    idProof: null,
                    name: '',
                    orgAddress: '',
                    orgPhoto: null,
                    phoneNumber: '',
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
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Please fill in all required fields correctly',
                            });
                        }
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                        console.log(values);
                        // setSubmitting(true);
                        setIsSubmitting(true);

                        const formData = new FormData();

                        for (let key in values) {
                            formData.append(key, values[key]);
                        }

                        // Log FormData
                        for (let pair of formData.entries()) {
                            console.log(pair[0] + ', ' + pair[1]);
                        }

                        const response = await fetch(`${BASE_URL}postCorporateDetails`, {
                            method: 'POST',
                            body: formData
                        });

                        if (!response.ok) {
                            console.error('Failed to submit form', response);
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Failed to submit form',
                            });
                        } else {
                            const data = await response.json();
                            console.log('Form submitted successfully', data);
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Form submitted successfully',
                            });
                        }
                    } catch (error) {
                        setIsSubmitting(false);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Network error',
                        });
                    }

                }}
            >

                {(formik) => {
                    formikRef.current = formik;
                    return (

                        <div
                            className={`w-full max-w-7xl flex flex-col items-center justify-center p-5 border border-gray-500 rounded-md`
                            }
                            style={{ opacity: isSubmitting ? 0.5 : 1 }}
                        >
                            <Form>
                                <div className="w-full fade-in gap-8 flex flex-col justify-center items-center ">
                                    <h1 className="font-semibold text-lg font-Poppins tracking-wide sm:text-xl whitespace-nowrap text-[#444]">
                                        Become a Corporate Member of MIF
                                    </h1>
                                    <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                                        <label
                                            htmlFor="orgName"
                                            className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                                        >
                                            Organisation Name* :
                                        </label>
                                        <input
                                            id="orgName"
                                            name="orgName"
                                            type="text"
                                            onChange={(e) => {
                                                let a = e.target.value;
                                                a = a.replace(/\b\w/g, (match) =>
                                                    match.toUpperCase()
                                                );
                                                formik.setFieldValue("orgName", a);
                                            }}
                                            value={formik.values.orgName}
                                            placeholder="Organisation Name"
                                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                        />
                                        {/* <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center"> */}
                                        <label
                                            htmlFor="orgEmail"
                                            className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                                        >
                                            Organisation Email* :
                                        </label>
                                        <input
                                            id="orgEmail"
                                            name="orgEmail"
                                            type="text"
                                            onChange={(e) => {
                                                let a = e.target.value;
                                                a = a.replace(/\b\w/g, (match) =>
                                                    match.toUpperCase()
                                                );
                                                formik.setFieldValue("orgEmail", a);
                                            }}
                                            value={formik.values.orgEmail}
                                            placeholder="Organisation Email"
                                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                        />
                                        {/* </div> */}
                                    </div>


                                    <div className="Sharma w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                                        <label
                                            htmlFor="location"
                                            className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
                                        >
                                            Location* :
                                        </label>

                                        <div className="flex gap-2 hover:cursor-pointer" onChange={(e) => {
                                            setLocation(e.target.value);
                                            formik.setFieldValue("location", e.target.value);
                                        }}>
                                            <label className="font-semibold hover:cursor-pointer text-sm font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]">

                                                India
                                            </label>
                                            <input type="radio" value="india" name="location" className="hover:cursor-pointer" />
                                            <label className="font-semibold hover:cursor-pointer text-sm font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]">

                                                Abroad
                                            </label>
                                            <input type="radio" value="abroad" name="location" className="hover:cursor-pointer" />
                                        </div>
                                    </div>
                                    {location && (
                                        <div className="w-full flex flex-col sm:flex-row justify-center  gap-2 items-center">
                                            <label
                                                htmlFor="orgAddress"
                                                className="font-semibold text-sm font-Poppins sm:w-fit self-start tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                                            >
                                                Address*
                                            </label>
                                            <textarea
                                                id="orgAddress"
                                                name="orgAddress"
                                                type="text"
                                                placeholder="Address"
                                                rows="3"
                                                onChange={formik.handleChange}
                                                value={formik.values.orgAddress}
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
                                                                formik.setFieldValue(
                                                                    "country",
                                                                    e.target.value
                                                                );
                                                            }}
                                                            value={selectedCountry}
                                                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                                        >
                                                            <option value="" disabled>Select country</option>
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
                                                            <option value="" disabled>Select State</option>
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
                                                            <option value="" disabled>Select City</option>
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
                                    <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                                        <label
                                            htmlFor="orgType"
                                            className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                                        >
                                            Organisation Type* :
                                        </label>

                                        <select
                                            id="orgType"
                                            name="orgType"
                                            onChange={formik.handleChange}
                                            value={formik.values.orgType}
                                            className="w-full sm:w-1/2 border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                        >
                                            <option value="" disabled>
                                                Select Organisation Type
                                            </option>
                                            <option value="private">Private</option>
                                            <option value="government">Government</option>
                                            <option value="beneficiary">Beneficiary</option>
                                        </select>

                                        <label
                                            htmlFor="membershipType"
                                            className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                                        >
                                            Membership Type* :
                                        </label>


                                        <select
                                            id="membershipType"
                                            name="membershipType"
                                            onChange={formik.handleChange}
                                            value={formik.values.membershipType}
                                            className="w-full sm:w-1/2 border  rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                        >
                                            <option value="" disabled>
                                                Select membership Type
                                            </option>
                                            <option value="private">Private</option>
                                            <option value="government">Government</option>
                                            <option value="beneficiary">Beneficiary</option>
                                        </select>
                                        {/* </div> */}

                                    </div>

                                    <div className="flex  justify-between items-center min-h-fit  w-full">

                                        <div className="flex flex-col gap-2">

                                            <label
                                                htmlFor="orgPhoto"
                                                className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                                            >
                                                Photo* :
                                            </label>


                                            <input
                                                style={{
                                                    display: "none",
                                                }}
                                                id="orgPhoto"
                                                name="orgPhoto"
                                                type="file"
                                                accept=".png, .jpeg, .pdf, .doc, .docx"
                                                onChange={(event) => {
                                                    formik.setFieldValue(
                                                        "orgPhoto",
                                                        event.currentTarget.files[0]
                                                    );
                                                    setOrgPhoto(event.currentTarget.files[0]);
                                                }}
                                            />
                                            <label
                                                htmlFor="orgPhoto"
                                                className="rounded-md bg-[#EF4D48] max-w-[250px] px-3 py-2 text-sm text-center font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Select File
                                            </label>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Upload upto 5 MB in PDF, JPEG, PNG, Docs format only.
                                            </p>

                                        </div>
                                        {orgPhoto ? (
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
                                    <div className="w-full flex flex-col gap-4">
                                        <div className="flex  justify-between items-center min-h-fit  w-full">
                                            <div className=" flex flex-col">
                                                <div className="flex flex-row items-center gap-2">
                                                    <label
                                                        htmlFor="certification"
                                                        className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                                                    >
                                                        Upload Certification :
                                                    </label>
                                                    <input
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        id="certification"
                                                        name="certification"
                                                        type="file"
                                                        // TICKET ISSUE : 8

                                                        accept="image/png, image/jpeg, image/webp"
                                                        onChange={(event) => {
                                                            formik.setFieldValue(
                                                                "certification",
                                                                event.currentTarget.files[0]
                                                            );
                                                            setCertification(event.currentTarget.files[0]);
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="certification"
                                                        className="rounded-md bg-[#EF4D48] px-8 py-2 text-sm text-center font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        Select File
                                                    </label>
                                                </div>
                                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                                    Upload upto 5 MB in JPEG, PNG format only.
                                                </p>
                                            </div>

                                            {certification ? (
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

                                    <div className="w-full flex flex-col gap-4">
                                        <div className="flex justify-between items-center min-h-fit w-full">
                                            <div className="flex flex-col">
                                                <div className="flex flex-row items-center gap-2">
                                                    <label
                                                        htmlFor="idProof"
                                                        className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
                                                    >
                                                        Upload ID Proof :
                                                    </label>
                                                    <input
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        id="idProof"
                                                        name="idProof"
                                                        type="file"
                                                        accept="image/png, image/jpeg, image/webp"
                                                        onChange={(event) => {
                                                            formik.setFieldValue(
                                                                "idProof",
                                                                event.currentTarget.files[0]
                                                            );
                                                            setIdProof(event.currentTarget.files[0]);
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="idProof"
                                                        className="rounded-md bg-[#EF4D48] px-8 py-2 text-sm text-center font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        Select File
                                                    </label>
                                                </div>
                                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                                    Upload upto 5 MB in JPEG, PNG format only.
                                                </p>
                                            </div>

                                            {idProof ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="2rem"
                                                    viewBox="0 0 512 512"
                                                    className="fade-in fill-green-700"
                                                >
                                                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                                                </svg>
                                            ) : null}
                                        </div>
                                    </div>
                                    <h2 className="font-semibold text-lg font-Poppins tracking-wide sm:text-xl whitespace-nowrap text-[#444]">
                                        Chief Contact Person Details
                                    </h2>

                                    <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                                        {/* Name field */}
                                        <label htmlFor="name" className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left" >
                                            Name:*

                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Name"
                                            onChange={formik.handleChange}
                                            value={formik.values.name}
                                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                        />
                                        <label htmlFor="gender" className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left">
                                            Gender:*
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
                                        {/* Email field */}
                                        <label htmlFor="email" className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left">
                                            Email*

                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                        />
                                    </div>
                                    <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                                        {/* Phone number field */}
                                        <label htmlFor="phoneNumber" className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left">
                                            Phone Number*

                                        </label>
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            placeholder="Phone Number"
                                            onChange={formik.handleChange}
                                            value={formik.values.phoneNumber}
                                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                        />

                                        {/* Designation field */}
                                        <label htmlFor="designation" className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left">
                                            Designation*

                                        </label>
                                        <input
                                            id="designation"
                                            name="designation"
                                            type="text"
                                            placeholder="Designation"
                                            onChange={formik.handleChange}
                                            value={formik.values.designation}
                                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                        />
                                    </div>

                                    <div className="w-full flex flex-col sm:flex-row  gap-2" >
                                        {/* Address field */}
                                        <label htmlFor="ccpLocation" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                                            Location:*

                                        </label>

                                        <div id="ccpLocation" className="flex gap-2 hover:cursor-pointer" >
                                            <div onChange={(e) => {
                                                setCcpLocation(e.target.value);
                                                formik.setFieldValue("ccpLocation", e.target.value);
                                            }}>
                                                <label className="font-semibold hover:cursor-pointer text-sm font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444] mr-2">
                                                    India
                                                </label>
                                                <input type="radio" value="india" name="ccpLocation" className="hover:cursor-pointer" />
                                                <label className="font-semibold hover:cursor-pointer text-sm font-Poppins self-start tracking-wide sm:text-base whitespace-nowrap  text-[#444]mr-2 ml-2">
                                                    Abroad
                                                </label>
                                                <input type="radio" value="abroad" name="ccpLocation" className=" m-2 hover:cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                    {ccpLocation && (
                                        <>
                                      
                                        <div className="w-full flex flex-col sm:flex-row justify-center  gap-2 items-center">
                                            <label
                                                htmlFor="ccpAddress"
                                                className="font-semibold text-sm font-Poppins sm:w-fit self-start tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                                            >
                                                Address*
                                            </label>
                                            <textarea
                                                id="ccpAddress"
                                                name="ccpAddress"
                                                type="text"
                                                placeholder="Address"
                                                rows="3"
                                                onChange={formik.handleChange}
                                                value={formik.values.ccpAddress}
                                                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                            />
                                        </div>
                                        </>
                                    )}
                                    {ccpLocation && (
                                        <>

                                            {ccpLocation === "abroad" && (
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
                                                            id="ccpCountry"
                                                            name="ccpCountry"
                                                            onChange={(e) => {
                                                                setSelectedCountryCcp(e.target.value);
                                                                formik.setFieldValue(
                                                                    "ccpCountry",
                                                                    e.target.value
                                                                );
                                                            }}
                                                            value={selectedCountryCcp}
                                                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                                        >
                                                            <option value="" disabled>Select Country</option>
                                                            {countriesCcp.map((country) => (
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
                                                                setSelectedStateCcp(e.target.value);
                                                                formik.setFieldValue("ccpState", e.target.value);
                                                            }}
                                                            value={selectedCountryCcp}
                                                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                                        >
                                                            <option value="" disabled>Select state</option>
                                                            {statesCcp.map((state) => (
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
                                                            htmlFor="CcpCity"
                                                            className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                                                        >
                                                            City* :
                                                        </label>
                                                        <select
                                                            id="ccpCity"
                                                            name="ccpCity"
                                                            onChange={(e) => {
                                                                setSelectedCityCcp(e.target.value);
                                                                formik.setFieldValue("ccpCity", e.target.value);
                                                            }}
                                                            value={selectedCityCcp}
                                                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                                        >
                                                            <option value="" disabled>Select City</option>
                                                            {citiesCcp.map((city) => (
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

                                            {ccpLocation === "india" && (
                                                <div className="w-full fade-in flex flex-col gap-3 sm:flex-row md:gap-8">
                                                    {/* State */}

                                                    <div className="w-full flex gap-2 items-center justify-center">
                                                        <label
                                                            htmlFor="ccpState"
                                                            className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                                                        >
                                                            State* :
                                                        </label>
                                                        <select
                                                            id="ccpState"
                                                            name="ccpState"
                                                            onChange={(e) => {
                                                                setSelectedStateCcp(e.target.value);
                                                                formik.setFieldValue("ccpState", e.target.value);
                                                            }}
                                                            value={formik.values.ccpState}
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
                                                            htmlFor="ccpDistrict"
                                                            className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                                                        >
                                                            City*
                                                        </label>
                                                        <select
                                                            id="ccpCity"
                                                            name="ccpCity"
                                                            value={formik.values.ccpCity}
                                                            onChange={(e) => {
                                                                setSelectedCityCcp(e.target.value);
                                                                formik.setFieldValue("ccpCity", e.target.value);
                                                            }}
                                                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                                        >
                                                            <option value="" disabled>
                                                                Select a City
                                                            </option>
                                                            {selectedStateCcp &&
                                                                indiaStates[selectedStateCcp].map((district) => (
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


                                    <div className="flex  justify-between items-center min-h-fit  w-full">

                                        <div className="flex flex-col gap-2">


                                            {/* Chief Contact Person Photo */}
                                            <label htmlFor="photo" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">

                                                Photo* :
                                            </label>
                                            <input
                                                style={{ display: "none" }}
                                                id="photo"
                                                name="photo"
                                                type="file"
                                                accept="image/png, image/jpeg, image/webp"
                                                onChange={(event) => {
                                                    formik.setFieldValue("photo", event.currentTarget.files[0]);
                                                    setPhoto(event.currentTarget.files[0]);
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

                                    {/* Chief Contact Person ID Proof */}

                                    <div className="flex  justify-between items-center min-h-fit  w-full">

                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="ccpIdProof" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                                                Select ID Proof:

                                            </label>
                                            <input
                                                style={{ display: "none" }}
                                                id="ccpIdProof"
                                                name="ccpIdProof"
                                                type="file"
                                                accept="image/png, image/jpeg, image/webp"
                                                onChange={(event) => {
                                                    formik.setFieldValue("ccpIdProof", event.currentTarget.files[0]);
                                                    setCCPIdProof(event.currentTarget.files[0]);
                                                }}
                                            />
                                            <label
                                                htmlFor="ccpIdProof"
                                                className="rounded-md bg-[#EF4D48] max-w-[250px] px-3 py-2 text-sm text-center font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Select File
                                            </label>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Upload upto 5 MB in PDF, JPEG, PNG, Docs format only.
                                            </p>
                                        </div>
                                        {ccpIdProof ? (
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
                                        <label htmlFor="consentCheckbox" className="font-semibold text-sm sm:text-base font-Poppins tracking-wide text-[#444] w-full sm:w-4/4">
                                            <input
                                                id="consentCheckbox"
                                                name="consentCheckbox"
                                                type="checkbox"
                                                onChange={formik.handleChange}
                                                value={formik.values.consentCheckbox}
                                                className="mr-2"
                                                defaultChecked
                                            />
                                            By submitting this form, I consent to Founder General Secretary of
                                            MARWADI INTERNATIONAL FEDERATION (MIF) for using my name and details
                                            for records of MIF and its office bearers list. I have read and understood
                                            all the terms and conditions of MIF.
                                        </label>

                                    </div>

                                    <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
                                        <label htmlFor="orgName" className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left">
                                            Organisation Name
                                        </label>
                                        <input
                                            id="orgName"
                                            name="orgName"
                                            type="text"
                                            placeholder="Organisation Name"
                                            autoComplete="off"
                                            value={formik.values.orgName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                                        />
                                        {/* {formik.touched.orgName && formik.errors.orgName ? (
                                        <div className="text-red-500 text-sm mt-2">{formik.errors.orgName}</div>
                                    ) : null} */}

                                    </div>






                                    <button
                                        type="submit"
                                        className={`group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 ${formik.values.consentCheckbox ? 'bg-[#EF4D48]' : 'bg-[#ccc]'}`}
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

export default RegistrationForm;