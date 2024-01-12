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
                                <button onClick={() => deleteSlug(slug._id)}><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1.3rem"
                                    viewBox="0 0 448 512"
                                    fill="#EF4D48"
                                    className="mx-auto"

                                >
                                    {/*!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                </svg></button>
                            </td>
                            <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                                <button onClick={() => startUpdateSlug(slug)}><svg

                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1.3rem"
                                    viewBox="0 0 512 512"
                                    className="mx-auto"
                                    fill="#305D2B"
                                >
                                    {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                                </svg></button>
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