import React, { useEffect, useContext } from "react";
import FormAddNewPressClip from "./FormAddNewPressClip";
import AdminContext from "../../../utils/context/Admincontext";
import { GET_PRESS_CLIPS } from "../../../utils/constants";
import { useState } from "react";
import ClipsTable from "./ClipsTable";

const PressClip = () => {
  const { admin } = useContext(AdminContext);

  const [clips, setClips] = useState(null);

  useEffect(() => {
    async function getClips() {
      try {
        const resBody = await fetch(GET_PRESS_CLIPS, {
          method: "GET",
          headers: {
            Authorization: `bearer ${admin?.token}`,
          },
        });

        if (resBody.status === 200) {
          const resData = await resBody.json();

          setClips(resData);
        } else {
          throw new Error("Something went wrong, couldn't access data");
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    getClips();
  }, []);

  return (
    <div>
      <FormAddNewPressClip />
      <div className="flex min-h-full flex-1 flex-col gap-10 justify-center px-6 py-12 lg:px-8">
        <h2 className="text-[#EF4D48] text-xl font-Poppins  font-bold w-full text-start md:text-2xl lg:text-3xl ">
          <p className="border rounded-md border-[#333] p-3 w-fit">
            Press Clip List ➡
          </p>
        </h2>

        <div className="w-full  flex justify-center items-center">
          {/* <QueriesTable data={contact?.queries} /> */}
          {!clips || clips.length === 0 ? (
            <p className="w-full text-center font-Poppins text-xl font-semibold text-[#EF4D48]">
              Seems like no clips are available...
            </p>
          ) : (
            <ClipsTable clips={clips} setClips={setClips} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PressClip;
