import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConsentAddBiodata from "./ConsentAddBiodata";
import ConsentSearchBiodata from "./ConsentSearchBiodata";
import Swal from "sweetalert2";
import axios from "axios";
import {
  BASE_URL,
  Fast2SMS_OPT_API_ENDPOINT,
  Fast2SMS_OPT_API_KEY,
  IS_USER_ALREADY_EXIST,
  MATRIMONY_SIGNIN,
  MATRIMONY_SIGNUP,
} from "../../../utils/constants";
import UserContext from "../../../utils/context/UserContext";

const Home = () => {
  // const history = useHistory();
  const { setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const [action, setAction] = useState(null);
  const handleActionState = (path) => {
    setAction(path);
  };
  const handleAction = (path, info) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setAction(path);
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
                  // if (response.data.error) {
                  //   throw new Error(response.data.error);
                  // }

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
                      html: '<input type="number" id="swal-input1" class="swal2-input" placeholder="OTP">',
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
                          // Swal.fire("GOOD");
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
                              setAction(path);
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

                    // return { ...result.value };

                    // here the OTP verification will take place

                    //   function opt_generator() {
                    //     return (
                    //       Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
                    //     );
                    //   }

                    //   const opt_sent = opt_generator();

                    //   const opt_message_request_url = `${Fast2SMS_OPT_API_ENDPOINT}?authorization=${Fast2SMS_OPT_API_KEY}&variables_values=${opt_sent}&route=otp&numbers=${result.value.phoneNumber}`;

                    //   axios
                    //     .get(opt_message_request_url)
                    //     .then((response) => {
                    //       console.log(response);
                    //     })
                    //     .catch((e) => {
                    //       console.log(e);
                    //     });
                    // }

                    // const token = response.data.token;
                    // // console.log(token);
                    // const name = result.value.name;
                    // localStorage.setItem("jwtToken", token);
                    // localStorage.setItem("userName", name);
                    // setUserName(name);
                    // setAction(path);
                    console.log(response);
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

          // For taking OTP input

          // .then((result) => {
          //   if (result.isConfirmed) {
          //     Swal.fire({
          //       title: "Enter the OTP",
          //       html:
          //         '<input type="text" id="swal-input1" class="swal2-input" placeholder="OTP">' +
          //         `<p>OTP sent to ******${result.value.phoneNumber.slice(
          //           6
          //         )}</p>`,
          //       preConfirm: () => {
          //         const otp =
          //           Swal.getPopup().querySelector("#swal-input1").value;
          //         // const phoneNumber =
          //         //   Swal.getPopup().querySelector("#swal-input2").value;
          //         // const email = Swal.getPopup().querySelector("#swal-input3").value; //? Email is optional
          //         // const password =
          //         //   Swal.getPopup().querySelector("#swal-input4").value;

          //         // Validation for phone number
          //         // const otpPattern = /^[0-9]{4}$/; // Adjust this pattern to match the phone number format you want
          //         // if (!phoneNumberPattern.test(phoneNumber)) {
          //         //   Swal.showValidationMessage(`Please enter a valid phone number`);
          //         //   return false;
          //         // }

          //         // // Validation for password
          //         // if (password.length < 6) {
          //         //   Swal.showValidationMessage(
          //         //     `Password should be at least 6 characters`
          //         //   );
          //         //   return false;
          //         // }

          //         if (!otp) {
          //           Swal.showValidationMessage(`Please enter the OTP`);
          //           return false;
          //         }
          //       },
          //     });
          //   } else if (result.isDenied) {
          //     handleAction(path);
          //   }
          // });
          // then((result) => {
          //   if (result.isConfirmed) {
          //     axios
          //       .post(`${BASE_URL}marriage-user/signup`, result.value)
          //       .then((response) => {
          //         if (response.data.error) {
          //           throw new Error(response.data.error);
          //         }
          //         const token = response.data.token;
          //         // console.log(token);
          //         const name = result.value.name;
          //         localStorage.setItem("jwtToken", token);
          //         localStorage.setItem("userName", name);
          //         setUserName(name);
          //         setAction(path);
          //       })
          //       .catch((error) => {
          //         Swal.fire("User already Exists!", error.message, "error");
          //       });
          //   } else if (result.isDenied) {
          //     handleAction(path);
          //   }
          // });
        } else if (result.isDenied) {
          // ? Sign In Form

          Swal.fire({
            title: "Sign In",
            html: '<input type="text" id="swal-input1" class="swal2-input" placeholder="Phone Number">',
            // '<input type="password" id="swal-input2" class="swal2-input" placeholder="Password">' +
            // '<div><input type="checkbox" id="swal-input3"> Show Password</div>',
            focusConfirm: false,
            showDenyButton: true,
            denyButtonText: "Back",
            // didOpen: () => {
            //   document
            //     .getElementById("swal-input3")
            //     .addEventListener("change", function () {
            //       const passwordInput = document.getElementById("swal-input2");
            //       if (this.checked) {
            //         passwordInput.type = "text";
            //       } else {
            //         passwordInput.type = "password";
            //       }
            //     });
            // },
            preConfirm: () => {
              const phoneNumber =
                Swal.getPopup().querySelector("#swal-input1").value;
              // const password =
              //   Swal.getPopup().querySelector("#swal-input2").value;

              // Validation for phone number
              const phoneNumberPattern = /^[0-9]{10}$/; // Adjust this pattern to match the phone number format you want
              if (!phoneNumberPattern.test(phoneNumber)) {
                Swal.showValidationMessage(`Please enter a valid phone number`);
                return false;
              }

              // Validation for password
              // if (password.length < 6) {
              //   Swal.showValidationMessage(
              //     `Password should be at least 6 characters`
              //   );
              //   return false;
              // }

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
                  // if (response.data.error) {
                  //   throw new Error(response.data.error);
                  // }

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
                      html: '<input type="number" id="swal-input1" class="swal2-input" placeholder="OTP">',
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
                              setAction(path);
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

                    // return { ...result.value };

                    // here the OTP verification will take place

                    //   function opt_generator() {
                    //     return (
                    //       Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
                    //     );
                    //   }

                    //   const opt_sent = opt_generator();

                    //   const opt_message_request_url = `${Fast2SMS_OPT_API_ENDPOINT}?authorization=${Fast2SMS_OPT_API_KEY}&variables_values=${opt_sent}&route=otp&numbers=${result.value.phoneNumber}`;

                    //   axios
                    //     .get(opt_message_request_url)
                    //     .then((response) => {
                    //       console.log(response);
                    //     })
                    //     .catch((e) => {
                    //       console.log(e);
                    //     });
                    // }

                    // const token = response.data.token;
                    // // console.log(token);
                    // const name = result.value.name;
                    // localStorage.setItem("jwtToken", token);
                    // localStorage.setItem("userName", name);
                    // setUserName(name);
                    // setAction(path);
                    console.log(response);
                  }
                })
                .catch((error) => {
                  Swal.fire("User doesn't exist.", error.message, "error");
                  // console.log("Something went wrong");
                });

              // axios
              //   .post(`${BASE_URL}marriage-user/signin`, result.value)
              //   .then((response) => {
              //     if (response.data.error) {
              //       throw new Error(response.data.error);
              //     }
              //     console.log(response.data);
              //     const token = response.data.token;
              //     const name = response.data.user.name;

              //     localStorage.setItem("jwtToken", token);
              //     localStorage.setItem("userName", name);
              //     setUserName(name);
              //     setAction(path);
              //   })
              //   .catch((error) => {
              //     Swal.fire("Wrong Credentials!", error.message, "error");
              //   });
            } else if (result.isDenied) {
              handleAction(path);
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setAction(path);
        }
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6 mt-10 mb-14">
      <div className="w-full flex gap-5 max-w-6xl flex-col-reverse sm:flex-row justify-center items-center ">
        {/* Available Actions */}
        <div className="w-full flex  justify-center items-center gap-5 flex-col">
          <div className="w-fit flex flex-col justify-center items-center gap-5">
            <button
              onClick={() => {
                handleAction("/matrimony/add-biodata");
              }}
              className="flex gap-2 w-full justify-center font-Poppins rounded-md bg-indigo-600 px-5 py-4 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span>Add</span> <strong>BioData</strong>
            </button>

            <button
              onClick={() => {
                handleAction("/matrimony/search-biodata");
              }}
              className="flex gap-2 w-full justify-center  font-Poppins rounded-md bg-indigo-600 px-5 py-4 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span>Search</span> <strong>BioData</strong>
            </button>

            {localStorage.getItem("jwtToken") && (
              <>
                <button
                  onClick={() => {
                    navigate("/matrimony/biodata");
                  }}
                  className="flex gap-2 w-full justify-center font-Poppins rounded-md bg-indigo-600 px-5 py-4 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <span>View</span> <strong>BioDatas</strong>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {action === "/matrimony/add-biodata" ? (
        <ConsentAddBiodata />
      ) : action === "/matrimony/search-biodata" ? (
        <ConsentSearchBiodata />
      ) : null}
    </div>
  );
};

export default Home;
