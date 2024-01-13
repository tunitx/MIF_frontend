import React, { useEffect, useState } from 'react';
// import { BASE_URL } from './constants';
import { BASE_URL } from '../../../utils/constants'
import axios from 'axios';
import BiodataCard from '../../public/marwadi_matrimony/BiodataCard';
import EditBioData from '../../public/marwadi_matrimony/EditBioData';
import BiodataTable from './TableForBioDataType';
import biodata from '../../../utils/biodata';
function DiscardedBiodataTable() {
    const [biodatas, setBiodatas] = useState([]);


    useEffect(() => {
        axios.get(`${BASE_URL}getProfiles`)
            .then(response => {
                console.log(response.data);
                setBiodatas(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }, []);

    const discardedBiodatas = biodatas ? biodatas.filter(biodata => biodata.discard) : [];
    // const maturedBiodatas = biodatas ? biodatas.filter(biodata => biodata.matured && !biodata.discard) : [];
    // const activeBiodatas = biodatas ? biodatas.filter(biodata => !biodata.matured && !biodata.discard) : [];
    return (
        <div>
            <div className="overflow-x-auto fade-in w-full flex items-center justify-center mb-8">
                <p className=" text-red-800 font-bold text-2x font-Poppins text-lg ">Discarded</p>
            </div>
            {discardedBiodatas.length > 0 ? (
                <BiodataTable biodatas={discardedBiodatas} />
            ) : (
                <div className="overflow-x-auto fade-in w-full flex items-center justify-center mb-8">
                    <p className=" text-gray-900 font-bold text-2x font-Poppins text-lg ">No discarded biodatas available</p>
                </div>
            )}

            {/* <div className="overflow-x-auto fade-in w-full flex items-center justify-center mb-8">
                <p className=" text-orange-900 font-bold text-2x font-Poppins text-lg ">Matured</p>
            </div>
            {maturedBiodatas.length > 0 ? (
                <BiodataTable biodatas={maturedBiodatas} />
            ) : (
                <div className="overflow-x-auto fade-in w-full flex items-center justify-center mb-8">
                    <p className=" text-gray-900 font-bold text-2x font-Poppins text-lg ">No matured biodatas available</p>
                </div>
            )}

            <div className="overflow-x-auto fade-in w-full flex items-center justify-center mb-8">
                <p className=" text-gray-900 font-bold text-2x font-Poppins text-lg ">Active</p>
            </div>
            <BiodataTable biodatas={activeBiodatas} /> */}
        </div>
    );
}



export default DiscardedBiodataTable;