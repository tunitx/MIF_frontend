import React, { useState, useContext } from "react";
import Header from "../../../components/matrimony/Header";
import { Link, useNavigate } from "react-router-dom";
import ConsentAddBiodata from "./ConsentAddBiodata";
import ConsentSearchBiodata from "./ConsentSearchBiodata";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../utils/context/UserContext";
import mifHead from "../../../../assests/images/mifHead.webp";

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
          Swal.fire({
            title: "Sign Up",
            html:
              '<input type="text" id="swal-input1" class="swal2-input" placeholder="Name">' +
              '<input type="text" id="swal-input2" class="swal2-input" placeholder="Phone Number">' +
              '<input type="text" id="swal-input3" class="swal2-input" placeholder="Email (Optional)">' +
              '<input type="password" id="swal-input4" class="swal2-input" placeholder="Password">'+
              '<div><input type="checkbox" id="swal-input5"> Show Password</div>',
            focusConfirm: false,
            showDenyButton: true,
            denyButtonText: "Back",
            didOpen: () => {
              document.getElementById('swal-input5').addEventListener('change', function () {
                const passwordInput = document.getElementById('swal-input4');
                if (this.checked) {
                  passwordInput.type = 'text';
                } else {
                  passwordInput.type = 'password';
                }
              });
            },
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
                  setAction(path);
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
              '<input type="password" id="swal-input2" class="swal2-input" placeholder="Password">'+
              '<div><input type="checkbox" id="swal-input3"> Show Password</div>',
            focusConfirm: false,
            showDenyButton: true,
            denyButtonText: "Back",
            didOpen: () => {
              document.getElementById('swal-input3').addEventListener('change', function () {
                const passwordInput = document.getElementById('swal-input2');
                if (this.checked) {
                  passwordInput.type = 'text';
                } else {
                  passwordInput.type = 'password';
                }
              });
            },
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
                  setAction(path);
                })
                .catch((error) => {
                  Swal.fire("Wrong Credentials!", error.message, "error");
                });
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
        {/* Marwadi Head */}

        <div className="w-full flex  justify-center items-center gap-2 flex-col">
          <img src={mifHead} alt="cap" className="rounded-md max-w-[200px]" />
          <p className="text-3xl font-Poppins text-[#333] font-semibold mt-4">
            Makkhan Lal Kanda
          </p>
          <p className="text-base font-Poppins text-[#333] font-semibold">
            National Convenor
          </p>
          <p className="text-base font-Poppins text-[#333] font-semibold">
            MIF Marwadi Matrimony
          </p>
        </div>

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
