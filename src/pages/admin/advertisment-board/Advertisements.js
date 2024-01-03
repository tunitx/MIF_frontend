import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../utils/constants";

const api = axios.create({
  baseURL: BASE_URL || "http://localhost:3000",
});

const Advertisements = () => {
  const [members, setMembers] = useState([]);
  const [pfp, setPfp] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [inputValue, setInputValue] = useState('10');

  useEffect(() => {
    api
      .get("/advertisment/all")
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error("There was an error retrieving the data: ", error);
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
    Object.keys(editedMember).forEach((key) => {
      if (key === "businessImage" && editedMember[key] instanceof Blob) {
        console.log(`Appending file with name: ${editedMember[key].name}`);
        formData.append(key, editedMember[key], editedMember[key].name);
      } else if (
        key === "memberType" &&
        typeof editedMember[key] === "object" &&
        editedMember[key] !== null
      ) {
        formData.append(key, editedMember[key]._id);
      } else {
        formData.append(key, editedMember[key]);
      }
    });

    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    api
      .put(`/advertisment/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // const updatedMemberType = memberTypes.find(type => type._id === editedMember.memberType);
        // setMembers(members.map(member => member._id === id ? { ...member, ...editedMember, memberType: updatedMemberType } : member));
        setMembers(
          members.map((member) => (member._id === id ? response.data : member))
        );
        setPfp(null);
      })
      .catch((error) => {
        console.error("There was an error updating the member: ", error);
      });
  };

  const handleDelete = (id) => {
    api
      .delete(`/advertisment/${id}`)
      .then(() => {
        setMembers(members.filter((member) => member._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the member: ", error);
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
              Title
            </th>
            {/* Add more header columns as needed */}
            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
              Edit
            </th>
            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
              Delete
            </th>
          </tr>
        </thead>
        <>
          <tbody className="w-full">


            {members
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((member, index, _id) => (
                // <tr key={index}>

                <Advertisement
                  member={member}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  pfp={pfp}
                  setPfp={setPfp}
                  _id={_id}
                />


              ))}
          </tbody>


        </>
      </table>
      <div className="flex justify-center space-x-4 mt-4">
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

const Advertisement = ({ member, onEdit, onDelete, pfp, setPfp, _id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState({ ...member });

  useEffect(() => {
    setEditedMember({ ...member });
  }, [member]);

  const handleInputChange = (event) => {
    setEditedMember({
      ...editedMember,
      [event.target.name]: event.target.value,
    });
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
    <>

      {isEditing ? (
        <>
          <div className="w-fit p-3 border border-indigo-900 rounded-md flex flex-col gap-5 justify-center items-center max-w-[800px] g">
            <div className="w-full flex gap-2 items-center justify-center">
              <label
                htmlFor="title"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                Title* :
              </label>

              <input
                name="title"
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                value={editedMember.title}
                onChange={handleInputChange}
                placeholder="Title"
              />
            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label
                htmlFor="slugs"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                Slugs* :
              </label>
              <select
                name="slugs"
                multiple
                // onChange={(e) => {
                //   const selectedOptions = Array.from(e.target.selectedOptions).map(o => o.value);
                //   let event;
                //   if (selectedOptions.includes('all')) {
                //     event = {
                //       target: {
                //         name: e.target.name,
                //         value: ['/', '/matrimony', '/press', '/list-of-members'],
                //       },
                //     };
                //   } else {
                //     event = {
                //       target: {
                //         name: e.target.name,
                //         value: selectedOptions.map(option => {
                //           switch (option) {
                //             case '/matrimony':
                //               return '/matrimony';
                //             case '/press':
                //               return '/press';
                //             case '/list-of-members':
                //               return '/list-of-members';
                //             default:
                //               return '/';
                //           }
                //         }),
                //       },
                //     };
                //   }
                //   handleInputChange(event);
                // }}
                // value={editedMember.slugs}

                onChange={(e) => {
                  const selectedOptions = Array.from(
                    e.target.selectedOptions
                  ).map((o) => o.value);
                  console.log(selectedOptions);
                  let event;
                  if (selectedOptions.includes("all")) {
                    event = {
                      target: {
                        name: e.target.name,
                        value: ["/about",
                          "/",
                          "/list-of-members",
                          "/press",
                          "/faqs",
                          "/free-website",
                          "/matrimony/biodata",
                          "/matrimony/search-biodata",
                          "/gallery",
                          "/matrimony/add-biodata",
                          "/membership-and-fees",
                          "/study-abroad"],
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
                <option value="/about">/about</option>
                <option value="/">/</option>
                <option value="/list-of-members">/list-of-members</option>
                <option value="/press">/press </option>
                <option value="/gallery">/gallery</option>
                <option value="/study-abroad">/study-abroad</option>
                <option value="/free-website">/free-website</option>
                <option value="/faqs">/faqs</option>
                <option value="/membership-and-fees">/membership-and-fees</option>
                <option value="/matrimony/add-biodata">/matrimony/add-biodata</option>
                <option value="/matrimony/biodata">/matrimony/biodata</option>
                <option value="/matrimony/search-biodata">/matrimony/search-biodata</option>
                <option value="all">All</option>
              </select>
            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label
                htmlFor="description"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                Description* :
              </label>

              <textarea
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                name="description"
                value={editedMember.description}
                onChange={handleInputChange}
                placeholder="description"
              />
            </div>
            <div className="w-full flex gap-2 items-center justify-center">
              <label
                htmlFor="twitter"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                Twitter* :
              </label>

              <input
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                name="twitter"
                value={editedMember.twitter}
                onChange={handleInputChange}
                placeholder="Twitter"
              />
            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label
                htmlFor="facebook"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                facebook* :
              </label>
              <input
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                name="facebook"
                value={editedMember.facebook}
                onChange={handleInputChange}
                placeholder="Facebook"
              />
              <input
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                name="facebook"
                value={editedMember.facebook}
                onChange={handleInputChange}
                placeholder="Facebook"
              />
            </div>

            <div className="w-full flex gap-2 items-center justify-center">

              <label
                htmlFor="playStore"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                Playstore* :
              </label>
              <input
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                name="playStore"
                value={editedMember.playStore}
                onChange={handleInputChange}
                placeholder="PlayStore"
              />
              <input
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                name="playStore"
                value={editedMember.playStore}
                onChange={handleInputChange}
                placeholder="PlayStore"
              />
            </div>
            <div className="w-full flex gap-2 items-center justify-center">
              <label
                htmlFor="whatsapp"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                WhatsApp :
              </label>
              <input
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                name="whatsapp"
                value={editedMember.whatsapp}
                onChange={handleInputChange}
                placeholder="whatsapp"
              />
            </div>
            <div className="w-full flex gap-2 items-center justify-center">

              <label
                htmlFor="instagram"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                Instagram* :
              </label>
              <input
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                name="instagram"
                value={editedMember.instagram}
                onChange={handleInputChange}
                placeholder="Instagram"
              />
              <input
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                name="instagram"
                value={editedMember.instagram}
                onChange={handleInputChange}
                placeholder="Instagram"
              />
            </div>

            <div className="w-full flex gap-2 items-center justify-center">

              <label
                htmlFor="phone"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                Phone Number* :
              </label>
              <input
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                name="phone"
                value={editedMember.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
            </div>


            <div className="w-full flex gap-2 items-center justify-center">
              <label
                htmlFor="whatsapp"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                Whatsapp* :
              </label>
              <input
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                name="whatsapp"
                value={editedMember.whatsapp}
                onChange={handleInputChange}
                placeholder="Whatsapp"
              />
            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label
                htmlFor="email"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                Email* :
              </label>
              <input
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                name="email"
                value={editedMember.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label
                htmlFor="youtube"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                Youtube* :
              </label>
              <input
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                name="youtube"
                value={editedMember.youtube}
                onChange={handleInputChange}
                placeholder="Youtube"
              />
            </div>
            <div className="w-full flex gap-2 items-center justify-center">
              <label
                htmlFor="website"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                Website* :
              </label>
              <input
                className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                name="website"
                value={editedMember.website}
                onChange={handleInputChange}
                placeholder="website"
              />
            </div>

            <div className="w-full flex gap-2 items-center justify-center">
              <label
                htmlFor="businessImage"
                className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"
              >
                Business Image* :
              </label>
              <input
                type="file"
                name="businessImage"
                onChange={handleFileChange}
              />

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
              <div className={`w-full justify-center sm:justify-start flex`}>
                <button
                  onClick={() => {
                    onEdit(member._id, editedMember);
                    setIsEditing(false);
                    Swal.fire(
                      "Updated!",
                      "User data has been updated.",
                      "success"
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

              <div className={`w-full justify-center sm:justify-start flex`}>
                <button
                  onClick={() => {
                    setIsEditing(false);
                  }}
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
            className=" border-b border-[#EF4D48] w-full align-middle"
          >

            <td className="  p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins">
              <img src={member.businessImage} alt="" className="object-cover rounded-full w-24 h-24" />
            </td>
            <td className="p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins">
              {member.title}
            </td>
            {/* Add more body columns as needed */}
            <td className="p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins">
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
            <td className="p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins">
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
                </p>{" "}
              </button>
            </td>
          </tr>

        </>
      )}
    </>
  );
};

export default Advertisements;
