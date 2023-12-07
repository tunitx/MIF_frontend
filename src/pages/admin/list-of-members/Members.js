
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
    <div className="w-fit flex flex-row gap-5 flex-wrap max-w-[100%]">
      {members.map((member, index) => (
        <div key={index}>
          <Member member={member} onEdit={handleEdit} onDelete={handleDelete} memberTypes={memberTypes} pfp ={pfp} setPfp={setPfp} />
        </div>
      ))}
    </div>
  );
};

const Member = ({ member, onEdit, onDelete, memberTypes, pfp,setPfp }) => {
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

    <div className="w-fit flex flex-row gap-5 max-w-[700px]">

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
          <div className="w-fit p-3 border border-indigo-900 rounded-md flex flex-col gap-5 justify-center items-center w-100%">
            <div className="p-5 pb-0 min-w-[100px] min-h-[200px]">
              <img src={member.pfp} alt="Profile" className="rounded-md" />
            </div>
            <div className="w-full flex-col flex  justify-center text-center">
              <p className="font-Poppins  text-center text-2xl font-semibold text-[#EF4D48]" >NAME: {member.name}</p>
            </div>
            <div className="w-full flex flex-col gap-2 justify-center">
              <div className="w-full flex flex-col justify-center">
                <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
                  Profession :
                </p>
                <p className="w-full text-center font-sm text-gray-700 font-normal">
                  {member.profession}
                </p>
              </div>
              <div className="w-full flex flex-col justify-center">
                <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
                  Member Type :
                </p>
                <p className="w-full text-center font-sm text-gray-700 font-normal">
                  {member.memberType.name}
                </p>
              </div>

              <div className="w-full flex flex-col justify-center">
                <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
                  Native Place :
                </p>
                <p className="w-full text-center font-sm text-gray-700 font-normal">
                  {member.nativePlace}
                </p>
              </div>

              <div className="w-full flex flex-col justify-center">
                <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
                  Present Address :
                </p>
                <p className="w-full text-center font-sm text-gray-700 font-normal">
                  {member.address}
                </p>
              </div>
            </div>

            <div className="w-full flex flex-row justify-evenly items-center">

              <div>
                <a href={`mailto:${member.email}`} className="hover:cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 512 512"
                    fill="#EF4D48"
                    className="group-hover:fill-white"
                  >
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href={`tel:${member.phoneNumber}`}
                  className="hover:cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 512 512"
                    fill="#EF4D48"
                    className="group-hover:fill-white"
                  >
                   
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                  </svg>
                </a>


             
              </div>

            </div>
            <div className="flex gap-2">
              <div
                className={`w-full justify-center sm:justify-start flex`}
              >
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
              </div>

              <div
                className={`w-full justify-center sm:justify-start flex`}
              >
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
              </div>
            </div>

          </div>
        </>
      )
      }
    </div>

  );

};

export default Members;


