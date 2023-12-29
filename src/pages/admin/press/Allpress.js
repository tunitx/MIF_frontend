import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../utils/constants";

const api = axios.create({
  baseURL: BASE_URL || "http://localhost:3000",
});

const Presses = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);


  useEffect(() => {
    api
      .get("/press/all")
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error("There was an error retrieving the data: ", error);
      });
  }, []);

  const handleDelete = (id) => {
    api
      .delete(`/press/${id}`)
      .then(() => {
        setMembers(members.filter((member) => member._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the member: ", error);
      });
  };

  return (
    <div className="w-fit flex flex-row gap-5 flex-wrap max-w-[100%] items-center" >
      {members
       .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((member, index) => (
        <div key={index}>
          <Press member={member} onDelete={handleDelete} />
        </div>
      ))}
   <div className="flex justify-center space-x-4 mt-4 ml-12">
                <button
                    className={`px-4 py-2 rounded bg-blue-500 text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: Math.ceil(members.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={`px-4 py-2 rounded bg-blue-500 text-white ${currentPage === Math.ceil(members.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() =>
                        setCurrentPage((old) => Math.min(old + 1, Math.ceil(members.length / itemsPerPage)))
                    }
                    disabled={currentPage === Math.ceil(members.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
      
    </div>
  );
};
const Press = ({ member, onDelete }) => {
  const viewImage = () => {
    Swal.fire({
      imageUrl: member.imageURL,
      imageAlt: 'Profile',
    });
  };
  return (
    <div className="w-fit flex flex-row gap-5 max-w-[700px]">
      <div className="w-fit p-3 border border-indigo-900 rounded-md flex flex-col gap-5 justify-center items-center w-90%">
        <div className="p-5 pb-0 min-w-[100px] min-h-[200px]">
          <img src={member.imageURL} alt="Profile" className="w-42 h-32 " />
          <button onClick={viewImage} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View
          </button>
        </div>
        <div className="w-full flex-col flex justify-center text-center">
          <p className="font-Poppins text-center text-2xl font-semibold text-[#EF4D48]">
            Month: {member.month}
          </p>
          <p className="font-Poppins text-center text-2xl font-semibold text-[#EF4D48]">
            Year: {member.year}
          </p>
        </div>

        <div flex gap-2>
          <div className={`w-full justify-center sm:justify-start flex`}>
            <button
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    onDelete(member._id);
                    Swal.fire(
                      "Deleted!",
                      "Your file has been deleted.",
                      "success"
                    );
                  }
                });
              }}
              type="button"
              className="group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
            >
              <p className="group-hover:-translate-x-1 transition duration-150 delay-150">
                Delete
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presses;
