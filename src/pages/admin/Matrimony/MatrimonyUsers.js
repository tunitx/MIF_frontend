import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/constants';
import BiodataCard from '../../public/marwadi_matrimony/BiodataCard';

const MarriageUsers = () => {
    const [biodatas, setBiodatas] = useState([]);
    const [selectedBiodatas, setSelectedBiodatas] = useState([]);
    const [selectedBiodata, setSelectedBiodata] = useState(null);
    const [viewingBiodata, setViewingBiodata] = useState(null);
    const [biodataView, setBiodataView] = useState(false);
    const [isBiodataCardOpen, setBiodataCardOpen] = useState(false);
    const [openCardId, setOpenCardId] = useState(null);

    const handleToggleBiodataCard = (biodata, id) => {
        if (openCardId === id) {
            setOpenCardId(null); // if the card is already open, close it
          } else {
            setOpenCardId(id); // otherwise, open the card
          }
        if (isBiodataCardOpen) {

        } else {
            handleViewOfTables(biodata);
        }
        setBiodataCardOpen(!isBiodataCardOpen);
    };

    useEffect(() => {
        axios.get(`${BASE_URL}getAllBiodatas`)
            .then(response => {
                console.log(response.data);
                setBiodatas(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }, []);
    const handleView = (biodata) => {
        setSelectedBiodatas(biodata.marriageSchema);
        setSelectedBiodata(biodata);
        setViewingBiodata(biodata.marriageSchema);
        console.log(biodata.marriageSchema);
    };
    const handleViewOfTables = (biodata) => {
        setBiodataView(biodata)
        console.log(biodata)
    }

    return (
        <>
            <div className="overflow-x-auto fade-in w-full flex justify-center mb-24">
                <p className=" text-gray-900 font-bold text-2x font-Poppins text-lg ">Matrimony Users Details</p>

            </div>

            <div className="overflow-x-auto fade-in w-full flex justify-center mb-24">

                <table className="w-full border-2 border-[#305D2B] max-w-7xl">
                    <thead className="w-full">
                        <tr className="bg-[#305D2B] text-white w-full">
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                                Name
                            </th>
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                                Phone Number
                            </th>
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                                Email
                            </th>
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                                Number of Biodatas
                            </th>
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                                Last Signed in:
                            </th>
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                                view
                            </th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {biodatas.map((biodata, index) => (
                            <tr key={index}>
                                <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                    {biodata.name}
                                </td>
                                <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                    {biodata.phoneNumber}
                                </td>
                                <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                    {biodata.email ? biodata.email : "Not Available"}
                                </td>
                                <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                    {biodata.marriageSchema.length}
                                </td>
                                <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                    {biodata.timeStamp && biodata.timeStamp.length > 0 ? new Date(biodata.timeStamp[biodata.timeStamp.length - 1]).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "Not Available"}
                                </td>

                                <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                    {selectedBiodata === biodata ? (
                                        <button onClick={() => {
                                            setSelectedBiodata(null)
                                            setViewingBiodata(null)
                                            setBiodataCardOpen(false)
                                        }
                                        }>Close</button>
                                    ) : (
                                        <button onClick={() => handleView(biodata)}>View</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="overflow-x-auto fade-in w-full flex justify-center mb-24">
                <table className="w-full border-2 border-[#305D2B] max-w-7xl">

                    {viewingBiodata && viewingBiodata.length>0 && (
                        <thead className="w-full">
                            <tr className="bg-[#305D2B] text-white w-full">
                                <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">First Name</th>
                                <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">Surname</th>
                                <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">Created At</th>
                                <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">Close</th>
                                <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">View</th>
                            </tr>
                        </thead>
                    )}

                    <tbody className="w-full">
                        {viewingBiodata && viewingBiodata.map((biodata, index) => (
                            <tr key={index} className="border-b border-[#EF4D48] w-full align-middle">
                                <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">{biodata.firstName}</td>
                                <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">{biodata.surname}</td>
                                <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">{new Date(biodata.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                                <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                    <button onClick={() => {
                                        setViewingBiodata(null)
                                        setBiodataCardOpen(false)
                                    }}>Close this table</button>
                                </td>
                                <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                    <button onClick={() => handleToggleBiodataCard(biodata, biodata._id)}>
                                    {openCardId === biodata._id ? 'Close Biodata Card' : 'View Biodata Card'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3   gap-4">

                {isBiodataCardOpen && biodataView && <BiodataCard data={biodataView} />}

            </div>

        </>
    );
};

export default MarriageUsers;