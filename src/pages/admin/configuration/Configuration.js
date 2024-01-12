import React, { useEffect, useState } from "react";
import {
  GET_ALL_CONFIGURATIONS,
  UPDATE_CONFIGURATION,
  responsive,
} from "../../../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

const Configuration = () => {
  const [configurationVariablesList, setConfigurationVariablesList] =
    useState(null);

  console.log(configurationVariablesList);

  useEffect(() => {
    async function get_configurationVariablesList() {
      try {
        const res = await axios.get(GET_ALL_CONFIGURATIONS);
        if (res.status === 200) {
          setConfigurationVariablesList(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    }

    get_configurationVariablesList();
  }, []);

  async function handleUpdate(key, _id) {
    Swal.fire({
      title: "Enter the value",
      text: `For key : ${key}`,

      // This is because we to have to set type, for eg, for "totalVisitorCount" the input should be number only, but in future, there could be some
      // variable which can take a string value,

      input: `${
        key === "totalVisitorCount" ||
        key === "advertismentSpeed" ||
        key === "expiryTimeForVisitorIP"
          ? "number"
          : "text"
      }`,
      inputAttributes: {
        autocapitalize: "off",
      },
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Update",
      showLoaderOnConfirm: true,
      preConfirm: async (value) => {
        try {
          const reqBody = {
            key,
            value,
            _id,
          };
          console.log(reqBody);
          const response = await axios.put(UPDATE_CONFIGURATION, reqBody);
          //   return console.log(response);

          if (response.status === 200) {
            return response;
          } else {
            throw new Error("Error");
          }
        } catch (error) {
          Swal.showValidationMessage(`
              Request failed: ${error}
            `);
        }
      },
      //   allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Updated ${result.value.data.key} to ${result.value.data.value}`,
          // html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });
  }

  if (!configurationVariablesList) return null;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col px-4 max-w-6xl gap- justify-center items-center gap-8">
        <div className="w-full  flex justify-center items-center">
          {!configurationVariablesList ||
          configurationVariablesList.length === 0 ? (
            <p className="w-full text-center font-Poppins text-xl font-semibold text-[#EF4D48]">
              Seems like no samaj data is available...
            </p>
          ) : (
            <div className="w-full flex flex-col gap-5 mt-5 sm:mt-10">
              <div className="w-full flex gap-5 justify-end items-center">
                <p className="text-lg font-semibold text-[#333] font-Poppins p-3 py-2 border rounded-md border-[#305D2B]">
                  Total Variables : {configurationVariablesList?.length}
                </p>
              </div>
              <div className="overflow-x-auto flex-col  fade-in w-full flex justify-center ">
                <table className="w-full border-2 border-[#305D2B] max-w-7xl">
                  <thead className="w-full">
                    <tr className="bg-[#305D2B] text-white w-full">
                      <th className="p-3 text-center  border-white border-r whitespace-nowrap font-bold font-Poppins">
                        Key
                      </th>
                      <th className="p-3 text-center border-white border-r  whitespace-nowrap font-bold font-Poppins">
                        Value
                      </th>
                      <th className="p-3 text-center border-white border-r  whitespace-nowrap font-bold font-Poppins">
                        _id
                      </th>
                      <th className="p-3 text-center border-white border-r  whitespace-nowrap font-bold font-Poppins">
                        Edit
                      </th>
                      {/* <th className="p-3 text-center border-white border-r  whitespace-nowrap font-bold font-Poppins">
                        Delete
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {configurationVariablesList.map(
                      ({ key, _id, value }, index) => (
                        <tr
                          key={_id}
                          className="border-b border-[#EF4D48] w-full align-middle"
                        >
                          <td className="p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins">
                            {key}
                          </td>
                          <td className="p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap  font-Poppins">
                            {value}
                          </td>
                          <td className="p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap  font-Poppins">
                            {_id}
                          </td>

                          <td
                            className="p-2 mt-1  text-center border-r border-[#305D2B] align-middle min-w-full whitespace-nowrap h-full mx-auto hover:cursor-pointer"
                            onClick={() => {
                              handleUpdate(key, _id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1.3rem"
                              viewBox="0 0 512 512"
                              className="mx-auto"
                              fill="#305D2B"
                            >
                              {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                              <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                            </svg>
                          </td>

                          {/* <td
                            className="p-2 mt-1  text-center  align-middle min-w-full whitespace-nowrap h-full mx-auto hover:cursor-pointer"
                            onClick={() => {
                              deleteQuery(_id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1.3rem"
                              viewBox="0 0 448 512"
                              fill="#305D2B"
                              className="mx-auto"
                            >
                              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg>
                          </td> */}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col justify-center items-start">
          <p className=" text-base font-semibold leading-6 text-gray-600 font-Poppins">
            *Value for the "advertismentSpeed" and "expiryTimeForVisitorIP" key
            should be in milli-seconds, For eg, 10 sec is 1000 milli-sec
          </p>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
