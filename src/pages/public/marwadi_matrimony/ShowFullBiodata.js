import React, { useEffect, useState, useContext } from "react";
import { GET_BIODATA_BY_ID, BASE_URL } from "../../../utils/constants";
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
      // setAction(path);
      navigate(path);
      return;
    } else {
      Swal.fire({
        title: "Are you a new user?",
        showDenyButton: true,
        confirmButtonText: "Sign Up",
        denyButtonText: "Sign In",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Sign Up",
            html:
              '<input type="text" id="swal-input1" class="swal2-input" placeholder="Name">' +
              '<input type="text" id="swal-input2" class="swal2-input" placeholder="Phone Number">' +
              '<input type="text" id="swal-input3" class="swal2-input" placeholder="Email (Optional)">' +
              '<input type="password" id="swal-input4" class="swal2-input" placeholder="Password">',
            focusConfirm: false,
            showDenyButton: true,
            denyButtonText: "Back",
            preConfirm: () => {
              const name = Swal.getPopup().querySelector("#swal-input1").value;
              const phoneNumber =
                Swal.getPopup().querySelector("#swal-input2").value;
              const email = Swal.getPopup().querySelector("#swal-input3").value; //? Email is optional
              const password =
                Swal.getPopup().querySelector("#swal-input4").value;

              // Validation for phone number
              const phoneNumberPattern = /^[0-9]{10}$/; // Adjust this pattern to match the phone number format you want
              if (!phoneNumberPattern.test(phoneNumber)) {
                Swal.showValidationMessage(`Please enter a valid phone number`);
                return false;
              }

              // Validation for password
              if (password.length < 6) {
                Swal.showValidationMessage(
                  `Password should be at least 6 characters`
                );
                return false;
              }

              if (!name || !phoneNumber || !password) {
                Swal.showValidationMessage(
                  `Please enter your name, phone number, and password`
                );
                return false;
              }

              return { name, phoneNumber, email, password };
            },
          }).then((result) => {
            if (result.isConfirmed) {
              axios
                .post(`${BASE_URL}marriage-user/signup`, result.value)
                .then((response) => {
                  if (response.data.error) {
                    throw new Error(response.data.error);
                  }
                  const token = response.data.token;
                  // console.log(token);
                  const name = result.value.name;
                  localStorage.setItem("jwtToken", token);
                  localStorage.setItem("userName", name);
                  setUserName(name);
                  // setAction(path);
                  navigate(path);
                })
                .catch((error) => {
                  Swal.fire("User already Exists!", error.message, "error");
                });
            } else if (result.isDenied) {
              handleAction(path);
            }
          });
        } else if (result.isDenied) {
          Swal.fire({
            title: "Sign In",
            html:
              '<input type="text" id="swal-input1" class="swal2-input" placeholder="Phone Number">' +
              '<input type="password" id="swal-input2" class="swal2-input" placeholder="Password">',
            focusConfirm: false,
            showDenyButton: true,
            denyButtonText: "Back",
            preConfirm: () => {
              const phoneNumber =
                Swal.getPopup().querySelector("#swal-input1").value;
              const password =
                Swal.getPopup().querySelector("#swal-input2").value;

              // Validation for phone number
              const phoneNumberPattern = /^[0-9]{10}$/; // Adjust this pattern to match the phone number format you want
              if (!phoneNumberPattern.test(phoneNumber)) {
                Swal.showValidationMessage(`Please enter a valid phone number`);
                return false;
              }

              // Validation for password
              if (password.length < 6) {
                Swal.showValidationMessage(
                  `Password should be at least 6 characters`
                );
                return false;
              }

              if (!phoneNumber || !password) {
                Swal.showValidationMessage(
                  `Please enter both phone number and password`
                );
                return false;
              }

              return { phoneNumber, password };
            },
          }).then((result) => {
            if (result.isConfirmed) {
              axios
                .post(`${BASE_URL}marriage-user/signin`, result.value)
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
                  // setAction(path);
                  navigate(path);
                })
                .catch((error) => {
                  Swal.fire("Wrong Credentials!", error.message, "error");
                });
            } else if (result.isDenied) {
              handleAction(path);
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // setAction(path);
          navigate(path);
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
