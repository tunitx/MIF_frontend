import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import MembersContext from "../../../utils/context/Members";
import { POST_MEMBERTYPE, POST_PRESS } from "../../../utils/constants";
import axios from "axios";
import AdminContext from "../../../utils/context/Admincontext";

const FormAddMemberType = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { admin, setAdmin } = useContext(AdminContext);

  function camelCaseSentence(sentence) {
    const words = sentence.trim().split(/\s+/);

    // Convert the first word to lowercase
    const camelCaseWords = [words[0].toLowerCase()];

    // Capitalize the first letter of each subsequent word
    for (let i = 1; i < words.length; i++) {
      camelCaseWords.push(
        words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase()
      );
    }

    // Join the words to form the camel case string
    const camelCaseString = camelCaseWords.join("");

    return camelCaseString;
  }

  return (
    <Formik
      initialValues={{
        name: "",
        id: "",
      }}
      onSubmit={async (values, { setSubmitting, resetForm, setFieldValue }) => {
        setError(null);
        setMessage(null);
        // console.log(values);

        // return;

        try {
          const response = await axios.post(
            POST_MEMBERTYPE,
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
            setMessage(`${values.name} member type added successfully`);
          } else {
            setMessage("Not Uploaded");
          }

          setSubmitting(false);
          resetForm();
          // setFile(null);
        } catch (error) {
          setSubmitting(false);
          // setFile(null);
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
                  Add Member Type ➡
                </p>
              </h2>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg fade-in">
                <form
                  className="space-y-6"
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Member Title
                    </label>
                    <div className="mt-2">
                      <input
                        // {...formik.getFieldProps("name")}
                        value={formik.values.name}
                        onChange={(e) => {
                          formik.setFieldValue("name", e.target.value);

                          const id_ = camelCaseSentence(e.target.value);

                          formik.setFieldValue("id", id_);
                        }}
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
                      htmlFor="id"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Member ID
                    </label>
                    <div className="mt-2">
                      <input
                        // {...formik.getFieldProps("id")}
                        value={formik.values.id}
                        onChange={() => {}}
                        id="id"
                        name="id"
                        type="text"
                        disabled
                        // required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Id must be of the format : for eg. if Title is "Active
                      Life Member" than id should be "activeLifeMember".
                    </p>
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

export default FormAddMemberType;
