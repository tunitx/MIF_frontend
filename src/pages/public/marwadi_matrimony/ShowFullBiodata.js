import React, { useEffect, useState, useContext } from "react";
import { GET_BIODATA_BY_ID } from "../../../utils/constants";
import { useParams } from "react-router-dom";
import BiodataFrame from "./biodataFrame/BiodataFrame";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../../../utils/context/UserContext";
import { handleSwalSignIN, handleSwalSignUP } from "../../../utils/helper";

const ShowFullBiodata = () => {
  const { id } = useParams();

  const [biodata, setBiodata] = useState("");
  // console.log(biodata);

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
        // console.log("sadfadf");
        const resBody = await fetch(`${GET_BIODATA_BY_ID}${id}`);
        // console.log(resBody);
        if (resBody.status === 200) {
          const resData = await resBody.json();
          setBiodata(resData);
          // console.log(resData);
        } else {
          // console.log("NOT FOUND");
          setBiodata(null);
        }
      } catch (e) {
        // console.log("uipoui");
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
        title: "What would you like to do:",
        showDenyButton: true,
        confirmButtonText: "Sign Up",
        denyButtonText: "Sign In",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          // ? Sign Up Form

          return handleSwalSignUP({
            path: path,
            action_toBe_performed_after_successful_signINOrUP: navigate,
            setUserName,
          });
        } else if (result.isDenied) {
          // ? Sign In

          return handleSwalSignIN({
            path: path,
            action_toBe_performed_after_successful_signINOrUP: navigate,
            setUserName,
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
    <div className="relative w-full">
      {!isLogged ? (
        <div className=" z-50 fixed flex flex-col justify-center gap-8 items-center w-screen h-screen top-0 left-0 bg-[#323233] backdrop-blur-sm bg-opacity-90 overflow-x-auto py-5 px-5">
          <div className="w-full flex flex-col gap-8 justify-center items-center">
            <div className="shadow-xl fade-in bg-[#f7f3f5] rounded-md p-8 flex max-w-full w-fit flex-col justify-center items-center gap-5">
              <p className="text-xl font-Poppins text-center">
                Please Sign In/Sign Up to see the biodata.
              </p>

              <button
                className="group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
                onClick={() => {
                  handleAction(`/matrimony/biodata/${id}`);
                }}
              >
                Go
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
      )}
    </div>
  );
};

export default ShowFullBiodata;
