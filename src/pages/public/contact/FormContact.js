import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { POST_CONTACT_QUERY } from "../../../utils/constants";

const FormContact = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        subject: "",
        messageBody: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().trim().required("*Name is required"),
        email: Yup.string()
          .email("*Email is not valid.")
          .trim()
          .required("*Email is required"),
        subject: Yup.string().trim().required("*Subject is required"),
        messageBody: Yup.string().trim().required("*Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setError(null);
          setMessage(null);

          const resBody = await fetch(POST_CONTACT_QUERY, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          resetForm();
          setSubmitting(false);

          if (resBody.status === 201) {
            setMessage("Your message has been delivered.");
          } else {
            setError("Something went wrong.");
          }
        } catch (e) {
          resetForm();
          setSubmitting(false);
          setError("Something went wrong, please try again.");
        }
      }}
    >
      {(formik) => {
        return (
          <form
            onSubmit={formik.handleSubmit}
            className={`flex flex-col fade-in gap-6 w-full ${
              formik.isSubmitting ? "opacity-50" : ""
            }`}
          >
            <div className="w-full flex flex-col gap-4 sm:gap-5 ">
              {/* Name */}

              <div className="w-full">
                <input
                  {...formik.getFieldProps("name")}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="block w-full  border py-3 px-4 text-normal text-gray-700 font-Poppins  placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal placeholder:font-Poppins placeholder:tracking-wider focus:outline-[#EF4D48] focus:outline-1 focus:outline-dotted"
                />
                <ErrorMessage
                  name="name"
                  className="mt-1 text-sm fade-in font-mono leading-6 text-[#EF4D48]"
                  component="p"
                />
              </div>

              {/* Email */}

              <div className="w-full">
                <input
                  {...formik.getFieldProps("email")}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="block w-full  border py-3 px-4 text-normal text-gray-700 font-Poppins  placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal placeholder:font-Poppins placeholder:tracking-wider focus:outline-[#EF4D48] focus:outline-1 focus:outline-dotted"
                />
                <ErrorMessage
                  name="email"
                  className="mt-1 text-sm fade-in font-mono leading-6 text-[#EF4D48]"
                  component="p"
                />
              </div>

              {/* Subject */}

              <div className="w-full">
                <input
                  {...formik.getFieldProps("subject")}
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  className="block w-full  border py-3 px-4 text-normal text-gray-700 font-Poppins  placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal placeholder:font-Poppins placeholder:tracking-wider focus:outline-[#EF4D48] focus:outline-1 focus:outline-dotted"
                />
                <ErrorMessage
                  name="subject"
                  className="mt-1 text-sm fade-in font-mono leading-6 text-[#EF4D48]"
                  component="p"
                />
              </div>

              {/* Message */}

              <div className="w-full">
                <textarea
                  {...formik.getFieldProps("messageBody")}
                  id="messageBody"
                  name="messageBody"
                  type="text"
                  placeholder="Your Message"
                  className="block w-full  border py-3 px-4 h-28 text-normal text-gray-700 font-Poppins  placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal placeholder:font-Poppins placeholder:tracking-wider focus:outline-[#EF4D48] focus:outline-1 focus:outline-dotted"
                />
                <ErrorMessage
                  name="messageBody"
                  className="mt-1 text-[#EF4D48] text-sm fade-in font-mono leading-6 "
                  component="p"
                />
              </div>
            </div>

            {/* Error or Successful popup */}

            <div className="w-full flex justify-center items-center text-center">
              {error !== null ? (
                <div className="flex fade-in justify-between items-center w-full">
                  <p className="text-gray-700 w-full text-start text-xl font-Poppins font-semibold font-founder">
                    {error}
                  </p>
                  <p
                    className="text-red-700 border p-1 rounded-md border-gray-900 text-xl font-bold font-founder hover:cursor-pointer"
                    onClick={() => {
                      setError(null);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.3rem"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </p>
                </div>
              ) : null}
              {message !== null ? (
                <div className="flex fade-in justify-between items-center font-Poppins w-full">
                  <p
                    className="text-gray-700
                 text-xl font-semibold font-founder w-full text-start"
                  >
                    {message}
                  </p>
                  <p
                    className="text-[#EF4D48] border p-1 rounded-md border-gray-900
                   text-xl font-bold font-founder hover:cursor-pointer whitespace-nowrap"
                    onClick={() => {
                      setMessage(null);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.3rem"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </p>
                </div>
              ) : null}
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
