import React from "react";
import FormContact from "./FormContact";

const Body = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-6xl flex justify-center items-center flex-col px-6 py-5 font-PlayFair sm:flex-row gap-16 ">
        <div className="sm:w-1/2 w-full flex flex-col gap-6">
          <p className="text-xl font-bold">
            For more details please connect us
          </p>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-xl ">Call Us:</p>
            <div>
              <a
                href="tel:+91%209314503871"
                className="font-Poppins text-[#453E3E] font-normal hover:cursor-pointer"
              >
                +91 9314503871
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-xl ">Send Us Mail:</p>
            <div>
              <a
                href="mailto:marwadiif@gmail.com"
                className="font-Poppins text-[#453E3E] font-normal hover:cursor-pointer"
              >
                marwadiif@gmail.com
              </a>{" "}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-xl ">Our Office Location:</p>
            <p className="font-Poppins text-[#453E3E] font-normal">
              ABHYAM, C-121 A, Lal Kothi Opp Jyoti Nagar Thana, near Rajasthan
              Vidhan Sabha, Jaipur, Rajasthan 302015
            </p>
          </div>
          <div>
            <div className="mapouter fade-in">
              <div className="gmap_canvas">
                <iframe
                  //   width={600}
                  //   height={500}
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=%20ABHYAM,%20C-121%20A,%20Lal%20Kothi%20Opp%20Jyoti%20Nagar%20Thana,%20near%20Rajasthan%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Vidhan%20Sabha,%20Jaipur,%20Rajasthan%20302015&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full lg:w-3/4 h-64 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:w-1/2 w-full">
          <FormContact />
        </div>
      </div>
    </div>
  );
};

export default Body;
