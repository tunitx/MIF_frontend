import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { BASE_URL } from '../../../utils/constants';

const CasteTable = () => {
    const [biodatas, setBiodatas] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    useEffect(() => {
        const fetchBiodata = async () => {
            const admin = JSON.parse(localStorage.getItem('admin'));
            const jwtToken = localStorage.getItem('jwtToken');
            const token = admin?.token || jwtToken;

            const headers = {
                'Content-Type': 'application/json'
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await axios.get(`${BASE_URL}getBiodata`, { headers });
            setBiodatas(response.data);
        };

        fetchBiodata();
    }, []);

    return (
        <div className="overflow-x-auto fade-in w-full flex flex-col justify-center mb-16">

            <table className="w-full border-2 border-[#305D2B] max-w-7xl">
                <thead className="w-full">
                    <tr className="bg-[#305D2B] text-white w-full">
                        <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                            Caste
                        </th>
                        <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                            Sub-Castes
                        </th>
                        <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                            Gotras
                        </th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {Object.entries(biodatas)
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map(([caste, subcastes], index) => (
                            <tr key={index}>
                                <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                    {caste}
                                </td>
                                <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                    {Object.keys(subcastes).join(', ')}
                                </td>
                                <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                    {Object.values(subcastes).flat().join(', ')}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="flex justify-center space-x-4 mt-4">
                <button
                    className={`px-4 py-2 rounded bg-blue-500 text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: Math.ceil(Object.entries(biodatas).length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={`px-4 py-2 rounded bg-blue-500 text-white ${currentPage === Math.ceil(Object.entries(biodatas).length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() =>
                        setCurrentPage((old) => Math.min(old + 1, Math.ceil(Object.entries(biodatas).length / itemsPerPage)))
                    }
                    disabled={currentPage === Math.ceil(Object.entries(biodatas).length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CasteTable;