import React, { useContext, useState, useEffect } from "react";
import FormAddNewPressCutout from "./FormAddNewPressCutout";
import AdminContext from "../../../utils/context/Admincontext";
import {
  GET_PRESS_CUTOUTS,
  DELETE_PRESS_CUTOUT,
} from "../../../utils/constants";

const PressCutout = () => {
  const { admin } = useContext(AdminContext);

  const [cutouts, setCutouts] = useState(null);

  useEffect(() => {
    async function getCutouts() {
      try {
        const resBody = await fetch(GET_PRESS_CUTOUTS, {
          method: "GET",
          headers: {
            Authorization: `bearer ${admin?.token}`,
          },
        });

        if (resBody.status === 200) {
          const resData = await resBody.json();
          //   console.log(resData);
          setCutouts(resData);
        } else {
          throw new Error("Something went wrong, couldn't access data");
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    getCutouts();
  }, []);

  async function deleteQuery(id) {
    try {
      const resBody = await fetch(`${DELETE_PRESS_CUTOUT}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${admin.token}`,
        },
      });

      if (resBody.status === 200) {
        // dispatch(delete_query(id));
        setCutouts((prevClips) => {
          return prevClips.filter((p) => {
            return p._id !== id;
          });
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <FormAddNewPressCutout />
      <div className="flex min-h-full flex-1 flex-col gap-10 justify-center px-6 py-12 lg:px-8">
        <h2 className="text-[#EF4D48] text-xl font-Poppins  font-bold w-full text-start md:text-2xl lg:text-3xl ">
          <p className="border rounded-md border-[#333] p-3 w-fit">
            Press Cutouts ➡
          </p>
        </h2>

        <div className="w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {/* <QueriesTable data={contact?.queries} /> */}
          {!cutouts || cutouts.length === 0 ? (
            <p className="w-full text-center font-Poppins text-xl font-semibold text-[#EF4D48]">
              Seems like no cutouts are available...
            </p>
          ) : (
            // <ClipsTable clips={clips} setClips={setClips} />
            cutouts.map((cutout) => {
              return (
                <div className="flex flex-col justify-center items-center gap-4 border border-gray-700 p-4 rounded-md">
                  <img src={cutout?.url} className="h-52 w-52" />
                  <button
                    onClick={() => {
                      deleteQuery(cutout._id);
                    }}
                    className="flex justify-center rounded-md bg-[#EF4D48] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm "
                  >
                    Delete
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default PressCutout;
