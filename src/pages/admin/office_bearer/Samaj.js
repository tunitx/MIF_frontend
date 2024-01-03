import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import MembersContext from "../../../utils/context/Members";
import {
  POST_SAMAJ,
  GET_ALL_SAMAJ,
  DELETE_SAMAJ,
} from "../../../utils/constants";
import axios from "axios";
import AdminContext from "../../../utils/context/Admincontext";

const Samaj = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { admin, setAdmin } = useContext(AdminContext);

  //   function camelCaseSentence(sentence) {
  //     const words = sentence.trim().split(/\s+/);

  //     // Convert the first word to lowercase
  //     const camelCaseWords = [words[0].toLowerCase()];

  //     // Capitalize the first letter of each subsequent word
  //     for (let i = 1; i < words.length; i++) {
  //       camelCaseWords.push(
  //         words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase()
  //       );
  //     }

  //     // Join the words to form the camel case string
  //     const camelCaseString = camelCaseWords.join("");

  //     return camelCaseString;
  //   }
  const [samajList, setSamajList] = useState(null);

  console.log(samajList);

  async function deleteQuery(id) {
    try {
      const resBody = await fetch(`${DELETE_SAMAJ}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${admin.token}`,
        },
      });

      if (resBody.status === 200) {
        // dispatch(delete_query(id));
        console.log("dafd");
        setSamajList((prevClips) => {
          return prevClips.filter((p) => {
            return p._id !== id;
          });
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function getSamaj() {
      try {
        const resBody = await fetch(GET_ALL_SAMAJ, {
          method: "GET",
          headers: {
            Authorization: `bearer ${admin?.token}`,
          },
        });

        if (resBody.status === 200) {
          const resData = await resBody.json();

          setSamajList(resData);
        } else {
          throw new Error("Something went wrong, couldn't access data");
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    getSamaj();
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col px-4 max-w-7xl gap-5 justify-center items-center">
        <Formik
          initialValues={{
            name: "",
          }}
          onSubmit={async (
            values,
            { setSubmitting, resetForm, setFieldValue }
          ) => {
            setError(null);
            setMessage(null);

            try {
              const response = await axios.post(
                POST_SAMAJ,
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
                setMessage(`${values.name} samaj added successfully`);
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
              <div className="w-full">
                <div
                  className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${
                    formik.isSubmitting ? "opacity-50" : ""
                  }`}
                >
                  <h2 className="text-[#EF4D48] text-left text-xl font-Poppins  font-bold w-full  md:text-2xl lg:text-3xl ">
                    <p className="border rounded-md border-[#333] p-3 w-fit">
                      Add Office Bearer ➡
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
                          Bearer Title
                        </label>
                        <div className="mt-2">
                          <input
                            value={formik.values.name}
                            onChange={(e) => {
                              formik.setFieldValue("name", e.target.value);
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

        <div className="w-full  flex justify-center items-center">
          {!samajList || samajList.length === 0 ? (
            <p className="w-full text-center font-Poppins text-xl font-semibold text-[#EF4D48]">
              Seems like no samaj data is available...
            </p>
          ) : (
            <div className="overflow-x-auto fade-in w-full flex justify-center">
              <table className="w-full border-2 border-[#305D2B] max-w-7xl">
                <thead className="w-full">
                  <tr className="bg-[#305D2B] text-white w-full">
                    <th className="p-3 text-center  border-white border-r whitespace-nowrap font-bold font-Poppins">
                      Title
                    </th>
                    <th className="p-3 text-center border-white border-r  whitespace-nowrap font-bold font-Poppins">
                      _id
                    </th>
                    <th className="p-3 text-center border-white border-r  whitespace-nowrap font-bold font-Poppins">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {samajList.map(({ name, _id }, index) => (
                    <tr
                      key={_id}
                      className="border-b border-[#EF4D48] w-full align-middle"
                    >
                      <td className="p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins">
                        {name}
                      </td>
                      <td className="p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap  font-Poppins">
                        {_id}
                      </td>

                      <td className="p-2 mt-1  text-center  align-middle min-w-full whitespace-nowrap h-full mx-auto hover:cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1.3rem"
                          viewBox="0 0 448 512"
                          fill="#EF4D48"
                          className="mx-auto"
                          onClick={() => {
                            deleteQuery(_id);
                          }}
                        >
                          {/*!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Samaj;
