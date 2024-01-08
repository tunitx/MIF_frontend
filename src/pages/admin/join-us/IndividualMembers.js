import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/constants';
import Swal from 'sweetalert2';

function IndividualMember () {
    const [members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [inputValue, setInputValue] = useState('10');
    useEffect(() => {
        axios.get(`${BASE_URL}getAllMembers`)
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
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

    const approveMember = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`${BASE_URL}approveMember/${id}`)
                    .then(response => {
                        const newMembers = members.filter(member => member._id !== id);
                        setMembers(newMembers);
                        Swal.fire(
                            'Approved!',
                            'The member has been approved.',
                            'success'
                        )
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
            }
        })
    };
    return (
        <>

            <div className="overflow-x-auto fade-in w-full flex items-center justify-center mb-12">
                <p className=" text-gray-900 font-bold text-2x font-Poppins text-lg ">MIF Members Approval</p>

            </div>
            <div className="overflow-x-auto fade-in w-full flex justify-center mb-16">

                <table className="w-full border-2 border-[#305D2B] max-w-7xl">
                    <thead className="w-full">
                        <tr className="bg-[#305D2B] text-white w-full">
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins"> Name</th>
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">Photo</th>
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins"> Phone Number</th>
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">Approve</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {members.filter(member => !member.approved)
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map(member => (
                                <tr key={member._id} className="border-b border-[#305D2B]">
                                    <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">{member.name}</td>
                                    <td className=" p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins"><img src={member.photo} alt={member.name} className="object-cover  w-16 h-16" /></td>
                                    <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">{member.phoneNumber}</td>
                                    <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins"><button onClick={() => approveMember(member._id)}>Approve</button></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center space-x-4 mb-8">
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
        </>
    );
    
}

export default IndividualMember