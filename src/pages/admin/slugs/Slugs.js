import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { BASE_URL } from '../../../utils/constants';

const SlugsComponent = () => {
    const [route, setRoute] = useState('');
    const [newRoute, setNewRoute] = useState('');
    const [slugs, setSlugs] = useState([]);
    const [slugToUpdate, setSlugToUpdate] = useState(null);

    useEffect(() => {
        fetchSlugs();
    }, []);

    const fetchSlugs = async () => {
        const response = await axios.get(`${BASE_URL}getSlugs`);
        setSlugs(response.data);
    };

    const postSlug = async () => {
        try {
            await axios.post(`${BASE_URL}postSlugs`, { route });
            fetchSlugs();
            Swal.fire('Success', 'Slug posted successfully', 'success');
            setRoute('');
        } catch (error) {
            Swal.fire('Error', 'Failed to post slug', 'error');
        }
    };

    const deleteSlug = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this slug!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });
    
        if (result.isConfirmed) {
            try {
                await axios.delete(`${BASE_URL}deleteSlug/${id}`);
                fetchSlugs();
                Swal.fire('Deleted!', 'Your slug has been deleted.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Failed to delete slug', 'error');
            }
        }
    };

    const startUpdateSlug = (slug) => {
        setNewRoute(slug.route);
        setSlugToUpdate(slug._id);
    };

    const updateSlug = async () => {
        try {
            await axios.put(`${BASE_URL}updateSlug/${slugToUpdate}`, { route: newRoute });
            fetchSlugs();
            setNewRoute('');
            setSlugToUpdate(null);
            Swal.fire('Success', 'Slug updated successfully', 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to update slug', 'error');
        }
    };

    return (

        <div className="overflow-x-auto fade-in w-full flex flex-col justify-center mb-16 items-center">
             <div className="w-1/3 flex flex-col sm:flex-row justify-center gap-2 items-center ml-4 mb-8">
             <h1 className="font-semibold text-lg font-Poppins tracking-wide sm:text-xl whitespace-nowrap text-[#444]">
                                        Slugs
                                    </h1>
             </div>
            
            <div className="w-1/3 flex flex-col sm:flex-row justify-center gap-2 items-center ml-4 mb-8">
                <label
                    htmlFor="route"
                    className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                >
                    Route* :
                </label>
                <input
                    id="route"
                    name="route"
                    type="text"
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    placeholder="Route"
                    className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                />
                <button
                    className="group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#000080] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2"

                    onClick={postSlug}>Post Slug</button>
            </div>


            <table className="w-1/2 border-2 border-[#305D2B] max-w-full">
                <thead className="w-full">
                    <tr className="bg-[#305D2B] text-white w-full">
                        <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                            Route
                        </th>
                        <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                            Delete
                        </th>
                        <th className="w-1/2 p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
                            Update
                        </th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {slugs.map((slug) => (
                        <tr key={slug._id} className="border-b border-[#EF4D48]">
                            <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                {slug.route}
                            </td>
                            <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                <button onClick={() => deleteSlug(slug._id)}>Delete</button>
                            </td>
                            <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                <button onClick={() => startUpdateSlug(slug)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {slugToUpdate && (
 <div className="w-1/3 flex flex-col sm:flex-row justify-center gap-2 items-center ml-4 mb-8 mt-8">
     <label
                    htmlFor="newRoute"
                    className="font-semibold text-sm font-Poppins sm:w-fit tracking-wide sm:text-base whitespace-nowrap w-full text-[#444] text-left"
                >
                    Route* :
                </label>
                    <input
                        type="text"
                        value={newRoute}
                        onChange={(e) => setNewRoute(e.target.value)}
                        placeholder="Route"
                        className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base  bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    />
                    <button 
                     className="group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#000080] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2"
                    onClick={updateSlug}>Confirm Update</button>
                </div>
            )}
        </div>
    );
};

export default SlugsComponent;