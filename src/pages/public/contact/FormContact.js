import React from "react";
import { Formik } from "formik";

const FormContact = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        subject: "",
        message: "",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values);
      }}
    >
      {(formik) => {
        return (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-6 w-full"
          >
            <div className="w-full flex flex-col gap-4 sm:gap-5">
              {/* Name */}

              <div className="w-full">
                <input
                  {...formik.getFieldProps("name")}
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Name"
                  className="block w-full  border py-3 px-4 text-normal text-gray-700 font-Poppins  placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal placeholder:font-Poppins placeholder:tracking-wider focus:outline-[#EF4D48] focus:outline-1 focus:outline-dotted"
                />
              </div>

              {/* Email */}

              <div className="w-full">
                <input
                  {...formik.getFieldProps("email")}
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address"
                  className="block w-full  border py-3 px-4 text-normal text-gray-700 font-Poppins  placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal placeholder:font-Poppins placeholder:tracking-wider focus:outline-[#EF4D48] focus:outline-1 focus:outline-dotted"
                />
              </div>

              {/* Subject */}

              <div className="w-full">
                <input
                  {...formik.getFieldProps("subject")}
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Subject"
                  className="block w-full  border py-3 px-4 text-normal text-gray-700 font-Poppins  placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal placeholder:font-Poppins placeholder:tracking-wider focus:outline-[#EF4D48] focus:outline-1 focus:outline-dotted"
                />
              </div>

              {/* Message */}

              <div className="w-full">
                <textarea
                  {...formik.getFieldProps("message")}
                  id="message"
                  name="message"
                  type="text"
                  required
                  placeholder="Your Message"
                  className="block w-full  border py-3 px-4 h-28 text-normal text-gray-700 font-Poppins  placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal placeholder:font-Poppins placeholder:tracking-wider focus:outline-[#EF4D48] focus:outline-1 focus:outline-dotted"
                />
              </div>
            </div>

            <button
              disabled={formik.isSubmitting}
              type="submit"
              className="flex  justify-center max-w-[200px] rounded-md bg-[#EF4D48] px-5 py-3 text-sm  font-Poppins font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
            >
              Send Message
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default FormContact;
