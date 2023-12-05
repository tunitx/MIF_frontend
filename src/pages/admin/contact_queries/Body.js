import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { populate_queries } from "../../../utils/store/slices/contactQueriesSlice";
import { GET_CONTACT_QUERIES } from "../../../utils/constants";
import AdminContext from "../../../utils/context/Admincontext";
import QueriesTable from "./QueriesTable";

const Body = () => {
  const contact = useSelector((store) => store.ContactQueriesSlice);
  const { admin } = useContext(AdminContext);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getQueries() {
      try {
        const resBody = await fetch(GET_CONTACT_QUERIES, {
          method: "GET",
          headers: {
            Authorization: `bearer ${admin?.token}`,
          },
        });

        if (resBody.status === 200) {
          const resData = await resBody.json();
          dispatch(populate_queries(resData));
        } else {
          throw new Error("Something went wrong, couldn't access data");
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    getQueries();
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col gap-10 justify-center px-6 py-12 lg:px-8">
      <h2 className="text-[#EF4D48] text-xl font-Poppins  font-bold w-full text-start md:text-2xl lg:text-3xl ">
        <p className="border rounded-md border-[#333] p-3 w-fit">
          Contact Queries List ➡
        </p>
      </h2>

      <div className="w-full  flex justify-center items-center">
        <QueriesTable data={contact?.queries} />
      </div>
    </div>
  );
};

export default Body;
