import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../utils/context/UserContext";
import Swal from "sweetalert2";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const location = useLocation();
  // console.log(location);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const { userName, setUserName } = useContext(UserContext);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "userName") {
        setUserName(localStorage.getItem("userName"));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  console.log(userName);
  return (
    <div className="w-full flex flex-col items-center gap-5 justify-center p-5 ">
      <div className="w-full flex-col gap-4 sm:flex-row-reverse flex justify-between items-center ">
        <div className="w-full sm:w-fit flex gap-4 sm:justify-center justify-between  flex-row-reverse items-center">
          {localStorage.getItem("jwtToken") && (
            <>
              <button
                className="flex  justify-center  max-w-[200px] rounded-md bg-[#EF4D48] px-3  py-2  text-sm sm:text-base font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                onClick={() => {
                  Swal.fire("Logged out", "Please sign in/sign up", "info");
                  localStorage.removeItem("jwtToken");
                  localStorage.removeItem("userName"); // remove the userName from local storage
                  setUserName(null);
                  navigate("/matrimony");
                }}
              >
                <span>Log out</span>
              </button>
              <button
                className="flex  justify-center  whitespace-nowrap rounded-md bg-[#EF4D48] px-3  py-2  text-sm sm:text-base font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                onClick={() => {
                  navigate("/matrimony/biodata");
                }}
              >
                <span>Edit Uploaded Biodatas</span>
              </button>
            </>
          )}
        </div>

        {location.pathname === "/matrimony" && (
          <div>
            {" "}
            <Link to={"/matrimony/office-bearers"} className="w-full">
              <button className="flex gap-2 w-full justify-center font-Poppins rounded-md bg-[#EF4D48] px-3  py-2  text-sm sm:text-base font-semibold leading-6 text-white shadow-sm  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Office Bearers <br /> (MIF Marwadi Matrimony)
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="w-full max-w-6xl flex justify-center items-center flex-col gap-4">
        <p className="w-fit font-PlayFair border-2 px-3 py-2 text-xl font-bold border-orange-400 md:text-2xl xl:text-4xl">
          {" "}
          MIF Marwadi Matrimony
        </p>
        {userName && (
          <h1 className="font-Poppins text-xl font-bold text-red-500 text-center">
            Welcome, {capitalizeFirstLetter(userName)}
          </h1>
        )}

        <div className="flex relative">
          <div className="flex items-center gap-[2px]">
            <div className="h-1 rounded-l-lg bg-[#000] w-16"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.7em"
              viewBox="0 0 512 512"
              stroke="green"
              strokeWidth="1px"
              fill="#E26464"
              className="stroke-2 stroke-orange-800"
            >
              {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
              <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
            </svg>
          </div>
          <div className="relative items-center gap-[2px] flex -left-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.7em"
              viewBox="0 0 512 512"
              stroke="green"
              strokeWidth="1px"
              fill="#E26464"
              className="stroke-2 stroke-orange-800"
            >
              {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
              <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
            </svg>
            <div className="h-1 rounded-r-lg bg-[#000] w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
