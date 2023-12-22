import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Registration from "./Registration";
import { BASE_URL } from "../../../utils/constants";
import BiodataCard from "./BiodataCard";
import EditBioData from "./EditBioData";
// import {BASE_URL} from "../../../utils/constants";
const api = axios.create({
  baseURL: BASE_URL,
});

const BiodataTable = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [selectedBiodata, setSelectedBiodata] = useState(null);

  const [editingBiodata, setEditingBiodata] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios
        .get(`${BASE_URL}getBiodatas`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setBiodatas(response.data);
        })
        .catch((error) => {
          console.error("Error fetching biodata", error);
        });
    } else {
      navigate("/matrimony");
    }
  }, []);

  const handleEdit = (biodata) => {
    setEditingBiodata(biodata);
  };

  const handleView = (biodata) => {
    setSelectedBiodata(biodata);
  };

  const handleDiscard = async (biodata) => {
    const result = await Swal.fire({
      title: 'Would you like to delete this Bio Data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Edit Bio Data',
      html: '<button id="maturedButton" class="swal2-confirm swal2-styled">Matured</button>', // Add the Matured button
      didOpen: () => {
        document.getElementById('maturedButton').addEventListener('click', async () => {
          try {
            await axios.post(`${BASE_URL}maturedBioData/${biodata._id}`);
            Swal.fire(
              'Matured!',
              'The biodata has been marked as matured.',
              'success'
            )
          } catch (error) {
            Swal.fire(
              'Error!',
              'There was an error marking the biodata as matured.',
              'error'
            )
          }
        });
      }
    })
    
    if (result.isConfirmed) {
      try {
        await axios.post(`${BASE_URL}discardBioData/${biodata._id}`);
        Swal.fire(
          'Discarded!',
          'The biodata has been discarded.',
          'success'
        )
        // Refresh the biodatas or remove the discarded one from the state here
      } catch (error) {
        Swal.fire(
          'Error!',
          'There was an error discarding the biodata.',
          'error'
        )
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      handleEdit(biodata);
    }
  
    if (result.isConfirmed) {
      try {
        await axios.post(`${BASE_URL}discardBioData/${biodata._id}`);
        Swal.fire(
          'Discarded!',
          'The biodata has been discarded.',
          'success'
        )
        // Refresh the biodatas or remove the discarded one from the state here
      } catch (error) {
        Swal.fire(
          'Error!',
          'There was an error discarding the biodata.',
          'error'
        )
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      handleEdit(biodata);
    }
  }

  return (
    <>
      <div className="overflow-x-auto fade-in w-full flex justify-center mb-44">
        {editingBiodata ? (
          <EditBioData
            biodata={editingBiodata}
            setEditingBiodata={setEditingBiodata}
          />
        ) : biodatas.length > 0 ? (
          <table className="w-full border-2 border-[#305D2B] max-w-7xl">
            <thead className="w-full">
              <tr className="bg-[#305D2B] text-white w-full">
                <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                  Name
                </th>
                <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                  Created At
                </th>
                <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins"></th>
                <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins"></th>
              </tr>
            </thead>
            <tbody className="w-full">
            {biodatas.filter(biodata => !biodata.discard && !biodata.matured).map((biodata) =>  (
                <tr
                  key={biodata._id}
                  className="border-b border-[#EF4D48] w-full align-middle"
                >
                  <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                    {biodata.firstName} {biodata.surname}
                  </td>
                  <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                    {new Date(biodata.timestamp).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-Poppins">
                    <button onClick={() => {
                     
                      handleDiscard(biodata)
                    }}>Edit</button>
                  </td>
                  <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-Poppins">
                    {selectedBiodata ? (
                      <button onClick={() => setSelectedBiodata(null)}>
                        Close
                      </button>
                    ) : (
                      <button onClick={() => handleView(biodata)}>View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-500 text-lg">
            You have not created any bio data's yet :)
          </p>
        )}
      </div>

      <div className="w-full grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3   gap-4">
        {selectedBiodata && <BiodataCard data={selectedBiodata} />}
      </div>
      <div className="flex justify-center">
        {selectedBiodata && (
          <button
            onClick={() => setSelectedBiodata(null)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close Biodata
          </button>
        )}
      </div>
    </>
  );
};

export default BiodataTable;
