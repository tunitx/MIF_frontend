import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../utils/constants';

const api = axios.create({
  baseURL: BASE_URL || 'http://localhost:3000',
});

const Presses = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    api.get('/press/all')
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the data: ', error);
      });
  }, []);

  const handleDelete = (id) => {
    api.delete(`/press/${id}`)
      .then(() => {
        setMembers(members.filter(member => member._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the member: ', error);
      });
  };

  return (
    <div className="w-fit flex flex-row gap-5 flex-wrap max-w-[100%]">
      {members.map((member, index) => (
        <div key={index}>
          <Press member={member} onDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};
const Press = ({ member, onDelete }) => {
    return (
      <div className="w-fit flex flex-row gap-5 max-w-[700px]">
        <div className="w-fit p-3 border border-indigo-900 rounded-md flex flex-col gap-5 justify-center items-center w-90%">
          <div className="p-5 pb-0 min-w-[100px] min-h-[200px]">
            <img src={member.imageURL} alt="Profile" className="rounded-md" />
          </div>
          <div className="w-full flex-col flex justify-center text-center">
            <p className="font-Poppins text-center text-2xl font-semibold text-[#EF4D48]">Month: {member.month}</p>
            <p className="font-Poppins text-center text-2xl font-semibold text-[#EF4D48]">Year: {member.year}</p>
          </div>

          <div flex gap-2>

          <div className={`w-full justify-center sm:justify-start flex`}>
            <button
              onClick={() => {
                Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    onDelete(member._id);
                    Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                  }
                })
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
