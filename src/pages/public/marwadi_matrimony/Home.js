import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConsentAddBiodata from "./ConsentAddBiodata";
import ConsentSearchBiodata from "./ConsentSearchBiodata";
import Swal from "sweetalert2";
import { handleSwalSignIN, handleSwalSignUP } from "../../../utils/helper";
import UserContext from "../../../utils/context/UserContext";

const Home = () => {
  // const history = useHistory();
  const { setUserName } = useContext(UserContext);

  const [action, setAction] = useState(null);

  const handleAction = (path, info) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setAction(path);
    } else {
      const topLevelSwalForAuth = Swal.mixin({
        title: "Are you a new user?",
        showDenyButton: true,
        confirmButtonText: "Sign Up",
        denyButtonText: "Sign In",
      });

      topLevelSwalForAuth.fire().then((result) => {
        if (result.isConfirmed) {
          // ? Sign Up Form

          return handleSwalSignUP({
            path: path,
            action_toBe_performed_after_successful_signINOrUP: setAction,
            setUserName,
          });
        } else if (result.isDenied) {
          // ? Sign In

          return handleSwalSignIN({
            path: path,
            action_toBe_performed_after_successful_signINOrUP: setAction,
            setUserName,
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

            {/* <Link to={"/matrimony/office-bearers"} className="w-full">
              <button className="flex gap-2 w-full justify-center font-Poppins rounded-md bg-indigo-600 px-5 py-4 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Office Bearers <br /> (MIF Marwadi Matrimony)
              </button>
            </Link> */}

            {/* 
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
            )} */}
          </div>
        </div>
      </div>

      {action === "/matrimony/add-biodata" ? (
        <ConsentAddBiodata setAction={setAction} />
      ) : action === "/matrimony/search-biodata" ? (
        <ConsentSearchBiodata setAction={setAction} />
      ) : null}
    </div>
  );
};

export default Home;
