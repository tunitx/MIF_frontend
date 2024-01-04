import React, { useEffect, useState, useContext } from "react";
import {
  GET_BIODATA_BY_ID,
  Fast2SMS_OPT_API_ENDPOINT,
  Fast2SMS_OPT_API_KEY,
  IS_USER_ALREADY_EXIST,
  MATRIMONY_SIGNIN,
  MATRIMONY_SIGNUP,
} from "../../../utils/constants";
import { useParams } from "react-router-dom";
import BiodataFrame from "./biodataFrame/BiodataFrame";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import UserContext from "../../../utils/context/UserContext";
import TopLoadingBarContext from "../../../utils/context/TopLoadingBarContext";

const ShowFullBiodata = () => {
  const { id } = useParams();

  const [biodata, setBiodata] = useState("");
  console.log(biodata);

  const [isLogged, setIsLogged] = useState(true);

  const { userName, setUserName } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) setIsLogged(false);
    else setIsLogged(true);
  }, [userName]);

  useEffect(() => {
    async function getBiodatabyID() {
      try {
        console.log("sadfadf");
        const resBody = await fetch(`${GET_BIODATA_BY_ID}${id}`);
        console.log(resBody);
        if (resBody.status === 200) {
          const resData = await resBody.json();
          setBiodata(resData);
          console.log(resData);
        } else {
          console.log("NOT FOUND");
          setBiodata(null);
        }
      } catch (e) {
        console.log("uipoui");
        console.log(e);
      }
    }
    getBiodatabyID();
  }, []);

  const handleAction = (path, info) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate(path);
      // setAction(path);
    } else {
      Swal.fire({
        title: "Are you a new user?",
        showDenyButton: true,
        confirmButtonText: "Sign Up",
        denyButtonText: "Sign In",
      }).then((result) => {
        if (result.isConfirmed) {
          // ? Sign Up Form

          Swal.fire({
            title: "Sign Up",
            html:
              '<input type="text" id="swal-input1" class="swal2-input" placeholder="Name">' +
              '<input type="text" id="swal-input2" class="swal2-input" placeholder="Phone Number">' +
              '<input type="text" id="swal-input3" class="swal2-input" placeholder="Email (Optional)">',
            focusConfirm: false,
            showDenyButton: true,
            denyButtonText: "Back",
            preConfirm: () => {
              const name = Swal.getPopup().querySelector("#swal-input1").value;
              const phoneNumber =
                Swal.getPopup().querySelector("#swal-input2").value;
              const email = Swal.getPopup().querySelector("#swal-input3").value;

              // Validation for phone number
              const phoneNumberPattern = /^[0-9]{10}$/; // Adjust this pattern to match the phone number format you want
              if (!phoneNumberPattern.test(phoneNumber)) {
                Swal.showValidationMessage(`Please enter a valid phone number`);
                return false;
              }
              if (!name || !phoneNumber) {
                Swal.showValidationMessage(
                  `Please enter your name, phone number`
                );
                return false;
              }

              return { name, phoneNumber, email };
            },
          }).then((result) => {
            if (result.isConfirmed) {
              // ? Checking if the user already exist

              axios
                .post(`${IS_USER_ALREADY_EXIST}`, result.value)
                .then((response) => {
                  // ? If user already exist, than throw the error.

                  if (response.data.success) {
                    throw new Error(response.data.message);
                  }

                  // ? Else send the OTP
                  else {
                    // ? Generating and Sending the OTP

                    function opt_generator() {
                      return (
                        Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
                      );
                    }

                    const opt_sent = opt_generator();

                    const opt_message_request_url = `${Fast2SMS_OPT_API_ENDPOINT}?authorization=${Fast2SMS_OPT_API_KEY}&variables_values=${opt_sent}&route=otp&numbers=${result.value.phoneNumber}`;

                    axios
                      .get(opt_message_request_url)
                      .then((response) => {
                        // ? If the OTP is successfully sent, continue

                        console.log(response);
                      })
                      .catch((e) => {
                        // ? If the OTP is not successfully sent, than do this

                        Swal.fire(
                          "Something went wrong",
                          "Please try again later."
                        );

                        console.log(e);
                      });

                    // ? Asking for the OTP from the user.

                    Swal.fire({
                      title: "Enter the OTP",
                      html:
                        '<input type="number" id="swal-input1" class="swal2-input" placeholder="OTP">' +
                        `<p>Please wait while we a send a OTP to ******${result.value.phoneNumber.slice(
                          6
                        )}</p>`,
                      preConfirm: () => {
                        const otp_rececived =
                          Swal.getPopup().querySelector("#swal-input1").value;
                        if (!otp_rececived) {
                          Swal.showValidationMessage(`Please enter the OTP`);
                          return false;
                        }

                        return {
                          opt_sent,
                          otp_rececived,
                          phoneNumber: result.value.phoneNumber,
                          name: result.value.name,
                          email: result.value.email,
                        };
                      },
                    }).then((result) => {
                      // ? After taking the input of the image from the user, check if the OTP is correct or not.

                      if (result.isConfirmed) {
                        if (
                          result.value.opt_sent ===
                          Number(result.value.otp_rececived)
                        ) {
                          Swal.fire({
                            icon: "success",
                            title: "Verified",
                            text: "OTP has been successfully verified.",
                          });

                          // ? Sending request to the backend

                          axios
                            .post(`${MATRIMONY_SIGNUP}`, {
                              phoneNumber: result.value.phoneNumber,
                              name: result.value.name,
                              email: result.value.email,
                            })
                            .then((response) => {
                              console.log(response);

                              if (response.data.error) {
                                throw new Error(response.data.error);
                              }
                              const token = response.data.token;
                              // console.log(token);
                              const name = result.value.name;
                              localStorage.setItem("jwtToken", token);
                              localStorage.setItem("userName", name);
                              setUserName(name);
                              navigate(path);
                              // setAction(path);
                            })
                            .catch((error) => {
                              Swal.fire(
                                "Something went wrong",
                                "Please try again later."
                              );
                            });
                        } else {
                          Swal.fire("Wrong OTP", "error");
                        }
                      }
                    });
                  }
                })
                .catch((error) => {
                  Swal.fire("User already Exists!", error.message, "error");
                  // console.log("Something went wrong");
                });
            } else if (result.isDenied) {
              handleAction(path);
            }
          });
        } else if (result.isDenied) {
          // ? Sign In Form

          Swal.fire({
            title: "Sign In",
            html: '<input type="text" id="swal-input1" class="swal2-input" placeholder="Phone Number">',
            focusConfirm: false,
            showDenyButton: true,
            denyButtonText: "Back",
            preConfirm: () => {
              const phoneNumber =
                Swal.getPopup().querySelector("#swal-input1").value;

              // Validation for phone number
              const phoneNumberPattern = /^[0-9]{10}$/; // Adjust this pattern to match the phone number format you want
              if (!phoneNumberPattern.test(phoneNumber)) {
                Swal.showValidationMessage(`Please enter a valid phone number`);
                return false;
              }

              if (!phoneNumber) {
                Swal.showValidationMessage(
                  `Please enter both phone number and password`
                );
                return false;
              }

              return { phoneNumber };
            },
          }).then((result) => {
            if (result.isConfirmed) {
              // ? Checking if the user already exist

              axios
                .post(`${IS_USER_ALREADY_EXIST}`, result.value)
                .then((response) => {
                  // ? If user doesn't already exist, than throw the error.

                  if (!response.data.success) {
                    throw new Error(response.data.message);
                  }

                  // ? Else send the OTP
                  else {
                    // ? Generating and Sending the OTP

                    function opt_generator() {
                      return (
                        Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
                      );
                    }

                    const opt_sent = opt_generator();

                    const opt_message_request_url = `${Fast2SMS_OPT_API_ENDPOINT}?authorization=${Fast2SMS_OPT_API_KEY}&variables_values=${opt_sent}&route=otp&numbers=${result.value.phoneNumber}`;

                    axios
                      .get(opt_message_request_url)
                      .then((response) => {
                        // ? If the OTP is successfully sent, continue

                        console.log(response);
                      })
                      .catch((e) => {
                        // ? If the OTP is not successfully sent, than do this

                        Swal.fire(
                          "Something went wrong",
                          "Please try again later."
                        );

                        console.log(e);
                      });

                    // ? Asking for the OTP from the user.

                    Swal.fire({
                      title: "Enter the OTP",
                      html:
                        '<input type="number" id="swal-input1" class="swal2-input" placeholder="OTP">' +
                        `<p>Please wait while we a send a OTP to ******${result.value.phoneNumber.slice(
                          6
                        )}</p>`,
                      preConfirm: () => {
                        const otp_rececived =
                          Swal.getPopup().querySelector("#swal-input1").value;
                        if (!otp_rececived) {
                          Swal.showValidationMessage(`Please enter the OTP`);
                          return false;
                        }

                        return {
                          opt_sent,
                          otp_rececived,
                          phoneNumber: result.value.phoneNumber,
                        };
                      },
                    }).then((result) => {
                      // ? After taking the input of the image from the user, check if the OTP is correct or not.

                      if (result.isConfirmed) {
                        if (
                          result.value.opt_sent ===
                          Number(result.value.otp_rececived)
                        ) {
                          Swal.fire({
                            icon: "success",
                            title: "Verified",
                            text: "OTP has been successfully verified.",
                          });

                          // ? Sending request to the backend

                          axios
                            .post(`${MATRIMONY_SIGNIN}`, {
                              phoneNumber: result.value.phoneNumber,
                            })
                            .then((response) => {
                              if (response.data.error) {
                                throw new Error(response.data.error);
                              }
                              console.log(response.data);
                              const token = response.data.token;
                              const name = response.data.user.name;

                              localStorage.setItem("jwtToken", token);
                              localStorage.setItem("userName", name);
                              setUserName(name);
                              navigate(path);
                              // setAction(path);
                            })
                            .catch((error) => {
                              Swal.fire(
                                "Something went wrong",
                                "Please try again later."
                              );
                            });
                        } else {
                          Swal.fire("Wrong OTP", "error");
                        }
                      }
                    });
                  }
                })
                .catch((error) => {
                  Swal.fire("User doesn't exist.", error.message, "error");
                });
            } else if (result.isDenied) {
              handleAction(path);
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate(path);
          // setAction(path);
        }
      });
    }
  };

  if (biodata === "") return "";

  return (
    <div>
      {!isLogged ? (
        <div className=" z-50 fixed flex flex-col justify-center gap-8 items-center w-screen h-screen top-0 left-0 bg-[#323233] backdrop-blur-sm bg-opacity-90 overflow-x-auto py-5 px-5">
          <div className="w-full flex flex-col gap-8 justify-center items-center">
            <div className="shadow-xl fade-in bg-[#f7f3f5] rounded-md p-8 flex max-w-full w-fit flex-col justify-center items-center gap-5">
              <p className="text-xl font-Poppins text-center">
                Please Login to see the biodata.
              </p>

              <button
                className="group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
                onClick={() => {
                  handleAction(`/matrimony/biodata/${id}`);
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {biodata === null ? (
        <div className="w-full fade-in flex flex-col justify-center items-center my-12">
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <p className="w-full text-center font-Poppins text-3xl font-semibold text-[#EF4D48]">
              BIODATA NOT FOUND
            </p>
            <p className="w-full text-center font-Poppins text-XL text-[#EF4D48]">
              (404)
            </p>
          </div>
        </div>
      ) : (
        <BiodataFrame info={biodata} />
      )}{" "}
    </div>
  );
};

export default ShowFullBiodata;
