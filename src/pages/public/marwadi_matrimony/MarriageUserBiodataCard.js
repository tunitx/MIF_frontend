import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Registration from './Registration';

const BiodataTable = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [editingBiodata, setEditingBiodata] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.get('http://localhost:3000/getBiodatas', { headers: { 'authorization': `Bearer ${token}` } })
        .then(response => {
          setBiodatas(response.data);
        })
        .catch(error => {
          console.error('Error fetching biodata', error);
        });
    }
  }, []);

  const handleEdit = (biodata) => {
    setEditingBiodata(biodata);

  };

  const handleView = (biodata) => {
    Swal.fire({
      title: biodata.firstName + ' ' + biodata.surname,
      html: `
      <div className="flex flex-col items-center space-y-2">
      <img src= ${biodata.image1} alt="Profile Photo" className="w-24 h-24 object-cover rounded-full" />
      <p className="text-sm text-gray-600">Phone Numbers: ${biodata.phoneNumbers.join(', ')}</p>
      <p className="text-sm text-gray-600">Emails: ${biodata.emails.join(', ')}</p>
      <p className="text-sm text-gray-600">Current Address: ${biodata.currentAddressCity}, ${biodata.currentAddressState}, ${biodata.currentAddressCountry}</p>
      <p className="text-sm text-gray-600">Education: ${biodata.education}</p>
      <p className="text-sm text-gray-600">Profession: ${biodata.profession}</p>
      <p className="text-sm text-gray-600">Service Details: ${biodata.serviceDetails}</p>
    </div>
      `,
    });
  };

  return (
    <div className="overflow-x-auto fade-in w-full flex justify-center">
         {editingBiodata ? (
      <Registration biodata={editingBiodata} setEditingBiodata={setEditingBiodata} />
    ) :  (
      <table className="w-full border-2 border-[#305D2B] max-w-7xl">
        <thead className="w-full">
          <tr className="bg-[#305D2B] text-white w-full">
            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
              Name
            </th>
            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
              Created At
            </th>
            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
              
            </th>
            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
              
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {biodatas.map(biodata => (
            <tr key={biodata._id} className="border-b border-[#EF4D48] w-full align-middle">
              <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-bold font-Poppins">
                {biodata.firstName} {biodata.surname}
              </td>
              <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-Poppins">
                {biodata.timestamp.slice(0,10)}
              </td>
              <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-Poppins">
                <button onClick={() => handleEdit(biodata)}>Edit</button>
              </td>
              <td className="p-2 border-r border-[#EF4D48] text-center text-[#333] whitespace-nowrap font-Poppins">
                <button onClick={() => handleView(biodata)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       )}
    </div>
  );
};

export default BiodataTable;