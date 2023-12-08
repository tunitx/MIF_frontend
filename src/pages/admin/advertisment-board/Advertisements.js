
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../utils/constants';

const api = axios.create({
  baseURL: BASE_URL || 'http://localhost:3000',
});

const Advertisements = () => {
  const [members, setMembers] = useState([]);
  const [pfp, setPfp] = useState(null);


  useEffect(() => {
    api.get('/advertisment/all')
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the data: ', error);
      });

  }, []);

  const handleEdit = (id, editedMember) => {
    const formData = new FormData();
    Object.keys(editedMember).forEach(key => {
      if (key === 'businessImage' && editedMember[key] instanceof Blob) {
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

    api.put(`/advertisment/${id}`, formData, {
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
    api.delete(`/advertisment/${id}`)
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
          <Advertisement member={member} onEdit={handleEdit} onDelete={handleDelete} pfp={pfp} setPfp={setPfp} />
        </div>
      ))}
    </div>
  );
};

const Advertisement = ({ member, onEdit, onDelete, pfp, setPfp }) => {
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
      setEditedMember({ ...editedMember, businessImage: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (

    <div className="w-fit flex flex-row gap-5 max-w-[700px]">

      {isEditing ? (
        <>
          <div className="w-fit p-3 border border-indigo-900 rounded-md flex flex-col gap-5 justify-center items-center max-w-[800px] g" >



            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="title" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                Title* :
              </label>

              <input name="title" className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" value={editedMember.title} onChange={handleInputChange} placeholder="Title" />
            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="slugs" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                Slugs* :
              </label>
              <select
                name="slugs"
                multiple
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions).map(o => o.value);
                  let event;
                  if (selectedOptions.includes('all')) {
                    event = {
                      target: {
                        name: e.target.name,
                        value: ['/matrimony', '/press', '/list-of-members'],
                      },
                    };
                  } else {
                    event = {
                      target: {
                        name: e.target.name,
                        value: selectedOptions,
                      },
                    };
                  }
                  handleInputChange(event);
                }}
                value={editedMember.slugs}
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
              >
                <option value="all">All</option>
                <option value="/matrimony">Matrimony</option>
                <option value="/press">Press</option>
                <option value="/list-of-members">/list-of-members</option>
              </select>
            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="description" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                Description* :
              </label>

              <textarea className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" name="description" value={editedMember.description} onChange={handleInputChange} placeholder="description" />

            </div>
            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="twitter" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                Twitter* :
              </label>

              <input className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" name="twitter" value={editedMember.twitter} onChange={handleInputChange} placeholder="Twitter" />

            </div>


            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="facebook" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                facebook* :
              </label>
              <input className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" name="facebook" value={editedMember.facebook} onChange={handleInputChange} placeholder="Facebook" />

            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="playStore" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                Playstore* :
              </label>
              <input className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" name="playStore" value={editedMember.playStore} onChange={handleInputChange} placeholder="PlayStore" />

            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="instagram" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                Instagram* :
              </label>
              <input className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" name="instagram" value={editedMember.instagram} onChange={handleInputChange} placeholder="Instagram" />

            </div>


            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="phone" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                Phone Number* :
              </label>
              <input className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" name="phoneNumber" value={editedMember.phone} onChange={handleInputChange} placeholder="Phone Number" />

            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="email" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                Email* :
              </label>
              <input className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" name="email" value={editedMember.email} onChange={handleInputChange} placeholder="Email" />

            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="youtube" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                Youtube* :
              </label>
              <input className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" name="youtube" value={editedMember.youtube} onChange={handleInputChange} placeholder="Youtube" />

            </div>
            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="website" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                Website* :
              </label>
              <input className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" name="website" value={editedMember.website} onChange={handleInputChange} placeholder="website" />

            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label htmlFor="businessImage" className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                Business Image* :
              </label>
              <input type="file" name="businessImage" onChange={handleFileChange} />

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
          <div className="w-fit p-3 border border-indigo-900 rounded-md flex flex-col gap-5 justify-center items-center w-90%">
            <div className="p-5 pb-0 min-w-[100px] min-h-[200px]">
              <img src={member.businessImage} alt="Profile" className="rounded-md" />
            </div>
            <div className="w-full flex-col flex  justify-center text-center">
              <p className="font-Poppins  text-center text-2xl font-semibold text-[#EF4D48]" > Title: {member.title}</p>
            </div>

            <div className="w-full flex flex-row justify-center">
              <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
                Description :
              </p>
              <p className="w-full text-center font-sm text-gray-700 font-normal">
                {member.description}
              </p>
            </div>
            <div className="w-full flex flex-col justify-center">
              <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
                Slugs:
              </p>
              { member.slugs &&  member.slugs.map((slug, index) => (
                <p key={index} className="w-full text-center font-sm text-gray-700 font-normal">
                  {slug}
                </p>
              ))}
            </div>

            <div className="w-full flex flex-row gap-2 justify-center">

              <div className="w-full flex flex-col justify-center">
                <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
                  Fb:
                </p>
                <p className="w-full text-center font-sm text-gray-700 font-normal">
                  {member.facebook}
                </p>
              </div>

              <div className="w-full flex flex-col justify-center">
                <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
                  PlayStore:
                </p>
                <p className="w-full text-center font-sm text-gray-700 font-normal">
                  {member.playStore}
                </p>
              </div>

              <div className="w-full flex flex-col justify-center">
                <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
                  Instagram:
                </p>
                <p className="w-full text-center font-sm text-gray-700 font-normal">
                  {member.instagram}
                </p>
              </div>
            </div>


            <div className="w-full flex flex-row gap-2 justify-center">
              <div className="w-full flex flex-col justify-center">
                <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
                  Phone :
                </p>
                <p className="w-full text-center font-sm text-gray-700 font-normal">
                  {member.phone}
                </p>
              </div>
              <div className="w-full flex flex-col justify-center">
                <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
                  Whatsapp :
                </p>
                <p className="w-full text-center font-sm text-gray-700 font-normal">
                  {member.whatsapp}
                </p>
              </div>
              <div className="w-full flex flex-col justify-center">
                <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
                  Email :
                </p>
                <p className="w-full text-center font-sm text-gray-700 font-normal">
                  {member.email}
                </p>
              </div>

            </div>
            <div className="w-full flex flex-row gap-2 justify-center">
              <div className="w-full flex flex-col justify-center">
                <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
                  Youtube :
                </p>
                <p className="w-full text-center font-sm text-gray-700 font-normal">
                  {member.youtube}
                </p>
              </div>
              <div className="w-full flex flex-col justify-center">
                <p className="w-full text-center font-lg font-Poppins font-bold text-gray-900">
                  Website :
                </p>
                <p className="w-full text-center font-sm text-gray-700 font-normal">
                  {member.website}
                </p>
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

export default Advertisements;


