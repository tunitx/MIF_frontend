import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const FilterSection = ({
  filteredBiodatas,
  setFilteredBioDatas,
  searchedBiodatas,
}) => {
  const [complexion, setComplexion] = useState(new Set());

  const [education, setEducation] = useState(new Set());

  const [profession, setProfession] = useState(new Set());

  const [occupation, setOccupation] = useState(new Set());

  const [income, setIncome] = useState(new Set());

  const [maritalStatus, setMaritalStatus] = useState(new Set());

  const [pwd, setPwd] = useState(false);

  const handleComplexionChange = (tone) => {
    const newComplexion = new Set(complexion);
    if (complexion.has(tone)) {
      newComplexion.delete(tone);
    } else {
      newComplexion.add(tone);
    }
    setComplexion(newComplexion);
  };

  const handleEducationChange = (level) => {
    const newEducation = new Set(education);
    if (education.has(level)) {
      newEducation.delete(level);
    } else {
      newEducation.add(level);
    }
    setEducation(newEducation);
  };

  const handleProfessionChange = (title) => {
    const newProfession = new Set(profession);
    if (profession.has(title)) {
      newProfession.delete(title);
    } else {
      newProfession.add(title);
    }
    setProfession(newProfession);
  };

  const handleOccupationChange = (type) => {
    const newOccupation = new Set(occupation);
    if (occupation.has(type)) {
      newOccupation.delete(type);
    } else {
      newOccupation.add(type);
    }
    setOccupation(newOccupation);
  };

  const handleIncomeChange = (range) => {
    const newIncome = new Set(income);
    if (income.has(range)) {
      newIncome.delete(range);
    } else {
      newIncome.add(range);
    }
    setIncome(newIncome);
  };

  const handleMaritalStatusChange = (status) => {
    const newMaritalStatus = new Set(maritalStatus);
    if (maritalStatus.has(status)) {
      newMaritalStatus.delete(status);
    } else {
      newMaritalStatus.add(status);
    }
    setMaritalStatus(newMaritalStatus);
  };

  const handlePwdChange = () => {
    setPwd(!pwd);
  };

  const applyFilters = () => {
    const filteredBiodatas = searchedBiodatas.filter((biodata) => {
      // Complexion filter
      if (complexion.size > 0 && !complexion.has(biodata.complexion)) {
        return false;
      }

      // Education filter
      if (education.size > 0 && !education.has(biodata.education)) {
        return false;
      }

      // Profession filter
      if (profession.size > 0 && !profession.has(biodata.profession)) {
        return false;
      }

      // Occupation filter
      if (occupation.size > 0 && !occupation.has(biodata.occupation)) {
        return false;
      }

      // Income filter
      if (income.size > 0 && !income.has(biodata.incomeBracket)) {
        return false;
      }

      // Marital Status filter
      if (maritalStatus.size > 0 && !maritalStatus.has(biodata.maritalStatus)) {
        return false;
      }

      // Pwd filter
      if (pwd && biodata.pwd !== "yes") {
        return false;
      }

      return true;
    });

    setFilteredBioDatas(filteredBiodatas);
  };

  // Call this function whenever there's a change in filters
  useEffect(() => {
    applyFilters();
  }, [
    complexion,
    education,
    profession,
    occupation,
    income,
    maritalStatus,
    pwd,
  ]);

  return (
    <div>
      {/* Complexion */}

      <div>
        <label>Select Skin Tones:</label>
        <div>
          <input
            type="checkbox"
            id="fair"
            value="fair"
            checked={complexion.has("fair")}
            onChange={() => handleComplexionChange("fair")}
          />
          <label htmlFor="fair">Fair</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="medium"
            value="medium"
            checked={complexion.has("medium")}
            onChange={() => handleComplexionChange("medium")}
          />
          <label htmlFor="medium">Medium</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="dark"
            value="dark"
            checked={complexion.has("dark")}
            onChange={() => handleComplexionChange("dark")}
          />
          <label htmlFor="dark">Dark</label>
        </div>
      </div>

      {/* Education */}

      <div>
        <label>Select Education Levels:</label>
        <div>
          <input
            type="checkbox"
            id="undergraduate"
            value="Under Graduate"
            checked={education.has("Under Graduate")}
            onChange={() => handleEducationChange("Under Graduate")}
          />
          <label htmlFor="undergraduate">Under Graduate</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="graduate"
            value="Graduate"
            checked={education.has("Graduate")}
            onChange={() => handleEducationChange("Graduate")}
          />
          <label htmlFor="graduate">Graduate</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="postgraduate"
            value="Post Graduate"
            checked={education.has("Post Graduate")}
            onChange={() => handleEducationChange("Post Graduate")}
          />
          <label htmlFor="postgraduate">Post Graduate</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="professional"
            value="Professional"
            checked={education.has("Professional")}
            onChange={() => handleEducationChange("Professional")}
          />
          <label htmlFor="professional">Professional</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="otherProfession"
            value="Other"
            checked={education.has("Other")}
            onChange={() => handleEducationChange("Other")}
          />
          <label htmlFor="otherProfession">Other</label>
        </div>
      </div>

      {/* Profession */}

      <div>
        <label>Select Professions:</label>
        <div>
          <input
            type="checkbox"
            id="engineer"
            value="Engineer"
            checked={profession.has("Engineer")}
            onChange={() => handleProfessionChange("Engineer")}
          />
          <label htmlFor="engineer">Engineer</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="doctor"
            value="Doctor"
            checked={profession.has("Doctor")}
            onChange={() => handleProfessionChange("Doctor")}
          />
          <label htmlFor="doctor">Doctor</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="ca"
            value="CA"
            checked={profession.has("CA")}
            onChange={() => handleProfessionChange("CA")}
          />
          <label htmlFor="ca">CA</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="advocate"
            value="Advocate"
            checked={profession.has("Advocate")}
            onChange={() => handleProfessionChange("Advocate")}
          />
          <label htmlFor="advocate">Advocate</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="otherProfession"
            value="Other"
            checked={profession.has("Other")}
            onChange={() => handleProfessionChange("Other")}
          />
          <label htmlFor="otherProfession">Other</label>
        </div>
      </div>

      {/* Occupation */}

      <div>
        <label>Select Occupation:</label>
        <div>
          <input
            type="checkbox"
            id="service"
            value="Service"
            checked={occupation.has("Service")}
            onChange={() => handleOccupationChange("Service")}
          />
          <label htmlFor="service">Service / Job</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="business"
            value="Business"
            checked={occupation.has("Business")}
            onChange={() => handleOccupationChange("Business")}
          />
          <label htmlFor="business">Business</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="selfemployed"
            value="Self Employed"
            checked={occupation.has("Self Employed")}
            onChange={() => handleOccupationChange("Self Employed")}
          />
          <label htmlFor="selfemployed">Self Employed</label>
        </div>
      </div>

      {/* Income */}

      <div>
        <label>Select Income Range:</label>
        <div>
          <input
            type="checkbox"
            id="lessthan5"
            value="Less than 5 lakhs"
            checked={income.has("Less than 5 lakhs")}
            onChange={() => handleIncomeChange("Less than 5 lakhs")}
          />
          <label htmlFor="lessthan5">Less than 5 lakhs</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="5to10"
            value="5 - 10 lakhs"
            checked={income.has("5 - 10 lakhs")}
            onChange={() => handleIncomeChange("5 - 10 lakhs")}
          />
          <label htmlFor="5to10">5 - 10 lakhs</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="10to15"
            value="10 - 15 lakhs"
            checked={income.has("10 - 15 lakhs")}
            onChange={() => handleIncomeChange("10 - 15 lakhs")}
          />
          <label htmlFor="10to15">10 - 15 lakhs</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="15to20"
            value="15 - 20 lakhs"
            checked={income.has("15 - 20 lakhs")}
            onChange={() => handleIncomeChange("15 - 20 lakhs")}
          />
          <label htmlFor="15to20">15 - 20 lakhs</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="20to30"
            value="20 - 30 lakhs"
            checked={income.has("20 - 30 lakhs")}
            onChange={() => handleIncomeChange("20 - 30 lakhs")}
          />
          <label htmlFor="20to30">20 - 30 lakhs</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="30to40"
            value="30 - 40 lakhs"
            checked={income.has("30 - 40 lakhs")}
            onChange={() => handleIncomeChange("30 - 40 lakhs")}
          />
          <label htmlFor="30to40">30 - 40 lakhs</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="morethan40"
            value="More than 40 lakhs"
            checked={income.has("More than 40 lakhs")}
            onChange={() => handleIncomeChange("More than 40 lakhs")}
          />
          <label htmlFor="morethan40">More than 40 lakhs</label>
        </div>
      </div>

      {/* Marital status */}

      <div>
        <label>Select Marital Status:</label>
        <div>
          <input
            type="checkbox"
            id="single"
            value="single"
            checked={maritalStatus.has("single")}
            onChange={() => handleMaritalStatusChange("single")}
          />
          <label htmlFor="single">Single</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="divorced"
            value="divorced"
            checked={maritalStatus.has("divorced")}
            onChange={() => handleMaritalStatusChange("divorced")}
          />
          <label htmlFor="divorced">Divorced</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="widow"
            value="widow"
            checked={maritalStatus.has("widow")}
            onChange={() => handleMaritalStatusChange("widow")}
          />
          <label htmlFor="widow">Widow/Widower</label>
        </div>
      </div>

      {/* Person With disablilty */}

      <div>
        <label>Persons with Disabilities (Pwd):</label>
        <div>
          <input
            type="checkbox"
            id="pwd"
            checked={pwd}
            onChange={handlePwdChange}
          />
          <label htmlFor="pwd">Pwd</label>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
