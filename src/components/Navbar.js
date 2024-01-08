import { Fragment } from "react";
import Swal from "sweetalert2";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import marwadi_logo_navbar from "../../assests/images/marwari_logo_pro.webp";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
// import { Link, Location } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import UserContext from "../utils/context/UserContext";

const navigation = [
  { name: "Home", href: "/", current: true },
  {
    name: "About Us",
    current: false,
    subNames: [
      {
        name: "About",
        href: "/about",
      },
      {
        name: "Registration",
        href: "/government-registration",
      },
      {
        name: "Mission and Vision",
        href: "/mission-and-vision",
      },
      {
        name: "MIF Core Members",
        href: "/mif-core-members",
      },
    ],
  },
  {
    name: "Network",
    current: false,
    subNames: [
      {
        name: "Rajasthan",
        subNames: [
          {
            href: "https://app.marwadiinternationalfederation.com/rajasthan-network",
            name: "Udyog Mitra",
          },
        ],
      },
      {
        name: "India",
        subNames: [
          {
            href: "https://app.marwadiinternationalfederation.com/india-network",
            name: "Rajasthan Udyog Mitra",
          },
        ],
      },
      {
        name: "Abroad",
        subNames: [
          {
            href: "https://app.marwadiinternationalfederation.com/abroad-network",
            name: "Marwadi Business Mitra",
          },
        ],
      },
    ],
  },
  { name: "Press", href: "/press", current: false },
  {
    name: "Membership",
    href: "#",
    current: false,

    subNames: [
      {
        name: "Types of Member/Fees",
        href: "/membership-and-fees",
      },
      {
        name: "List of Members",
        href: "/list-of-members",
      },
    ],
  },
  { name: "Gallery", href: "/gallery", current: false },
  {
    name: "Join Us",
    current: false,

    subNames: [
      {
        name: "Consent",
        href: "https://app.marwadiinternationalfederation.com/form",
      },
      {
        name: "Corporate Membership",
        href: "/join-us",
      },
      {
        name: "Individual Membership",
        href: "/join-us-member",
      },
    ],
  },
  {
    name: "Publication",
    current: false,

    subNames: [
      {
        name: "Author",
        subNames: [
          {
            href: "/book-marwadi-vyapari",
            name: "Marwadi Vyapari",
          },
        ],
      },
      {
        name: "Our Publication",
        href: "#",
      },
    ],
  },
  { name: "Study Abroad", href: "/study-abroad", current: false },
  {
    name: "Networking",
    current: false,

    subNames: [
      {
        name: "Business Networking",
        subNames: [
          {
            name: "Free Website",
            href: "/free-website",
          },
        ],
      },

      {
        name: "Social Networking",
        subNames: [
          {
            name: "MIF Marwadi Matrimony",
            href: "/matrimony",
          },
        ],
      },
    ],
  },
  {
    name: "FAQs",
    href: "/faqs",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import { Link, useLocation } from "react-router-dom";
export default function Navbar() {
  const location = useLocation();
  const { userName, setUserName } = useContext(UserContext);
  return (
    <Disclosure as="nav" className="bg-[#FFFEFE] font-Poppins ">
      {({ open }) => (
        <>
          <div className="mx-auto  p-3 px-4 sm:px-6 lg:px-10 z-[100] ">
            <div className="relative flex h-fit items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button : Hamburger Icon*/}

                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 ">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start pl-4 sm:pl-0">
                {/* Marwadi Logo */}

                <div className="flex flex-shrink-0 items-center hover:cursor-pointer">
                  <Link to={"/"}>
                    {" "}
                    <img
                      className="sm:h-20 h-16 w-auto"
                      src={marwadi_logo_navbar}
                      loading="eager"
                      alt="Your Company"
                    />
                  </Link>
                </div>

                <div className="hidden  sm:ml-6 sm:mr-6 sm:flex items-center">
                  <div className="flex flex-wrap items-center">
                    {navigation.map((item, index) => {
                      // console.log(item);
                      if (!item?.subNames) {
                        return (
                          <div key={index}>
                            {" "}
                            <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                item.current
                                  ? "text-[#453E3E]"
                                  : "text-[#453E3E]",
                                "rounded-md px-3 py-2 text-sm font-medium  whitespace-nowrap hover:text-[#EF4D48]"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          </div>
                        );
                      } else if (item?.subNames) {
                        // FOR FIRST LEVEL DROPDOWN

                        return (
                          <Menu as="div" className="relative m-0" key={index}>
                            <div>
                              <Menu.Button className="relative flex rounded-full  text-sm ">
                                <p
                                  className={classNames(
                                    item.current
                                      ? "text-[#453E3E]"
                                      : "text-[#453E3E]",
                                    "rounded-md px-3 py-2 text-sm font-medium flex gap-1 whitespace-nowrap hover:text-[#EF4D48] group"
                                  )}
                                  aria-current={
                                    item.current ? "page" : undefined
                                  }
                                >
                                  {item.name}

                                  <ChevronDownIcon
                                    className="ml-2 -mr-1 h-5 w-5 text-black group-hover:fill-[#EF4D48]"
                                    aria-hidden="true"
                                  />
                                </p>
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 flex flex-col z-[100] mt-2 w-fit min-w-[200px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {item.subNames.map((subName, index) => {
                                  // SECOND LEVEL DROPDOWN

                                  if (!subName?.subNames) {
                                    return (
                                      <Menu.Item key={index}>
                                        <Link
                                          to={subName.href}
                                          className={classNames(
                                            subName.current
                                              ? "text-[#453E3E]"
                                              : "text-[#453E3E]",
                                            "rounded-md px-3 py-2 text-sm font-medium  whitespace-nowrap hover:text-[#EF4D48]"
                                          )}
                                          aria-current={
                                            subName.current ? "page" : undefined
                                          }
                                        >
                                          {subName.name}
                                        </Link>
                                      </Menu.Item>
                                    );
                                  } else if (subName?.subNames) {
                                    return (
                                      <Menu
                                        as="div"
                                        className="relative m-0 w-full"
                                        key={index}
                                      >
                                        <div>
                                          <Menu.Button className="relative flex rounded-full w-full  text-sm ">
                                            <p
                                              className={classNames(
                                                item.current
                                                  ? "text-[#453E3E]"
                                                  : "text-[#453E3E]",
                                                "rounded-md px-3 py-2 text-sm font-medium flex w-full justify-between gap-1 whitespace-nowrap hover:text-[#EF4D48] group"
                                              )}
                                              aria-current={
                                                item.current
                                                  ? "page"
                                                  : undefined
                                              }
                                            >
                                              {subName.name}

                                              <ChevronRightIcon
                                                className="ml-2 -mr-1 h-5 w-5 text-black group-hover:fill-[#EF4D48]"
                                                aria-hidden="true"
                                              />
                                            </p>
                                          </Menu.Button>
                                        </div>
                                        <Transition
                                          as={Fragment}
                                          enter="transition ease-out duration-100"
                                          enterFrom="transform opacity-0 scale-95"
                                          enterTo="transform opacity-100 scale-100"
                                          leave="transition ease-in duration-75"
                                          leaveFrom="transform opacity-100 scale-100"
                                          leaveTo="transform opacity-0 scale-95"
                                        >
                                          <Menu.Items
                                            data-okay="aklsdjfadnfkj"
                                            className="absolute top-0 left-full flex flex-col z-10 ml-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                          >
                                            {subName.subNames.map(
                                              (innreSubName, index) => {
                                                // console.log(innreSubName);
                                                return (
                                                  <Menu.Item key={index}>
                                                    <Link
                                                      to={innreSubName?.href}
                                                      className={classNames(
                                                        innreSubName?.current
                                                          ? "text-[#453E3E]"
                                                          : "text-[#453E3E]",
                                                        "rounded-md px-3 py-2 text-sm font-medium  whitespace-nowrap hover:text-[#EF4D48]"
                                                      )}
                                                      aria-current={
                                                        innreSubName?.current
                                                          ? "page"
                                                          : undefined
                                                      }
                                                      data-name="ha ye hi hai"
                                                    >
                                                      {innreSubName?.name}
                                                    </Link>
                                                  </Menu.Item>
                                                );
                                              }
                                            )}
                                          </Menu.Items>
                                        </Transition>
                                      </Menu>
                                    );
                                  }
                                })}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-row flex-col-reverse gap-3 justify-center items-center ">
                <Link to={"/matrimony"}>
                  <button className="flex w-full justify-center max-w-[220px] rounded-md bg-[#EF4D48] px-3 sm:py-3 py-2  text-sm sm:text-base font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
                    MIF Marwadi Matrimony
                  </button>
                </Link>
                <Link
                  to={
                    "https://app.marwadiinternationalfederation.com/advance-search"
                  }
                >
                  <button className="flex w-full justify-center max-w-[200px] rounded-md bg-[#EF4D48] px-3 sm:py-3 py-2  text-sm sm:text-base font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
                    Find Marwadi
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="flex flex-col gap-1 px-2 pb-3 pt-2 border-b-4 ">
              {navigation.map((item, index) => {
                // console.log(item);
                if (!item?.subNames) {
                  return (
                    <div key={index}>
                      {" "}
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? "text-[#453E3E]" : "text-[#453E3E]",
                          "rounded-md px-3 py-2 text-sm font-medium  whitespace-nowrap"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    </div>
                  );
                } else if (item?.subNames) {
                  // FOR FIRST LEVEL DROPDOWN

                  return (
                    <Menu as="div" className="relative m-0" key={index}>
                      <div>
                        <Menu.Button className="relative flex rounded-full  text-sm ">
                          <p
                            className={classNames(
                              item.current
                                ? "text-[#453E3E]"
                                : "text-[#453E3E]",
                              "rounded-md px-3 py-2 text-sm font-medium flex gap-1 whitespace-nowrap"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}

                            <ChevronDownIcon
                              className="ml-2 -mr-1 h-5 w-5 text-black "
                              aria-hidden="true"
                            />
                          </p>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute left-0 shadow-xl flex flex-col z-[100] mt-2 w-fit min-w-[110px]  origin-top-right rounded-md bg-white py-1  ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {item.subNames.map((subName, index) => {
                            // SECOND LEVEL DROPDOWN

                            if (!subName?.subNames) {
                              return (
                                <Menu.Item key={index}>
                                  <Link
                                    to={subName.href}
                                    className={classNames(
                                      subName.current
                                        ? "text-[#453E3E]"
                                        : "text-[#453E3E]",
                                      "rounded-md px-3 py-2 text-sm font-medium  whitespace-nowrap"
                                    )}
                                    aria-current={
                                      subName.current ? "page" : undefined
                                    }
                                  >
                                    {subName.name}
                                  </Link>
                                </Menu.Item>
                              );
                            } else if (subName?.subNames) {
                              return (
                                <Menu
                                  as="div"
                                  className="relative m-0 w-full"
                                  key={index}
                                >
                                  <div>
                                    <Menu.Button className="relative flex rounded-full w-full  text-sm ">
                                      <p
                                        className={classNames(
                                          item.current
                                            ? "text-[#453E3E]"
                                            : "text-[#453E3E]",
                                          "rounded-md px-3 py-2 text-sm font-medium flex w-full justify-between  whitespace-nowrap"
                                        )}
                                        aria-current={
                                          item.current ? "page" : undefined
                                        }
                                      >
                                        {subName.name}

                                        <ChevronRightIcon
                                          className="ml-2 -mr-1 h-5 w-5 text-black "
                                          aria-hidden="true"
                                        />
                                      </p>
                                    </Menu.Button>
                                  </div>
                                  <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items
                                      data-okay="aklsdjfadnfkj"
                                      className="absolute top-0 left-full flex flex-col z-10 ml-2 w-fit origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                      {subName.subNames.map(
                                        (innreSubName, index) => {
                                          // console.log(innreSubName);
                                          return (
                                            <Menu.Item key={index}>
                                              <Link
                                                to={innreSubName?.href}
                                                className={classNames(
                                                  innreSubName?.current
                                                    ? "text-[#453E3E]"
                                                    : "text-[#453E3E]",
                                                  "rounded-md px-3 py-2 text-sm font-medium  whitespace-nowrap"
                                                )}
                                                aria-current={
                                                  innreSubName?.current
                                                    ? "page"
                                                    : undefined
                                                }
                                                data-name="ha ye hi hai"
                                              >
                                                {innreSubName?.name}
                                              </Link>
                                            </Menu.Item>
                                          );
                                        }
                                      )}
                                    </Menu.Items>
                                  </Transition>
                                </Menu>
                              );
                            }
                          })}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  );
                }
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
