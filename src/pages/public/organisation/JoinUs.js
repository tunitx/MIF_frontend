import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import indiaStates from '../../../utils/indiaStates';
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

    // ... your useEffect hooks ...
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
    return (
        <div className="w-full flex justify-center my-4">
            <Formik
                initialValues={{
                    orgName: '',
                    orgEmail: '',
                    location: '',
                    country: '',
                    state: '',
                    city: '',
                    orgType: '',
                    logo: '',
                    agreement: '',
                    managerName: '',
                    managerPhone: '',
                    managerEmail: '',
                }}
                onSubmit={values => {
                    console.log(values);
                }}
            >

                {(formik) => {
                    formikRef.current = formik;
                    return (

                        <div
                            className={`w-full  max-w-6xl flex flex-col  items-center justify-center p-5 `}
                        >
                            <Form>
                                <div className="w-full fade-in gap-8 flex flex-col justify-center items-center">

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
                                    </div>
                                    <div className="w-full flex flex-col sm:flex-row justify-center gap-2 items-center">
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
                                    </div>

                                    <div className="Sharma w-full flex flex-col sm:flex-row justify-start gap-2 items-center">
                                        <label
                                            htmlFor="location"
                                            className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                                        >
                                            Location* :
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
                                    <div className="w-full flex gap-2 items-center justify-center sm:justify-start">
                                        <label
                                            htmlFor="orgType"
                                            className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
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


                                    </div>
                                </div>
                                <label
                                    htmlFor="Logo"
                                    className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                                >
                                    Logo* :
                                </label>

                                <Field name="logo" type="file" />
                                <label
                                    htmlFor="agreement"
                                    className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
                                >
                                    Agreement* :
                                </label>
                                <Field name="agreement" type="file" />
                                <Field name="managerName" type="text" placeholder="Chief Contact Person Name" />
                                <Field name="managerPhone" type="tel" placeholder="Chief Contact Person Phone" />
                                <Field name="managerEmail" type="email" placeholder="Chief Contact Person Email" />
                                <Field name="managerEmail" type="email" placeholder="Chief Contact Person Phone Number" />
                                <button type="submit">Submit</button>
                            </Form>
                        </div>
                    );

                }}
            </Formik>
        </div>
    );
};

export default RegistrationForm;