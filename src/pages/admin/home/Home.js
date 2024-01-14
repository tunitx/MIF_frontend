import React, { useState, useEffect } from "react";
import Members from "../list-of-members/Members";
import FormAddNewMember from "../list-of-members/FormAddNewMember";
import FormAddMemberType from "../list-of-members/FormAddMemberType";
import FormAddAdvertisement from "../advertisment-board/FormAddAdvertisment";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/constants";
import axios from "axios";
import MaturedBiodataTable from "../Matrimony/MaturedBiodataTable";
import BiodataTables from "../Matrimony/MatrimonyProfiles";
import DiscardedBiodataTable from "../Matrimony/DiscardedBiodataTable";
import { Doughnut } from 'react-chartjs-2';
import 'chart.js';

const Home = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState("");
  const [showNested, setShowNested] = useState({});
  const [profiles, setProfiles] = useState([]);
  const [showMatrimonyStats, setShowMatrimonyStats] = useState(false);
  const [inputDate, setInputDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const biodatasInRange = profiles.filter(profile => {
    const profileDate = new Date(profile.timestamp);
    return profileDate >= new Date(startDate) && profileDate <= new Date(endDate);
  }).length;
  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await axios.get(`${BASE_URL}getProfiles`);
      setProfiles(response.data);
    };

    fetchProfiles();
  }, []);


  const totalBiodatas = profiles.length;
  const activeBiodatas = profiles.filter(profile => !profile.matured && !profile.discard).length;
  const maturedBiodatas = profiles.filter(profile => profile.matured).length;
  const discardedBiodatas = profiles.filter(profile => profile.discard).length;
  const maleBiodatas = profiles.filter(profile => profile.gender === 'male').length;
  const femaleBiodatas = profiles.filter(profile => profile.gender === 'female').length;
  const biodatasOnInputDate = profiles.filter(profile => new Date(profile.timestamp).toDateString() === new Date(inputDate).toDateString()).length;
  // const pieData = {
  //   labels: ['Total', 'Active', 'Matured', 'Discarded', 'Male', 'Female'],
  //   datasets: [
  //       {
  //           data: [totalBiodatas, activeBiodatas, maturedBiodatas, discardedBiodatas, maleBiodatas, femaleBiodatas],
  //           backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56'],
  //           hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56']
  //       }
  //   ]
  // };
  const toggleNested = (key) => {
    // First, close all sub-buttons
    setShowNested(prev => {
      const newState = {};
      for (let k in prev) {
        newState[k] = false;
        setShowMatrimonyStats(false)
      }
      return newState;
    });

    // Then, open the clicked sub-button
    setShowNested(prev => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <div className="flex flex-col justify-center items-center gap-16 mt-10 p-5">
      <div className="max-w-6xl w-full flex flex-col justify-center items-center text-left gap-4 ">
        <div className="text-gray-900 font-bold text-4xl leading-[2.5rem] tracking-normal font-Poppins w-full">
          Hi there,
        </div>
        <p className="text-[#EF4D48] font-semibold text-4xl tracking-normal font-Poppins w-full">
          Admin
        </p>
        <div className="text-gray-900 font-bold text-2xl leading-[1rem] tracking-normal font-Poppins w-full">
          How are you doing today.
        </div>
        <div className="flex flex-row gap-8 justify-center items-center self-start py-8 ">
          <button
            onClick={() => {
              setShow(null);
              toggleNested("addMember");
            }}
            className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
          >
            Member
          </button>

          <button
            onClick={() => {
              setShow(null);
              toggleNested("advertisement");
            }}
            className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
          >
            Advertisement
          </button>
          <button
            onClick={() => {
              setShow(null);
              toggleNested("matrimony");
              setShowMatrimonyStats(!showMatrimonyStats);
            }}
            className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
          >
            Matrimony
          </button>
          <button
            onClick={() => {
              setShow(null);
              toggleNested("press");
            }}
            className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
          >
            Press
          </button>
          <button
            onClick={() => {
              setShow(null);
              toggleNested("contact");
            }}
            className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
          >
            Contact Queries
          </button>
        </div>
        {showMatrimonyStats && (
          <div className="text-gray-900 font-bold text-2xl leading-[1rem] tracking-normal font-Poppins w-full">
            Matrimony Stats
          </div>
        )}
        {showMatrimonyStats && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 self-start py-8 ">
            <p
              className={`group  border flex  justify-center items-center px-4 gap-3 border-[#EF4D48] rounded-full  py-3 md:py-4  text-sm sm:text-base font-Poppins hover:cursor-pointer bg-[#EF4D48] text-white whitespace-nowrap`}
            >
              Total Biodatas: {totalBiodatas}
            </p>
            <p
              className={`group  border flex  justify-center items-center px-4 gap-3 border-[#EF4D48] rounded-full  py-3 md:py-4  text-sm sm:text-base font-Poppins hover:cursor-pointer bg-[#EF4D48] text-white whitespace-nowrap`}
            >
              Active Biodatas: {activeBiodatas}
            </p>
            <p
              className={`group  border flex  justify-center items-center px-4 gap-3 border-[#EF4D48] rounded-full  py-3 md:py-4  text-sm sm:text-base font-Poppins hover:cursor-pointer bg-[#EF4D48] text-white whitespace-nowrap`}
            >
              Matured Biodatas: {maturedBiodatas}
            </p>
            <p
              className={`group  border flex  justify-center items-center px-4 gap-3 border-[#EF4D48] rounded-full  py-3 md:py-4  text-sm sm:text-base font-Poppins hover:cursor-pointer bg-[#EF4D48] text-white whitespace-nowrap`}
            >
              Discarded Biodatas: {discardedBiodatas}
            </p>
            <p
              className={`group  border flex  justify-center items-center px-4 gap-3 border-[#EF4D48] rounded-full  py-3 md:py-4  text-sm sm:text-base font-Poppins hover:cursor-pointer bg-[#EF4D48] text-white whitespace-nowrap`}
            >
              Male Biodatas: {maleBiodatas}
            </p>
            <p
              className={`group  border flex  justify-center items-center px-4 gap-3 border-[#EF4D48] rounded-full  py-3 md:py-4  text-sm sm:text-base font-Poppins hover:cursor-pointer bg-[#EF4D48] text-white whitespace-nowrap`}
            >
              Female Biodatas: {femaleBiodatas}
            </p>
            
           
<div>
  <label
    htmlFor="date"
    className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] mt-8"
  >
    From :
  </label>
  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    className="grow border w-full rounded border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm  mt-4 "
  />
</div>
<div>
  <label
    htmlFor="date"
    className="font-semibold text-sm font-Poppins  tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left mt-8"
  >
    To :
  </label>
  <input
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    className="grow border w-full rounded border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm  mt-4"
  />
</div>

            {startDate && endDate && (
              <p
                className={`group  border flex  justify-center items-center px-4 gap-3 border-[#EF4D48] rounded-full  py-3 md:py-4  text-sm sm:text-base font-Poppins hover:cursor-pointer bg-[#EF4D48] text-white whitespace-nowrap ml-8 mt-2`}
              >
                Biodatas: {biodatasInRange}
              </p>
            )}
            {/* <Doughnut data={pieData}/> */}
          </div>

        )}
      </div>
      <div className="flex flex-col w-full sm:flex-row ">
        <div className="w-full sm:w-1/4 md:1/5 lg:1/6 flex justify-center items-center my-5 sm:border-r-4 sm:border-[#444]">
          <div className="flex flex-col gap-8 justify-center items-center self-start py-8 ">
            {showNested.addMember && (
              <div className="flex flex-col gap-8 justify-center items-center self-start py-8 ">
                <button
                  onClick={() => {
                    setShow("addMember");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                // ...
                >
                  Add member
                </button>
                <button
                  onClick={() => {
                    setShow("allMembers");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                >
                  All Members
                </button>
                <button
                  onClick={() => {
                    setShow("addMemberType");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                // ...
                >
                  Add Member Type
                </button>
                <button
                  onClick={() => {
                    setShow("approveMembers");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                // ...
                >
                  Pending Approvals
                </button>
              </div>
            )}

            {showNested.advertisement && (
              <div className="flex flex-col gap-8 justify-center items-center self-start py-8 ">
                <button
                  onClick={() => {
                    setShow("addAdvertisement");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                // ...
                >
                  Add Advertisement
                </button>
                <button
                  onClick={() => {
                    setShow("allAdvertisements");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                >
                  All Advertisements
                </button>
                <button
                  onClick={() => {
                    setShow("slugs");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                >
                  Slugs
                </button>
              </div>
            )}

            {showNested.matrimony && (
              <div className="flex flex-col gap-8 justify-center items-center self-start py-8 ">
                <button
                  onClick={() => {
                    setShow("matrimonyUsers");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                // ...
                >
                  All Matrimony Users
                </button>
                <button
                  onClick={() => {
                    setShow("officeBearerMember");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                >
                  Add Office Bearer
                </button>
                <button
                  onClick={() => {
                    setShow("officeBearerSamaj");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                >
                  Add Office Bearer Samaj
                </button>
                <button
                  onClick={() => {
                    setShow("modifyCastes");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                >
                  Modify Castes
                </button>
                <button
                  onClick={() => {
                    setShow("activeBiodatas");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                >
                  Active Biodatas
                </button>
                <button
                  onClick={() => {
                    setShow("maturedBiodatas");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                >
                  Matured Biodatas
                </button>
                <button
                  onClick={() => {
                    setShow("discardedBiodatas");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                >
                  Discarded Biodatas
                </button>



              </div>
            )}

            {showNested.press && (
              <div className="flex flex-col gap-8 justify-center items-center self-start py-8 ">
                <button
                  onClick={() => {
                    setShow("allPress");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                >
                  All Press
                </button>
                <button
                  onClick={() => {
                    setShow("addPress");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                >
                  Add Press
                </button>
                <button
                  onClick={() => {
                    setShow("addPressClip");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                >
                  Add press clip
                </button>
                <button
                  onClick={() => {
                    setShow("addPressCutout");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                >
                  Add Press cutout
                </button>
                {/* <button
                  onClick={() => {
                    setShow("activeBiodatas");
                  }}
                >
                  Active Biodatas
                </button>
                <button
                  onClick={() => {
                    setShow("activeBiodatas");
                  }}
                >
                  Active Biodatas
                </button> */}
              </div>
            )}

            {showNested.contact && (
              <div className="flex flex-col gap-8 justify-center items-center self-start py-8 ">
                <button
                  onClick={() => {
                    setShow("contactQueries");
                  }}
                  className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
                // ...
                >
                  All contact Queries
                </button>
              </div>
            )}

            {/* <button
              onClick={() => {
                setShow("addMember");
              }}
              className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
            >
              Add Member
            </button>
            <button
              onClick={() => {
                setShow("addMemberType");
              }}
              className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
            >
              Add Member Type
            </button>

            <button
              onClick={() => {
                setShow("allMembers");
              }}
              className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
            >
              All Members
            </button>
            <button
              onClick={() => {
                setShow("allPress");
              }}
              className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
            >
              All Press
            </button>
           
            <button
              onClick={() => {
                setShow("addNewPress");
              }}
              className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
            >
              Add Press
            </button>
            <button
              onClick={() => {
                setShow("addAdvertisement");
              }}
              className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
            >
              Add Advertisement
            </button> */}
          </div>
        </div>
        {/* {show === "addMember" ? <FormAddNewMember /> : show === "addMemberType" ? <FormAddMemberType /> : <Members />} */}
        {
          show === "addMember" ? <FormAddNewMember /> :
            show === "addMemberType" ? <FormAddMemberType /> :
              show === "approveMembers" ? navigate('/admin/pending-approvals') :
                show === "allPress" ? navigate('/admin/all-press') :
                  show === "allAdvertisements" ? navigate('/admin/all-adv') :
                    show === "allMembers" ? <Members /> :
                      show === "addAdvertisement" ? <FormAddAdvertisement /> :
                        show === "addNewPress" ? navigate('/admin/press') :
                          show === "matrimonyUsers" ? navigate('/admin/matrimony-users') :
                            show === "officeBearerMember" ? navigate('/admin/office_bearer_member') :
                              show === "slugs" ? navigate('/admin/slugs') :
                                show === "officeBearerSamaj" ? navigate('/admin/office_bearer_samaj') :
                                  show === "modifyCastes" ? navigate('/admin/add-caste') :
                                    show === "activeBiodatas" ? <BiodataTables /> :
                                      show === "discardedBiodatas" ? <DiscardedBiodataTable /> :
                                        show === "maturedBiodatas" ? <MaturedBiodataTable /> :

                                          show === "addPress" ? navigate('/admin/press') :
                                            show === "addPressClip" ? navigate('/admin/press-clip') :
                                              show === "addPressCutout" ? navigate('/admin/press-cutout') :
                                                show === "contactQueries" ? navigate('/admin/contact-queries') :
                                                  null
        }
      </div>
    </div>
  );
};

export default Home;
