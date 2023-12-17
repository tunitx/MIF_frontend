import React, { useState, useContext } from "react";
import Header from "../../../components/matrimony/Header";
import { Link, useNavigate } from "react-router-dom";
import ConsentAddBiodata from "./ConsentAddBiodata";
import ConsentSearchBiodata from "./ConsentSearchBiodata";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
        showCancelButton: true,
        confirmButtonText: "Sign Up",
        denyButtonText: "Sign In",
        cancelButtonText: "Guest",
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
              '<input type="password" id="swal-input2" class="swal2-input" placeholder="Password">',
            focusConfirm: false,
            showDenyButton: true,
            denyButtonText: "Back",
            preConfirm: () => {
              const phoneNumber =
                Swal.getPopup().querySelector("#swal-input1").value;
              const password =
                Swal.getPopup().querySelector("#swal-input2").value;
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
      <div className="w-full flex justify-center items-center ">
        <div className="w-full flex  justify-center items-center gap-5 flex-col">
          <button
            onClick={() => {
              handleAction("/matrimony/add-biodata");
            }}
            className="flex gap-2  justify-center font-Poppins rounded-md bg-indigo-600 px-5 py-4 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span>Add</span> <strong>BioData</strong>
          </button>

          <button
            onClick={() => {
              handleActionState("/matrimony/search-biodata");
            }}
            className="flex gap-2  justify-center  font-Poppins rounded-md bg-indigo-600 px-5 py-4 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span>Search</span> <strong>BioData</strong>
          </button>

          {localStorage.getItem("jwtToken") && (
            <>
              <button
                onClick={() => {
                  navigate("/matrimony/biodata");
                }}
                className="flex gap-2  justify-center font-Poppins rounded-md bg-indigo-600 px-5 py-4 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span>View</span> <strong>BioDatas</strong>
              </button>

             
            </>
          )}
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
