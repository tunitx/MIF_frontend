import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import MembersContext from "../../../utils/context/Members";
import {
  POST_MEMBER_DETAILS,
  GET_MEMBERTYPES_LIST,
} from "../../../utils/constants";
import axios from "axios";

const FormAddNewMember = () => {
  const [selectedFile, setFile] = useState(null);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const [memberTypeList, setMemberTypeList] = useState([]);
  // console.log(memberTypeList);

  useEffect(() => {
    async function getMemberTypeList() {
      try {
        const resBody = await fetch(GET_MEMBERTYPES_LIST);
        const resData = await resBody.json();

        return resData;
      } catch (e) {
        console.log(e);
      }
    }

    getMemberTypeList()
      .then((data) => {
        // data = [{ name: "Select Member Type" }, ...data];
        setMemberTypeList(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Formik
      initialValues={{
        pfp: "",
        memberType: "",
        name: "",
        profession: "",
        nativePlace: "",
        email: "",
        address: "",
        phoneNumber: "",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values);

        const reqBody = new FormData();
        reqBody.append("pfp", values.pfp);
        reqBody.append("memberType", values.memberType);
        reqBody.append("name", values.name);
        reqBody.append("profession", values.profession);
        reqBody.append("nativePlace", values.nativePlace);
        reqBody.append("email", values.email);
        reqBody.append("address", values.address);
        reqBody.append("phoneNumber", values.phoneNumber);

        setError(null);
        setMessage(null);
        // return;

        try {
          const response = await axios.post(POST_MEMBER_DETAILS, reqBody, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.status === 201) {
            setMessage(
              `${values.name} is successfully added as ${values.memberType}`
            );
          } else {
            setMessage("Not Uploaded");
          }

          setSubmitting(false);
          resetForm();
          setFile(null);
        } catch (error) {
          setFile(null);
          resetForm();
          setError(error.message);
        }
      }}
    >
      {(formik) => {
        return (
          <div className="grow">
            <div
              className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${
                formik.isSubmitting ? "opacity-50" : ""
              }`}
            >
              <h2 className="text-[#EF4D48] text-xl font-Poppins  font-bold w-full text-start md:text-2xl lg:text-3xl ">
                <p className="border rounded-md border-[#333] p-3 w-fit">
                  Add Member ➡
                </p>
              </h2>
              <div className="mt-10  sm:w-full sm:max-w-lg">
                <form
                  className="space-y-6"
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="flex gap-4 justify-between items-center min-h-fit ">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="pfp"
                        className="block text-sm font-medium leading-6 text-gray-900 self-start mb-4"
                      >
                        Profile Photo
                      </label>
                      <input
                        style={{
                          display: "none",
                        }}
                        type="file"
                        id="pfp"
                        name="pfp"
                        accept="image/*"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "pfp",
                            event.currentTarget.files[0]
                          );
                          setFile(event.currentTarget.files[0]);
                        }}
                      />
                      <label
                        htmlFor="pfp"
                        className="rounded-md bg-[#EF4D48] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Upload Member Photo
                      </label>
                      {selectedFile ? <p>✔</p> : null}
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="memberType"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Member Type
                    </label>
                    <div className="mt-2">
                      <select
                        id="memberType"
                        name="memberType"
                        required
                        {...formik.getFieldProps("memberType")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                      >
                        <option disabled value={""}>
                          Select Member Type
                        </option>
                        {memberTypeList &&
                          memberTypeList.map((type, index) => {
                            return (
                              <option key={index} value={type.id}>
                                {type.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("name")}
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="profession"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Profession
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("profession")}
                        id="profession"
                        name="profession"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("email")}
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="nativePlace"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Native Place
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("nativePlace")}
                        id="nativePlace"
                        name="nativePlace"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Address
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        {...formik.getFieldProps("address")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Enter your full address here.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("phoneNumber")}
                        id="phoneNumber"
                        name="phoneNumber"
                        type="number"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className="flex w-full justify-center rounded-md bg-[#EF4D48] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm "
                    >
                      Add
                    </button>
                  </div>
                  <div className="w-full flex justify-center items-center text-center">
                    {error !== null ? (
                      <div className="flex justify-between w-fit">
                        <p className="text-red-700 text-xl font-semibold font-founder">
                          {error}
                        </p>
                        <p
                          className="text-red-700 text-xl font-bold font-founder hover:cursor-pointer"
                          onClick={() => {
                            setError(null);
                          }}
                        >
                          ❌
                        </p>
                      </div>
                    ) : null}
                    {message !== null ? (
                      <div className="flex justify-between w-fit">
                        <p
                          className="text-[#EF4D48]
                 text-xl font-semibold font-founder"
                        >
                          {message}
                        </p>
                        <p
                          className="text-[#EF4D48]
                   text-xl font-bold font-founder hover:cursor-pointer whitespace-nowrap"
                          onClick={() => {
                            setMessage(null);
                          }}
                        >
                          ✔👌
                        </p>
                      </div>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default FormAddNewMember;
