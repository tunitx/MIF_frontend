import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import MembersContext from "../../../utils/context/Members";
import { capitalizeSentence } from "../../../utils/helper";
import {
  POST_OFFICE_BEARER,
  GET_ALL_SAMAJ,
  GET_ALL_BEARER,
  DELETE_BEARER,
} from "../../../utils/constants";
import axios from "axios";
import AdminContext from "../../../utils/context/Admincontext";
import UpdateBearer from "./UpdateBearer";

const OfficeBearer = () => {
  const [selectedFile, setFile] = useState(null);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const [samajList, setSamajList] = useState([]);

  const { admin, setAdmin } = useContext(AdminContext);

  const [showUpdateForm, setShowUpdateForm] = useState(null);

  const [membersList, setMembersList] = useState([]);

  async function deleteQuery(id) {
    try {
      const resBody = await fetch(`${DELETE_BEARER}${id}`, {
        method: "DELETE",
        // headers: {
        //   Authorization: `bearer ${admin.token}`,
        // },
      });

      if (resBody.status === 200) {
        // dispatch(delete_query(id));
        setMembersList((prevClips) => {
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
    async function getSamajList() {
      try {
        const resBody = await fetch(GET_ALL_SAMAJ);
        const resData = await resBody.json();

        return resData;
      } catch (e) {
        console.log(e);
      }
    }

    getSamajList()
      .then((data) => {
        // data = [{ name: "Select Member Type" }, ...data];
        setSamajList(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    async function getBearers() {
      try {
        const resBody = await fetch(GET_ALL_BEARER);

        const resData = await resBody.json();

        //   console.log(resData);
        return resData;
      } catch (e) {
        console.log(e);
      }
    }

    getBearers().then((data) => {
      setMembersList(data);
    });
  }, []);

  return (
    <div className="w-full flex justify-center items-center mb-12">
      <div className="w-full flex flex-col px-4 max-w-7xl gap-5 justify-center items-center">
        {/* ADD BEARER */}

        <Formik
          initialValues={{
            pfp: "",
            samaj: "",
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
            reqBody.append("samaj", values.samaj);
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
              const response = await axios.post(POST_OFFICE_BEARER, reqBody, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `bearer ${admin?.token}`,
                },
              });

              console.log(response);

              if (response.status === 201) {
                setMessage(`${values.name} is successfully added`);
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
              <div className="grow w-full">
                <div
                  className={`flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ${
                    formik.isSubmitting ? "opacity-50" : ""
                  }`}
                >
                  <h2 className="text-[#EF4D48] text-xl font-Poppins font-bold w-full text-left md:text-2xl lg:text-3xl ">
                    <p className="border rounded-md border-[#333] p-3 w-fit">
                      Add Office Bearer ➡
                    </p>
                  </h2>
                  <div className="mt-10  w-full sm:max-w-lg fade-in">
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
                            Upload Bearer Photo
                          </label>
                          {selectedFile ? <p>✔</p> : null}
                        </div>
                      </div>
                      <div className="sm:col-span-6">
                        <label
                          htmlFor="samaj"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Samaj
                        </label>
                        <div className="mt-2">
                          <select
                            id="samaj"
                            name="samaj"
                            required
                            {...formik.getFieldProps("samaj")}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                          >
                            <option disabled value={""}>
                              Select Samaj
                            </option>
                            {samajList &&
                              samajList.map((type, index) => {
                                return (
                                  <option key={index} value={type._id}>
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

        {/* LIST OF OFFICE BEARER */}

        <div className="w-full flex justify-center items-center flex-col gap-10">
          <h2 className="text-[#EF4D48] text-xl font-Poppins  font-bold w-full text-start md:text-2xl lg:text-3xl ">
            <p className="border rounded-md border-[#333] p-3 w-fit">
              Bearer List ➡
            </p>
          </h2>
          {!membersList || membersList.length === 0 ? (
            <p className="w-full text-center font-Poppins text-xl font-semibold text-[#EF4D48]">
              Seems like no bearer data is available...
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {membersList?.map((member) => {
                return (
                  <div className="w-full fade-in shadow-md flex flex-col gap-4 ">
                    <div className="w-full min-h-full p-3 border border-indigo-900 rounded-md flex flex-col gap-5 justify-start items-center">
                      <div className="h-52 w-52  overflow-hidden rounded-md flex justify-center shadow-lg hover:shadow-2xl z-20 items-start hover:cursor-zoom-in">
                        <img
                          src={member.pfp}
                          className="rounded-md shadow-lg object-contain my-auto "
                        />
                      </div>

                      <div className="w-full gap-1 flex  justify-center text-center items-center flex-wrap">
                        <p className="font-Poppins text-base font-semibold text-[#333] hover:cursor-pointer whitespace-nowrap">
                          {`${capitalizeSentence(member.name)}`}
                        </p>
                        {/* <p className="font-Poppins text-sm font-medium text-[#333] hover:cursor-pointer whitespace-nowrap">
                          {" "}
                          (
                          {capitalizeSentence(member?.samaj?.name) ||
                            "Not Available"}
                          )
                        </p> */}
                      </div>
                      <div className="w-full flex justify-evenly items-center">
                        {/* Delete */}

                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.3rem"
                            viewBox="0 0 448 512"
                            fill="#EF4D48"
                            className="mx-auto hover:cursor-pointer"
                            onClick={() => {
                              deleteQuery(member._id);
                            }}
                          >
                            {/*!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                          </svg>
                        </div>

                        {/* Edit */}

                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.3rem"
                            viewBox="0 0 512 512"
                            fill="#EF4D48"
                            className="mx-auto  hover:cursor-pointer"
                            onClick={() => {
                              setShowUpdateForm(member);
                            }}
                          >
                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* UPDATE BEARER */}

      {showUpdateForm && (
        <div className=" z-50 fixed flex-col justify-center gap-5 sm:gap-8 mb-4 items-center w-screen h-screen top-0 left-0 bg-[#323233] bg-opacity-90 overflow-x-auto overflow-y-auto ">
          <div className="w-full flex flex-col gap-5  justify-center items-center">
            <div
              className="self-end flex justify-end pr-5 sm:pr-20 hover:cursor-pointer group mt-5"
              onClick={() => {
                setShowUpdateForm(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2em"
                viewBox="0 0 384 512"
                fill="#fff"
                className="group-hover:fill-[#EF4D48]"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
            <div className="w-full flex justify-center items-center ">
              <div className="max-w-xl rounded-lg bg-[#f7f3f5] mb-4">
                <UpdateBearer data={showUpdateForm} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficeBearer;
