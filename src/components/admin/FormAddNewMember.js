import React, { useState, useContext } from "react";
import { Formik } from "formik";
import MembersContext from "../../utils/context/Members";
import { POST_MEMBER_DETAILS } from "../../utils/constants";
import axios from "axios";

const FormAddNewMember = () => {
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
          Add New Member
        </button>
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        pfp: "",
        memberType: "trusteeMember",
        name: "",
        profession: "",
        nativePlace: "",
        email: "",
        address: "",
        phoneNumber: "",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values);

        const reqBody = new FormData();
        reqBody.append("pfp", values.pfp);
        reqBody.append("memberType", values.memberType);
        reqBody.append("name", values.name);
        reqBody.append("profession", values.profession);
        reqBody.append("nativePlace", values.nativePlace);
        reqBody.append("email", values.email);
        reqBody.append("address", values.address);
        reqBody.append("phoneNumber", values.phoneNumber);

        try {
          const response = await axios.post(POST_MEMBER_DETAILS, reqBody, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setSubmitting(false);
          resetForm();
          console.log(response.data);

          // if (response.status === 201) {
          //   dispatch(
          //     updateKhojoProfile(
          //       response.data.userWithProfiles.khojoUserProfiles
          //     )
          //   );

          //   navigate("/profiles");
          // }
        } catch (error) {
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
                  <div className="flex gap-4 justify-between items-center min-h-fit ">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="pfp"
                        className="block text-sm font-medium leading-6 text-gray-900 self-start mb-4"
                      >
                        Profile Photo
                      </label>
                      <input
                        style={{
                          display: "none",
                        }}
                        type="file"
                        id="pfp"
                        name="pfp"
                        accept="image/*"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "pfp",
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
                        htmlFor="pfp"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Upload Image
                      </label>
                      {selectedFile ? <p>✔</p> : null}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
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
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("name")}
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="profession"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Profession
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("profession")}
                        id="profession"
                        name="profession"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("email")}
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="nativePlace"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Native Place
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("nativePlace")}
                        id="nativePlace"
                        name="nativePlace"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Address
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        {...formik.getFieldProps("address")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Enter your full address here.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        {...formik.getFieldProps("phoneNumber")}
                        id="phoneNumber"
                        name="phoneNumber"
                        type="number"
                        required
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

export default FormAddNewMember;
