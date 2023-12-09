import React, { useContext } from "react";
import { DELETE_CONTACT_QUERY } from "../../../utils/constants";
import AdminContext from "../../../utils/context/Admincontext";
import { useDispatch } from "react-redux";
import { delete_query } from "../../../utils/store/slices/contactQueriesSlice";

const QueriesTable = ({ data }) => {
  const dispatch = useDispatch();

  const { admin, setAdmin } = useContext(AdminContext);

  if (!data || data.length === 0) return;

  async function deleteQuery(id) {
    try {
      const resBody = await fetch(`${DELETE_CONTACT_QUERY}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${admin.token}`,
        },
      });

      

      if (resBody.status === 200) {
        dispatch(delete_query(id));
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="overflow-x-auto fade-in w-full flex justify-center">
      <table className="w-full border-2 border-[#305D2B] max-w-7xl">
        <thead className="w-full">
          <tr className="bg-[#305D2B] text-white w-full">
            <th className="p-3 text-center  border-white border-r whitespace-nowrap font-bold font-Poppins">
              Name
            </th>
            <th className="p-3 text-center border-white border-r  whitespace-nowrap font-bold font-Poppins">
              Email
            </th>
            <th className="p-3 text-center  border-white border-r whitespace-nowrap font-bold font-Poppins">
              Subject
            </th>
            <th className="p-3 text-center border-white border-r  whitespace-nowrap font-bold font-Poppins">
              Message
            </th>
            <th className="p-3 text-center border-white border-r whitespace-nowrap font-bold font-Poppins">
              Created At
            </th>
            <th className="p-3 text-center border-white border-r  whitespace-nowrap font-bold font-Poppins">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {data.map(
            ({ name, email, messageBody, subject, createdAt, _id }, index) => (
              <tr
                key={_id}
                className="border-b border-[#EF4D48] w-full align-middle"
              >
                <td className="p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap font-bold font-Poppins">
                  {name}
                </td>
                <td className="p-2 border-r border-[#EF4D48]  text-center   text-[#333] whitespace-nowrap  font-Poppins">
                  {email}
                </td>
                <td className="p-2 border-r border-[#EF4D48]  text-center   text-[#333]   font-Poppins">
                  {subject}
                </td>
                <td className="p-2 border-r border-[#EF4D48]  text-center   text-[#333]   font-Poppins">
                  {messageBody}
                </td>
                <td className="p-2 border-r border-[#EF4D48]  text-center   text-[#333]   font-Poppins">
                  {createdAt}
                </td>
                <td className="p-2 mt-1  text-center  align-middle min-w-full whitespace-nowrap h-full mx-auto hover:cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.3rem"
                    viewBox="0 0 448 512"
                    fill="#EF4D48"
                    className="mx-auto"
                    onClick={() => {
                      deleteQuery(_id);
                    }}
                  >
                    {/*!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QueriesTable;
