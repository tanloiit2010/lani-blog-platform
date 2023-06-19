import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import Button from "@/app/components/atoms/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/components/atoms/Loading";

const Header: React.FC = () => {
  const { status, data: session } = useSession();
  const router = useRouter();

  const userEmail = session?.user?.email;

  const userNavigation = [
    {
      name: "My Posts",
      onClick: () => {
        router.push("/my-posts");
      },
    },
    {
      name: "Sign out",
      onClick: () => signOut(),
    },
  ];

  const unAuthorizeNavigation = [
    {
      name: "Sign In",
      variant: "primary" as "primary" | "white",
      onClick: () => signIn(),
    },
    {
      name: "Sign Up",
      variant: "white" as "primary" | "white",
      onClick: () => router.push("/sign-up"),
    },
  ];

  return (
    <Disclosure as="header" className="border-b border-gray-200 bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <Link href="/" className="flex items-center">
                  <div className=" text-lg md:text-3xl font-semibold">
                    Lani Blog
                  </div>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-2">
                {status === "loading" && <Loading />}
                {status === "unauthenticated" &&
                  unAuthorizeNavigation.map((nav) => (
                    <Button
                      key={nav.name}
                      variant={nav.variant}
                      onClick={nav.onClick}
                    >
                      {nav.name}
                    </Button>
                  ))}
                {status === "authenticated" && (
                  <>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 space-x-2">
                          <div className="text-lg">{userEmail}</div>
                          <ChevronDownIcon className="h-4 w-4" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <button
                                  onClick={item.onClick}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "w-full text-right block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="border-t border-gray-200 pb-3 pt-4">
              {status === "loading" && <Loading />}
              {status === "unauthenticated" && (
                <div className="space-y-1">
                  {unAuthorizeNavigation.map((nav) => (
                    <Disclosure.Button
                      key={nav.name}
                      as="button"
                      onClick={nav.onClick}
                      className="w-full  text-left block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      {nav.name}
                    </Disclosure.Button>
                  ))}
                </div>
              )}
              {status === "authenticated" && (
                <>
                  <div className="px-4 text-lg">{userEmail}</div>
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="button"
                        onClick={item.onClick}
                        className="w-full  text-left block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
