import React, { useState } from "react";
import Header from "../../../components/matrimony/Header";
import { Link } from "react-router-dom";
import ConsentAddBiodata from "./ConsentAddBiodata";
import ConsentSearchBiodata from "./ConsentSearchBiodata";

const Home = () => {
  const [action, setAction] = useState(null);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6 mt-10 mb-14">
      <div className="w-full flex justify-center items-center ">
        <div className="w-full flex  justify-center items-center gap-5 flex-col">
          {/* <Link to={"/matrimony/add-biodata"}> */}
          <button
            onClick={() => {
              setAction("/matrimony/add-biodata");
            }}
            className="flex gap-2  justify-center font-Poppins rounded-md bg-indigo-600 px-5 py-4 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span>Add</span> <strong>BioData</strong>
          </button>
          {/* </Link> */}

          {/* <Link to={"/matrimony/search-biodata"}> */}
          <button
            onClick={() => {
              setAction("/matrimony/search-biodata");
            }}
            className="flex gap-2  justify-center  font-Poppins rounded-md bg-indigo-600 px-5 py-4 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span>Search</span> <strong>BioData</strong>
          </button>
          {/* </Link> */}
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
