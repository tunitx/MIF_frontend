import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { useContext } from "react";
import AdminContext from "../../utils/context/Admincontext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Home", href: "/admin", current: false },
  { name: "List Of Members", href: "/admin/list-of-members", current: false },
  { name: "Press", href: "/admin/press", current: false },
  {
    name: "Advertisment Board",
    href: "/admin/advertisment-board",
    current: false,
  },
  {
    name: "Contact Queries",
    href: "/admin/contact-queries",
  },
  // {
  //   name: "All members",
  //   href: "/admin/members",
  // },
  // {
  //   name: "All Advertisements",
  //   href: "/admin/advertisements",
  // },
  {
    name: "All Press",
    href: "/admin/all-press",
  },
  {
    name: "Press Clips",
    href: "/admin/press-clip",
  },
  {
    name: "Press Cutout",
    href: "/admin/press-cutout",
  },
  {
    name: "Advertisements",
    href: "/admin/all-adv",
  },
  {
    name: "Matrimony",
    href: "/admin/matrimony-users",
  },
];

export default function AdminNavbar() {
  //   const userStore = useSelector((store) => store.User);
  //   const dispatch = useDispatch();

  const { admin, setAdmin } = useContext(AdminContext);

  return (
    <Disclosure as="nav" className="bg-gray-800 mb-4">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-8 ">
            <div className="relative flex sm:h-fit min-h-[64px] h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden  sm:block">
                  <div className="flex  flex-wrap">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4">
                <Link to={"/"}>
                  <button
                    type="button"
                    className="relative border border-white rounded-lg px-4 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none  focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Public
                  </button>
                </Link>

                {admin ? (
                  <button
                    onClick={() => {
                      setAdmin(null);
                      localStorage.removeItem("admin");
                    }}
                    type="button"
                    className="relative border whitespace-nowrap border-white rounded-lg px-4 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none  focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Sign Out
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  // as="a"
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
