import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import MembersContext from "../../../utils/context/Members";
import { POST_PRESS_CLIP } from "../../../utils/constants";
import axios from "axios";
import AdminContext from "../../../utils/context/Admincontext";

const FormAddNewPressClip = () => {
  //   const [selectedFile, setFile] = useState(null);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { admin, setAdmin } = useContext(AdminContext);

  return (
    <Formik
      initialValues={{
        url: "",
        title: "",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values);

        // const reqBody = new FormData();
        // // reqBody.append("image", values.image);
        // // reqBody.append("date", values.date);
        // reqBody.append("url", values.url)
        // reqBody.append("title", values.title)

        setError(null);
        setMessage(null);

        try {
          const response = await axios.post(
            POST_PRESS_CLIP,
            JSON.stringify(values),
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${admin?.token}`,
              },
            }
          );

          console.log(response);

          if (response.status === 201) {
            setMessage(`Operation Successfully`);
          } else {
            setMessage("Not Uploaded");
          }

          setSubmitting(false);
          resetForm();
          //   setFile(null);
        } catch (error) {
          //   setFile(null);
          resetForm();
          setError(error.message);
        }
      }}
    >
      {(formik) => {
        return (
          <div>
            <div
              className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${
                formik.isSubmitting ? "opacity-50" : ""
              }`}
            >
              <h2 className="text-[#EF4D48] text-xl font-Poppins  font-bold w-full text-start md:text-2xl lg:text-3xl ">
                <p className="border rounded-md border-[#333] p-3 w-fit">
                  Upload Press Clip ➡
                </p>
              </h2>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg fade-in">
                <form
                  className="space-y-6"
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  {/* <div className="flex gap-4 justify-between items-center min-h-fit ">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium leading-6 text-gray-900 self-start mb-4"
                      >
                        News Cutout
                      </label>
                      <input
                        style={{
                          display: "none",
                        }}
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "image",
                            event.currentTarget.files[0]
                          );
                          setFile(event.currentTarget.files[0]);
                        }}
                      />
                      <label
                        htmlFor="image"
                        className="rounded-md bg-[#EF4D48] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Upload News Cutout Image
                      </label>
                      {selectedFile ? <p>✔</p> : null}
                    </div>
                  </div> */}

                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Title
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("title")}
                        id="title"
                        name="title"
                        type="text"
                        required
                        placeholder="Title"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="url"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      URL
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("url")}
                        id="url"
                        name="url"
                        type="text"
                        required
                        placeholder="URL"
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

export default FormAddNewPressClip;
