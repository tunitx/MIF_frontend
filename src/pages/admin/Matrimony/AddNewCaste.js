import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../utils/constants';
import CasteTable from './AllCastes';
const AddNewCaste = () => {
  const [casteData, setCasteData] = useState({});
  const [selectedCaste, setSelectedCaste] = useState('');
  const [selectedSubCaste, setSelectedSubCaste] = useState('');
  const [gotraOptions, setGotraOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isNewCaste, setIsNewCaste] = useState(false);
  const [isNewSubCaste, setIsNewSubCaste] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {

    const admin = JSON.parse(localStorage.getItem('admin'));
    const jwtToken = localStorage.getItem('jwtToken');
    const token = admin?.token || jwtToken;

    const headers = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['authorization'] = `Bearer ${token}`;
    }

    fetch(`${BASE_URL}getBiodata`, { headers })
      .then(response => response.json())
      .then(data => setCasteData(data))
      .catch(error => console.log(error));
  }, []);

  const handleCasteChange = (event) => {
    const selectedCaste = event.target.value;
    setSelectedCaste(selectedCaste);
    setIsNewCaste(selectedCaste === 'Add new caste');
    if (!isNewCaste) {
      setSelectedSubCaste('');
      setGotraOptions(Object.keys(casteData[selectedCaste] || {}));
    }
  };
  const handleEdit = () => {
    // Code to handle edit action
  };
  
  const handleDelete = () => {
    // Code to handle delete action
  };

  const handleSubCasteChange = (event) => {
    const selectedSubCaste = event.target.value;
    setSelectedSubCaste(selectedSubCaste);
    setIsNewSubCaste(selectedSubCaste === 'Add new subcaste');
  };

  useEffect(() => {
    setSelectedCaste("");
  }, [isNewCaste]);
  useEffect(() => {
    setSelectedSubCaste("");
  }, [isNewSubCaste]);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      casteName: selectedCaste,
      subCasteName: selectedSubCaste,
      gotraName: inputValue
    };
    console.log(formData);


    const admin = JSON.parse(localStorage.getItem('admin'));
    const token = admin?.token;
    console.log(token)
    fetch(`${BASE_URL}addNewBiodata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Form submitted:', data);
        setSubmitting(true);
      })
      .catch(error => console.log('Error:', error));
  };

  return (
    <div
    className={`w-full max-w-6xl flex flex-col items-center justify-center p-8 ml-12  mb-8 mx-auto`}
    >

     
      <form onSubmit={handleSubmit}>
        {!isNewCaste ? (
          <>

            <h1 className='mb-6' style={{ color: 'black', fontSize: '2em', fontFamily: 'Poppins' }}>
              Modify caste, subcaste & gotra
            </h1>



            <div className="w-full flex flex-col gap-6 sm:flex-row md:gap-8">

              <div className="w-full flex gap-2 items-center justify-center">
                <label
                  className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]"

                >
                  Caste:
                </label>
                <select
                  placeholder="Caste"
                  className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" value={selectedCaste} onChange={handleCasteChange}>
                  <option value="">Select Caste</option>
                  {Object.keys(casteData).map((casteName) => (
                    <option key={casteName} value={casteName}>{casteName}</option>
                  ))}
                  <option value="Add new caste">Add new caste</option>
                </select>

              </div>
              <div className="w-full flex gap-2 items-center justify-center">
                <label
                  className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                  SubCaste:
                </label>
                {!isNewSubCaste ? (
                  <select
                    placeholder="Sub-Caste"
                    className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                    value={selectedSubCaste} onChange={handleSubCasteChange}>
                    <option value="">Select Sub-Caste</option>
                    {gotraOptions.map((subCasteName) => (
                      <option key={subCasteName} value={subCasteName}>{subCasteName}</option>
                    ))}
                    <option value="Add new subcaste">Add new subcaste</option>
                  </select>
                ) : (
                  <input
                    placeholder="Sub-caste"
                    className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" type="text" value={selectedSubCaste} onChange={(event) => setSelectedSubCaste(event.target.value)} />
                )}

              </div>

              <div className="w-full flex gap-2 items-center justify-center">
                <label
                  className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
                  Gotra:
                </label>
                <input
                  placeholder="Gotra"
                  className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
                  type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />

              </div>
              
            </div>
          </>
        ) : (
          <>

            <h1 className='mb-6' style={{ color: 'black', fontSize: '2em', fontFamily: 'Poppins' }}>
              Modify caste, subcaste & gotra
            </h1>
            <label className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
              Caste:
            </label>
            <input
              placeholder="Caste"
              className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm"
              type="text" value={selectedCaste} onChange={(event) => setSelectedCaste(capitalizeFirstLetter(event.target.value))} />


            <label className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
              SubCaste:
            </label  >
            <input
              placeholder="Sub-Caste"
              className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" type="text" value={selectedSubCaste} onChange={(event) => setSelectedSubCaste(capitalizeFirstLetter(event.target.value))} />


            <label className="font-semibold text-sm font-Poppins tracking-wide sm:text-base whitespace-nowrap text-[#444]">
              Gotra:
            </label>
            <input
              placeholder="Gotra"
              className="grow border w-full rounded-lg border-[#ca403b] py-2 px-3 text-sm sm:text-base bg-[#f7f3f5] focus:outline-[#EF4D48] placeholder:font-Poppins placeholder:text-sm" type="text" value={inputValue} onChange={(event) => setInputValue(capitalizeFirstLetter(event.target.value))} />

          </>
        )}


        <div className="w-full flex flex-col items-center justify-center sm:flex-row sm:justify-between gap-4 mt-4">

          <div className="w-full flex justify-center sm:justify-start">
            <button
              type="submit"
              className="group flex items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 "

            >
              Submit
            </button>
          </div>



        </div>
        {
          (isNewCaste || isNewSubCaste) && (
            <div className="w-full flex justify-center sm:justify-start mt-2 ">
              <button
                onClick={() => {
                  setIsNewCaste(false);
                  setIsNewSubCaste(false);
                }}
                className="group flex items-center  justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2"
              >
                Back
              </button>
            </div>
          )
        }


        {
          submitting && (
            <h1 style={{ fontSize: '2em', color: 'black', fontFamily: 'Poppins' }}>
              Caste Modifications  Submitted ✔️
            </h1>
          )
        }
      </form>
      <div className="w-full flex justify-center">
        <button
          onClick={() => {
            setShow(!show);
          }}
          className="group flex items-center justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 mb-6 ml-36"
        >
          All Castes
        </button>
      </div>
      {
        show && <CasteTable />
      }
    </div>

  );
};

export default AddNewCaste;