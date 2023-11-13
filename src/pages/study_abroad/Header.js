import React from "react";

const Header = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="mt-12 w-full flex flex-col justify-center items-center gap-6 sm:gap-8 max-w-6xl mb-8">
        <p className="text-[#EF4D48] font-bold text-3xl font-PlayFair w-full text-center md:text-4xl lg:text-6xl xl:text-7xl">
          Study Abroad
        </p>
        <div className="p-5 text-justify flex flex-col gap-5 font-Poppins text-sm sm:text-base">
          <p>
            Marwadi International Federation is a non-profit organization
            registered with the Government of India. Our objective is to provide
            access to quality education and promote social, cultural, and trade
            activities among the people of Rajasthan, especially youth so that
            they can reach their full potential and contribute to the GDP
            nationally and internationally. That can only happen if our student
            study at the world’s top-class universities.
          </p>
          <p>
            Right now, we are signing collaboration letters with various top
            universities around the world. The Collaboration will involve
            referring our students who meet the university’s academic
            requirements and have expressed an interest in studying at a top
            institution. In return, the university considers providing our
            students with scholarships, financial aid, and other support
            services that will enable them to pursue their academic goals
            successfully.
          </p>
          <p>
            At Marwadi International Federation, we have a dedicated counseling
            team who are committed to providing students/working professionals
            with proper career counseling and making them ready with all the
            necessary information and guidance required for admission to
            programs, including information on the application process,
            admission requirements, scholarship opportunities, and test
            preparations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
