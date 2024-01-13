export function capitalizeSentence(sentence) {
  // Split the sentence into words
  const words = sentence?.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words?.map(
    (word) => word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase()
  );

  // Join the capitalized words back into a sentence
  const capitalizedSentence = capitalizedWords?.join(" ");

  return capitalizedSentence;
}

export function formatAddressString(addressString) {
  if (typeof addressString !== "string" || addressString?.trim() === "") {
    return "Invalid address string";
  }

  // Split the string into words
  const words = addressString?.split(",");

  // Capitalize the first letter of each word
  const formattedWords = words.map(
    (word) =>
      word?.trim()?.charAt(0)?.toUpperCase() +
      word?.trim()?.slice(1)?.toLowerCase()
  );

  // Join the words back into a formatted string
  const formattedAddress = formattedWords?.join(", ");

  return formattedAddress;
}

// Imports for the Swal pop up auth flow

import Swal from "sweetalert2";
import axios from "axios";
import {
  Fast2SMS_OPT_API_ENDPOINT,
  Fast2SMS_OPT_API_KEY,
  IS_USER_ALREADY_EXIST,
  MATRIMONY_SIGNIN,
  MATRIMONY_SIGNUP,
  PHONE_NUMBERS_TO_NOT_VERIFY_OTP_FOR,
} from "./constants";

export const handleSwalSignIN = ({
  path,
  action_toBe_performed_after_successful_signINOrUP,
  setUserName,
}) => {
  Swal.fire({
    title: "Sign In",
    html: '<input type="text" id="swal-input1" class="swal2-input" placeholder="Phone Number">',
    focusConfirm: false,
    showDenyButton: true,
    denyButtonText: "Cancel",
    confirmButtonText: "Submit",
    allowOutsideClick: false,

    preConfirm: () => {
      const phoneNumber = Swal.getPopup().querySelector("#swal-input1").value;

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
      const swalLoading = Swal.fire({
        title: "Please wait...",
        html: `<p class="font-Poppins font-semibold my-2">while we run some authentification checks.</p>`,
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      axios
        .post(`${IS_USER_ALREADY_EXIST}`, result.value)
        .then((response) => {
          // ? If user doesn't already exist, than throw the error.
          swalLoading.close();
          if (!response.data.success) {
            throw new Error(response.data.message);
          }

          // ? Else send the OTP
          else {
            // ? Generating and Sending the OTP

            let opt_sent;

            if (
              // This is surpass some numbers, form the otp verification, for the phone numbers, in the PHONE_NUMBERS_TO_NOT_VERIFY_OTP_FOR array,
              // opt will be 1111, and no otp will be sent to these numbers.

              PHONE_NUMBERS_TO_NOT_VERIFY_OTP_FOR.includes(
                result.value.phoneNumber
              )
            ) {
              opt_sent = 1111;
            } else {
              function opt_generator() {
                return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
              }

              opt_sent = opt_generator();

              const opt_message_request_url = `${Fast2SMS_OPT_API_ENDPOINT}?authorization=${Fast2SMS_OPT_API_KEY}&variables_values=${opt_sent}&route=otp&numbers=${result.value.phoneNumber}`;

              axios
                .get(opt_message_request_url)
                .then((response) => {
                  // ? If the OTP is successfully sent, continue

                  console.log(response);
                })
                .catch((e) => {
                  // ? If the OTP is not successfully sent, than do this
                  console.log(e);
                  Swal.fire("Something went wrong", "Please try again later.");

                  console.log(e);
                });
            }

            // ? Asking for the OTP from the user.

            Swal.fire({
              title: "Enter the OTP",
              html:
                '<input type="number" id="swal-input1" class="swal2-input" placeholder="OTP">' +
                `<p class="font-Poppins font-semibold my-2">Please wait while we a send a OTP to ******${result.value.phoneNumber.slice(
                  6
                )} </p> <p class="font-Poppins font-bold text-sm text-[#EF4D48]">Do not reload the page</p>`,
              confirmButtonText: "Submit",
              allowOutsideClick: false,
              denyButtonText: "Cancel",
              showDenyButton: true,
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
                  result.value.opt_sent === Number(result.value.otp_rececived)
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
                      action_toBe_performed_after_successful_signINOrUP(path);
                    })
                    .catch((error) => {
                      console.log(error);
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
          swalLoading.close();
          if (error.message === "User doesn't exist") {
            Swal.fire({
              title: "User doesn't exist.",
              text: "Would you like to Sign Up.",
              showCancelButton: true,
              confirmButtonText: "Sign Up",
            }).then((result) => {
              if (result.isConfirmed) {
                // ? Sign In Form

                return handleSwalSignUP({
                  path,
                  action_toBe_performed_after_successful_signINOrUP,
                  setUserName,
                });
              }
            });
          } else {
            console.log(error);
            Swal.fire("Error!", error.message, "error");
          }
        });
    }
  });
};

export const handleSwalSignUP = ({
  path,
  action_toBe_performed_after_successful_signINOrUP,
  setUserName,
}) => {
  Swal.fire({
    title: "Sign Up",
    html:
      '<input type="text" id="swal-input1" class="swal2-input" placeholder="Name">' +
      '<input type="text" id="swal-input2" class="swal2-input" placeholder="Phone Number">' +
      '<input type="text" id="swal-input3" class="swal2-input" placeholder="Email (Optional)">',
    focusConfirm: false,
    showDenyButton: true,
    denyButtonText: "Cancel",
    confirmButtonText: "Submit",
    allowOutsideClick: false,
    preConfirm: () => {
      const name = Swal.getPopup().querySelector("#swal-input1").value;
      const phoneNumber = Swal.getPopup().querySelector("#swal-input2").value;
      const email = Swal.getPopup().querySelector("#swal-input3").value;

      // Validation for phone number
      const phoneNumberPattern = /^[0-9]{10}$/; // Adjust this pattern to match the phone number format you want
      if (!phoneNumberPattern.test(phoneNumber)) {
        Swal.showValidationMessage(`Please enter a valid phone number`);
        return false;
      }
      if (!name || !phoneNumber) {
        Swal.showValidationMessage(`Please enter your name, phone number`);
        return false;
      }

      return { name, phoneNumber, email };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // ? Checking if the user already exist
      const swalLoading = Swal.fire({
        title: "Please wait...",
        html: `<p class="font-Poppins font-semibold my-2">while we run some authentification checks.</p>`,
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      axios
        .post(`${IS_USER_ALREADY_EXIST}`, result.value)
        .then((response) => {
          // ? If user already exist, than throw the error.
          swalLoading.close();

          if (response.data.success) {
            throw new Error(response.data.message);
          }

          // ? Else send the OTP
          else {
            // ? Generating and Sending the OTP

            let opt_sent;

            if (
              PHONE_NUMBERS_TO_NOT_VERIFY_OTP_FOR.includes(
                result.value.phoneNumber
              )
            ) {
              opt_sent = 1111;
            } else {
              function opt_generator() {
                return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
              }

              opt_sent = opt_generator();

              const opt_message_request_url = `${Fast2SMS_OPT_API_ENDPOINT}?authorization=${Fast2SMS_OPT_API_KEY}&variables_values=${opt_sent}&route=otp&numbers=${result.value.phoneNumber}`;

              axios
                .get(opt_message_request_url)
                .then((response) => {
                  // ? If the OTP is successfully sent, continue

                  console.log(response);
                })
                .catch((e) => {
                  // ? If the OTP is not successfully sent, than do this
                  console.log(e);
                  Swal.fire("Something went wrong", "Please try again later.");

                  console.log(e);
                });
            }

            // ? Asking for the OTP from the user.

            Swal.fire({
              title: "Enter the OTP",
              html:
                '<input type="number" id="swal-input1" class="swal2-input" placeholder="OTP">' +
                `<p class="font-Poppins font-semibold my-2">Please wait while we a send a OTP to ******${result.value.phoneNumber.slice(
                  6
                )} </p> <p class="font-Poppins font-bold text-sm text-[#EF4D48]">Do not reload the page</p>`,
              confirmButtonText: "Submit",
              allowOutsideClick: false,
              denyButtonText: "Cancel",
              showDenyButton: true,
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
                  result.value.opt_sent === Number(result.value.otp_rececived)
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
                      action_toBe_performed_after_successful_signINOrUP(path);
                    })
                    .catch((error) => {
                      console.log(error);
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
          console.log(error.message);
          swalLoading.close();
          if (error.message === "User do exist") {
            Swal.fire({
              title: "User already exist.",
              text: "Would you like to Sign In.",
              // showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Sign In",
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                // ? Sign In Form

                return handleSwalSignIN({
                  path: path,
                  action_toBe_performed_after_successful_signINOrUP,
                  setUserName,
                });
              }
            });
          } else {
            Swal.fire("Error!", error.message, "error");
          }
          // console.log("Something went wrong");
        });
    }
  });
};
