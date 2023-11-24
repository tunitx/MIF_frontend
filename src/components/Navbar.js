import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import marwadi_logo_navbar from "../../assests/images/marwari_logo_pro.png";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/", current: true },
  {
    name: "About Us",
    href: "#",
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
    href: "#",
    current: false,
    subNames: [
      {
        name: "Rajasthan",
        href: "https://app.marwadiinternationalfederation.com/rajasthan-network",
        subNames: [
          {
            name: "Udyog Mitra",
          },
        ],
      },
      {
        name: "India",
        href: "https://app.marwadiinternationalfederation.com/india-network",
        subNames: [
          {
            name: "Rajasthan Udyog Mitra",
          },
        ],
      },
      {
        name: "Abroad",
        href: "https://app.marwadiinternationalfederation.com/abroad-network",
        subNames: [
          {
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
    href: "#",
    current: false,

    subNames: [
      {
        name: "Consent",
        href: "https://app.marwadiinternationalfederation.com/form",
      },
      {
        name: "Membership",
        href: "#",
      },
    ],
  },
  {
    name: "Publication",
    href: "#",
    current: false,

    subNames: [
      {
        name: "Author",
        href: "/book-marwadi-vyapari",
        subNames: [
          {
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
    name: "Business Networking",
    href: "#",
    current: false,

    subNames: [
      {
        name: "Free Website",
        href: "/free-website",
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

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-[#FFFEFE] font-Poppins ">
      {({ open }) => (
        <>
          <div className="mx-auto  p-3 px-4 sm:px-6 lg:px-10 ">
            <div className="relative flex h-fit items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
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
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
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
                    {navigation.map((item) => {
                      // console.log(item);
                      if (!item?.subNames) {
                        return (
                          <div>
                            {" "}
                            <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                item.current
                                  ? "text-[#453E3E]"
                                  : "text-[#453E3E]",
                                "rounded-md px-3 py-2 text-sm font-medium  whitespace-nowrap"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          </div>
                        );
                      } else {
                        return (
                          <Menu as="div" className="relative m-0">
                            <div>
                              <Menu.Button className="relative flex rounded-full  text-sm ">
                                <p
                                  className={classNames(
                                    item.current
                                      ? "text-[#453E3E]"
                                      : "text-[#453E3E]",
                                    "rounded-md px-3 py-2 text-sm font-medium flex gap-1 whitespace-nowrap"
                                  )}
                                  aria-current={
                                    item.current ? "page" : undefined
                                  }
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
                              <Menu.Items className="absolute right-0 flex flex-col z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {item.subNames.map((subName) => {
                                  return (
                                    <Menu.Item>
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
              <div>
                <Link
                  to={
                    "https://app.marwadiinternationalfederation.com/advance-search"
                  }
                >
                  <button className="flex w-full justify-center max-w-[200px] rounded-md bg-[#EF4D48] px-3 sm:py-3 py-2  text-base sm:text-lg font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
                    Find Marwadi
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="flex flex-col gap-1 px-2 pb-3 pt-2 border-b-4 ">
              {navigation.map((item) => {
                // console.log(item);
                if (!item?.subNames) {
                  return (
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
                  );
                } else {
                  return (
                    <Menu as="div" className="relative">
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
                        <Menu.Items className=" right-0 flex flex-col z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {item.subNames.map((subName) => {
                            return (
                              <Menu.Item>
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
