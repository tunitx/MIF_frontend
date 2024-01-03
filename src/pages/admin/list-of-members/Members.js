
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../utils/constants';

const api = axios.create({
  baseURL: BASE_URL || 'http://localhost:3000',
});

const Members = () => {
  const [members, setMembers] = useState([]);
  const [memberTypes, setMemberTypes] = useState([]);
  const [pfp, setPfp] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [inputValue, setInputValue] = useState('10');
  useEffect(() => {
    api.get('/getMemberDetails')
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the data: ', error);
      });
    api.get('/member/memberType/all')
      .then(response => {
        setMemberTypes(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the member types: ', error);
      });

  }, []);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
};
const handleInputBlur = () => {
    const newValue = parseInt(inputValue, 10);
    if (!isNaN(newValue) && newValue > 0) {
        setItemsPerPage(newValue);
    } else {
        setInputValue(itemsPerPage.toString());
    }
};
  const handleEdit = (id, editedMember) => {
    const formData = new FormData();
    Object.keys(editedMember).forEach(key => {
      if (key === 'pfp' && editedMember[key] instanceof Blob) {
        console.log(`Appending file with name: ${editedMember[key].name}`);
        formData.append(key, editedMember[key], editedMember[key].name);
      } else if (key === 'memberType' && typeof editedMember[key] === 'object' && editedMember[key] !== null) {
        formData.append(key, editedMember[key]._id);
      } else {
        formData.append(key, editedMember[key]);
      }
    });

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    api.put(`/member/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        // const updatedMemberType = memberTypes.find(type => type._id === editedMember.memberType);
        // setMembers(members.map(member => member._id === id ? { ...member, ...editedMember, memberType: updatedMemberType } : member));
        setMembers(members.map(member => member._id === id ? response.data : member));
        setPfp(null);
      })
      .catch(error => {
        console.error('There was an error updating the member: ', error);
      });
  };

  const handleDelete = (id) => {
    api.delete(`/member/${id}`)
      .then(() => {
        setMembers(members.filter(member => member._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the member: ', error);
      });
  };

  return (
    <div className="overflow-x-auto fade-in w-full flex justify-center flex-col items-center">
      <table className="w-full border-2 border-[#305D2B] max-w-7xl">
        <thead className="w-full">
          <tr className="bg-[#305D2B] text-white w-full">
            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
              Image
            </th>
            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
              Name
            </th>
            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
              Profession
            </th>
            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
              Member Type
            </th>
            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
              Native Place
            </th>
            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
              edit
            </th>
            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
              delete
            </th>
          </tr>
        </thead>



        <tbody className="w-full">


          {members
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((member, index, _id) => (
            // <tr key={index}>

            <Member
              member={member}
              onEdit={handleEdit}
              onDelete={handleDelete}
              pfp={pfp}
              setPfp={setPfp}
              memberTypes={memberTypes}
              _id={_id}
            />


          ))}
        </tbody>
      </table>

      <div className="flex justify-center space-x-4 mt-4 mb-8">
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

                <div className="flex justify-center space-x-4 ">
          <input
            type="number"
            min="1"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="px-2 py-1 rounded border-2 border-gray-300 mr-2 ml-24"

            aria-label="Set items per page"
          />

          <button
            className="px-4 py-2 rounded bg-blue-500 text-white"
            onClick={handleInputBlur}
          >
            Go
          </button>

        </div>
            </div>
    </div>
  );
};

const Member = ({ member, onEdit, onDelete, memberTypes, pfp, setPfp, _id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState({ ...member });

  useEffect(() => {
    setEditedMember({ ...member });
  }, [member]);

  const handleInputChange = (event) => {
    setEditedMember({ ...editedMember, [event.target.name]: event.target.value });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPfp(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedMember({ ...editedMember, pfp: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (

    <>


      {isEditing ? (
        <>
          <div className="w-fit p-3 border border-indigo-900 rounded-md flex flex-col gap-5 justify-center items-center max-w-[800px] " >



            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="name" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                NAME* :
              </label>

              <input name="name" className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" value={editedMember.name} onChange={handleInputChange} placeholder="Name" />
            </div>
            <div className="w-full flex gap-2 items-center justify-center">
              <label
                htmlFor="memberType"
                className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap  text-[#444] "
              >Select Member Type*:</label>

              <select
                name="memberType"
                value={editedMember.memberType._id}
                onChange={handleInputChange}
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
              >
                {memberTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </select>

            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="profession" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                PROFESSION* :
              </label>

              <input className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" name="profession" value={editedMember.profession} onChange={handleInputChange} placeholder="Profession" />

            </div>
            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="nativePlace" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                NATIVE PLACE* :
              </label>

              <input className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" name="nativePlace" value={editedMember.nativePlace} onChange={handleInputChange} placeholder="Native Place" />

            </div>


            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="email" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                EMAIL* :
              </label>
              <input className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" name="email" value={editedMember.email} onChange={handleInputChange} placeholder="Email" />

            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="address" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                ADDRESS* :
              </label>
              <input className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" name="address" value={editedMember.address} onChange={handleInputChange} placeholder="Address" />

            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="phoneNumber" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                PHONE NUMBER* :
              </label>
              <input className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" name="phoneNumber" value={editedMember.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" />

            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="pfp" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                PROFILE PHOTO* :
              </label>
              <input type="file" name="pfp" onChange={handleFileChange} />

              {pfp ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="2rem"
                  viewBox="0 0 512 512"
                  // fill="#EF4D48"
                  className="fade-in fill-green-700"
                >

                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                </svg>
              ) : null}
            </div>
            <div className="flex gap-2">


              <div
                className={`w-full justify-center sm:justify-start flex`}
              >
                <button
                  onClick={() => {
                    onEdit(member._id, editedMember);
                    setIsEditing(false);
                    Swal.fire(
                      'Updated!',
                      'User data has been updated.',
                      'success'
                    );
                  }}
                  type="button"
                  className="group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
                >

                  <p className="group-hover:-translate-x-1 transition duration-150 delay-150">
                    Submit
                  </p>{" "}
                </button>
              </div>


              <div
                className={`w-full justify-center sm:justify-start flex`}
              >
                <button
                  onClick={() => { setIsEditing(false); }}
                  type="button"
                  className="group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
                >

                  <p className="group-hover:-translate-x-1 transition duration-150 delay-150">
                    Cancel
                  </p>{" "}
                </button>
              </div>
            </div>
          </div>

        </>
      ) : (
        <>


          <tr
            key={_id}
            className="border-b border-[#EF4D48] w-full align-middle"
          >

            <td className=" p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins">
              <img src={member.pfp} alt="" className="object-cover rounded-full w-24 h-24" />
            </td>
            <td className="  p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins">
              {member.name}
            </td>
            <td className="  p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins">
              {member.profession}
            </td>
            <td className="  p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins">
              {member.memberType.name}
            </td>
            <td className="  p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins">
              {member.nativePlace}
            </td>
            <td className="  p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins">
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
                type="button"
                className="group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
              >
                <p className="group-hover:-translate-x-1 transition duration-150 delay-150">
                  Edit
                </p>{" "}
              </button>
            </td>
            <td className="  p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins">
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
                </p>{" "}
              </button>
            </td>
          </tr>



        </>
      )
      }
    </>

  );

};

export default Members;


