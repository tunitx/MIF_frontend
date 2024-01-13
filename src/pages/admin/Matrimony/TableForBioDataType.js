import React, { useEffect, useState } from 'react';
import BiodataCard from '../../public/marwadi_matrimony/BiodataCard';
import EditBioData from '../../public/marwadi_matrimony/EditBioData';

function BiodataTable({ biodatas }) {
    const [editingBiodata, setEditingBiodata] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [inputValue, setInputValue] = useState('10');
    const [biodataView, setBiodataView] = useState(false);

    const [biodata, setBioData] = useState(null);
    const [biodataEdit, setBiodataEdit] = useState(null);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const handleSort = (field, direction) => {
        setSortField(field);
        setSortDirection(direction);
    };
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
    return (
        <>

            <div className="overflow-x-auto fade-in w-full flex justify-center mb-16">
                <table className="w-full border-2 border-[#305D2B] max-w-7xl">
                    <thead className="w-full">
                        <tr className="bg-[#305D2B] text-white w-full">
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                                First Name
                                {sortField === 'firstName' && sortDirection === 'asc' ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 320 512"
                                        fill="#fff"
                                        onClick={() => handleSort('firstName', 'desc')}
                                    >
                                        <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 320 512"
                                        fill="#fff"
                                        onClick={() => handleSort('firstName', 'asc')}
                                    >
                                        <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6 19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
                                    </svg>
                                )}
                            </th>
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                                Surname
                                {sortField === 'surname' && sortDirection === 'asc' ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 320 512"
                                        fill="#fff"
                                        onClick={() => handleSort('surname', 'desc')}
                                    >
                                        <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6 7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 320 512"
                                        fill="#fff"
                                        onClick={() => handleSort('surname', 'asc')}
                                    >
                                        <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6 19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
                                    </svg>
                                )}
                            </th>
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                                Created at
                                {sortField === 'timestamp' && sortDirection === 'asc' ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 320 512"
                                        fill="#fff"
                                        onClick={() => handleSort('timestamp', 'desc')}
                                    >
                                        <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 320 512"
                                        fill="#fff"
                                        onClick={() => handleSort('timestamp', 'asc')}
                                    >
                                        <path d="M182.6 470.6c-12.5 12.5-32.8-12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128 128z" />
                                    </svg>
                                )}
                            </th>
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">View</th>
                            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">Edit</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {biodatas

                            .sort((a, b) => {
                                if (sortField === null) return 0;
                                if (sortField === 'createdAt') {
                                    const dateA = new Date(a[sortField]);
                                    const dateB = new Date(b[sortField]);
                                    return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
                                } else {
                                    if (a[sortField] && b[sortField]) {
                                        return sortDirection === 'asc'
                                            ? a[sortField].localeCompare(b[sortField])
                                            : b[sortField].localeCompare(a[sortField]);
                                    } else {
                                        return 0;
                                    }
                                }
                            })
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((biodata, index) => (
                                <tr key={index}>
                                    <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">{biodata.firstName}</td>
                                    <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">{biodata.surname}</td>
                                    <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">{new Date(biodata.timestamp).toLocaleString()}</td>

                                    <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                        <button
                                            onClick={
                                                () => {
                                                    setBiodataView(!biodataView)
                                                    setBioData(biodata)
                                                }
                                            }
                                        >View Biodata Card</button>
                                    </td>
                                    <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                        <button
                                            onClick={
                                                () => {
                                                    setEditingBiodata(!editingBiodata)
                                                    setBiodataEdit(biodata)
                                                }
                                            }
                                        >Edit</button>
                                    </td>
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
                {Array.from({ length: Math.ceil(biodatas.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={`px-4 py-2 rounded bg-blue-500 text-white ${currentPage === Math.ceil(biodatas.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() =>
                        setCurrentPage((old) => Math.min(old + 1, Math.ceil(biodatas.length / itemsPerPage)))
                    }
                    disabled={currentPage === Math.ceil(biodatas.length / itemsPerPage)}
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
            <div className="w-full grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3   gap-4">

                {biodataView && <BiodataCard data={biodata} />}

            </div>
            {editingBiodata && <EditBioData biodata={biodataEdit} />}
        </>
    );
}
export default BiodataTable