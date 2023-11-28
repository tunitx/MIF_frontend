import React, { useState, useContext } from "react";
import { Formik } from "formik";
import MembersContext from "../../../utils/context/Members";
import axios from "axios";
import { POST_ADVERTISMENT } from "../../../utils/constants";
import AdminContext from "../../../utils/context/Admincontext";

const FormAddAdvertisment = () => {
  const [show, setShow] = useState(false);

  const { admin, setAdmin } = useContext(AdminContext);

  // console.log(admin);

  const [selectedFile, setFile] = useState(null);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  return (
    <Formik
      initialValues={{
        businessImage: "",
        title: "",
        twitter: "",
        facebook: "",
        playStore: "",
        instagram: "",
        email: "",
        description: "",
        phone: "",
        whatsapp: "",
        youtube: "",
        website: "",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        // console.log(values);

        const reqBody = new FormData();
        reqBody.append("businessImage", values.businessImage);
        reqBody.append("title", values.title);
        reqBody.append("twitter", values.twitter);
        reqBody.append("description", values.description);
        reqBody.append("facebook", values.facebook);
        reqBody.append("email", values.email);
        reqBody.append("playStore", values.playStore);
        reqBody.append("instagram", values.instagram);
        reqBody.append("phone", values.phone);
        reqBody.append("whatsapp", values.whatsapp);
        reqBody.append("youtube", values.youtube);
        reqBody.append("website", values.website);

        setError(null);
        setMessage(null);

        try {
          const response = await axios.post(POST_ADVERTISMENT, reqBody, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `bearer ${admin?.token}`,
            },
          });

          if (response.status === 201) {
            setMessage(
              `Advertisment for ${values.title} is successfully added.`
            );
          } else {
            setMessage("Not Uploaded");
          }

          setSubmitting(false);
          resetForm();
          setFile(null);
        } catch (error) {
          setSubmitting(false);
          setFile(null);
          resetForm();
          setError(error.message);
        }
      }}
    >
      {(formik) => {
        return (
          <div className={` ${formik.isSubmitting ? "opacity-50" : ""}`}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <h2 className="text-[#EF4D48] text-xl font-Poppins  font-bold w-full text-start md:text-2xl lg:text-3xl ">
                <p className="border rounded-md border-[#333] p-3 w-fit">
                  Add Advertisment ➡
                </p>
              </h2>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                <form
                  className="space-y-6"
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  {/* BUSINESS IMAGE */}

                  <div className="flex gap-4 justify-between items-center min-h-fit ">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="businessImage"
                        className="block text-sm font-medium leading-6 text-gray-900 self-start mb-4"
                      >
                        Profile Photo
                      </label>
                      <input
                        style={{
                          display: "none",
                        }}
                        type="file"
                        id="businessImage"
                        name="businessImage"
                        accept="image/*"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "businessImage",
                            event.currentTarget.files[0]
                          );
                          setFile(event.currentTarget.files[0]);
                        }}
                      />
                      <label
                        htmlFor="businessImage"
                        className="rounded-md bg-[#EF4D48] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Upload Business Image
                      </label>
                      {selectedFile ? <p>✔</p> : null}
                    </div>
                  </div>

                  {/* BUSINESS TITLE */}

                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Business Title
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("title")}
                        id="title"
                        name="title"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* BUSINESS DESCRIPTION */}

                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Business Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        required
                        rows={3}
                        {...formik.getFieldProps("description")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Enter your full address here.
                    </p>
                  </div>

                  {/* TWITTER */}

                  <div>
                    <label
                      htmlFor="twitter"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Twitter
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("twitter")}
                        id="twitter"
                        name="twitter"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* FACEBOOK */}

                  <div>
                    <label
                      htmlFor="facebook"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Facebook
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("facebook")}
                        id="facebook"
                        name="facebook"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* PlayStore */}

                  <div>
                    <label
                      htmlFor="playStore"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Play Store
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("playStore")}
                        id="playStore"
                        name="playStore"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* INSTAGRAM */}

                  <div>
                    <label
                      htmlFor="instagram"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Instagram
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("instagram")}
                        id="instagram"
                        name="instagram"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      E-mail
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("email")}
                        id="email"
                        name="email"
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* YOUTUBE */}

                  <div>
                    <label
                      htmlFor="youtube"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Youtube
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("youtube")}
                        id="youtube"
                        name="youtube"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* WEBSITE */}

                  <div>
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Website
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("website")}
                        id="website"
                        name="website"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* PHONE */}

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("phone")}
                        id="phone"
                        name="phone"
                        type="number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* WHATSAPP */}

                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Whatsapp Number
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("whatsapp")}
                        id="whatsapp"
                        name="whatsapp"
                        type="number"
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
                   text-xl font-bold font-founder hover:cursor-pointer"
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

export default FormAddAdvertisment;
