import React, { useState, useContext } from "react";
import { Formik } from "formik";
import MembersContext from "../../utils/context/Members";
import axios from "axios";
import { POST_ADVERTISMENT } from "../../utils/constants";

const FormAddAdvertisment = () => {
  const [show, setShow] = useState(false);
  const { membersList, setMembersList } = useContext(MembersContext);
  const [selectedFile, setFile] = useState(null);
  // console.log(membersList);

  if (!show) {
    return (
      <div className="w-full flex justify-center mt-4">
        <button
          onClick={() => {
            setShow(true);
          }}
          className="flex w-fit justify-center rounded-md bg-[#EF4D48] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm "
        >
          Add Advertisment
        </button>
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        businessImage: "",
        title: "",
        twitter: "",
        facebook: "",
        playStore: "",
        instagram: "",
        email: "",
        description: "",
        phone: "",
        whatsapp: "",
        youtube: "",
        website: "",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values);

        const reqBody = new FormData();
        reqBody.append("businessImage", values.businessImage);
        reqBody.append("title", values.title);
        reqBody.append("twitter", values.twitter);
        reqBody.append("description", values.description);
        reqBody.append("facebook", values.facebook);
        reqBody.append("email", values.email);
        reqBody.append("playStore", values.playStore);
        reqBody.append("instagram", values.instagram);
        reqBody.append("phone", values.phone);
        reqBody.append("whatsapp", values.whatsapp);
        reqBody.append("youtube", values.youtube);
        reqBody.append("website", values.website);

        try {
          const response = await axios.post(POST_ADVERTISMENT, reqBody, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setSubmitting(false);
          // resetForm();
          console.log(response.data);

          // console.log(values);

          // if (response.status === 201) {
          //   dispatch(
          //     updateKhojoProfile(
          //       response.data.userWithProfiles.khojoUserProfiles
          //     )
          //   );

          //   navigate("/profiles");
          // }
        } catch (error) {
          console.log(errors);
          // resetForm();
          // setImage(null);
          // setError(error.message);
        }
      }}
    >
      {(formik) => {
        return (
          <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="w-full flex justify-center mt-5">
                <button
                  onClick={() => {
                    setShow(false);
                  }}
                  className="flex w-fit justify-center rounded-md bg-[#EF4D48] px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm "
                >
                  Cancel
                </button>
              </div>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                  className="space-y-6"
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  {/* BUSINESS IMAGE */}

                  <div className="flex gap-4 justify-between items-center min-h-fit ">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="businessImage"
                        className="block text-sm font-medium leading-6 text-gray-900 self-start mb-4"
                      >
                        Profile Photo
                      </label>
                      <input
                        style={{
                          display: "none",
                        }}
                        type="file"
                        id="businessImage"
                        name="businessImage"
                        accept="image/*"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "businessImage",
                            event.currentTarget.files[0]
                          );
                          setFile(event.currentTarget.files[0]);
                          // const reader = new FileReader();
                          // reader.readAsDataURL(event.currentTarget.files[0]);
                          // reader.onload = (evt) => {
                          //   setImage(reader.result);
                          // };
                        }}
                      />
                      <label
                        htmlFor="businessImage"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Upload Business Image
                      </label>
                      {selectedFile ? <p>✔</p> : null}
                    </div>
                  </div>

                  {/* <div className="sm:col-span-3">
                    <label
                      htmlFor="memberType"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Member Type
                    </label>
                    <div className="mt-2">
                      <select
                        id="memberType"
                        name="memberType"
                        {...formik.getFieldProps("memberType")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value={"trusteeMember"}>Trustee Member</option>
                        <option value={"advisoryMember"}>
                          Advisory Member
                        </option>
                        <option value={"activeMember"}>
                          Active Life Member
                        </option>
                      </select>
                    </div>
                  </div> */}

                  {/* BUSINESS TITLE */}

                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Business Title
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("title")}
                        id="title"
                        name="title"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* BUSINESS DESCRIPTION */}

                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Business Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        required
                        rows={3}
                        {...formik.getFieldProps("description")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Enter your full address here.
                    </p>
                  </div>

                  {/* TWITTER */}

                  <div>
                    <label
                      htmlFor="twitter"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Twitter
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("twitter")}
                        id="twitter"
                        name="twitter"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* FACEBOOK */}

                  <div>
                    <label
                      htmlFor="facebook"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Facebook
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("facebook")}
                        id="facebook"
                        name="facebook"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* PlayStore */}

                  <div>
                    <label
                      htmlFor="playStore"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Play Store
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("playStore")}
                        id="playStore"
                        name="playStore"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* INSTAGRAM */}

                  <div>
                    <label
                      htmlFor="instagram"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Instagram
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("instagram")}
                        id="instagram"
                        name="instagram"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      E-mail
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("email")}
                        id="email"
                        name="email"
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* YOUTUBE */}

                  <div>
                    <label
                      htmlFor="youtube"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Youtube
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("youtube")}
                        id="youtube"
                        name="youtube"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* WEBSITE */}

                  <div>
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Website
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("website")}
                        id="website"
                        name="website"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* PHONE */}

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("phone")}
                        id="phone"
                        name="phone"
                        type="number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* WHATSAPP */}

                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Whatsapp Number
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("whatsapp")}
                        id="whatsapp"
                        name="whatsapp"
                        type="number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className="flex w-full justify-center rounded-md bg-[#EF4D48] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm "
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default FormAddAdvertisment;
