import React from "react";
import Header from "../../../components/matrimony/Header";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6 mt-10 mb-14">
      <div className="w-full flex justify-center items-center ">
        <div className="w-full flex  justify-center items-center gap-5 flex-col">
          <Link to={"/matrimony/add-biodata"}>
            <button className="flex gap-2 w-full justify-center font-Poppins rounded-md bg-indigo-600 px-5 py-4 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <span>Add</span> <strong>BioData</strong>
            </button>
          </Link>

          <Link to={"/matrimony/search-biodata"}>
            <button className="flex gap-2 w-full justify-center  font-Poppins rounded-md bg-indigo-600 px-5 py-4 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <span>Search</span> <strong>BioData</strong>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
