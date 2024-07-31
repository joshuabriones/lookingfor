"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsSticky(latest > 0);
    });

    return () => unsubscribe();
  }, [scrollY]);

  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/additional-info"
  ) {
    return null;
  }

  var navLinks = [];

  switch (session?.user?.role) {
    case "JOB_SEEKER":
      navLinks = [
        { name: "Home", href: "/dashboard" },
        { name: "Find Work", href: "/findwork" },
        { name: "Applied Jobs", href: "/appliedjobs" },
      ];
      break;
    case "EMPLOYER":
      navLinks = [
        { name: "Home", href: "/dashboard" },
        { name: "Post a Job", href: "/job-post" },
        { name: "Posted Jobs", href: "/posted-jobs" },
      ];
      break;
    default:
      navLinks = [
        { name: "How it works", href: "#" },
        { name: "About", href: "#" },
      ];
  }

  return (
    <motion.header
      className={`bg-white ${isSticky ? "sticky top-0 z-50 shadow-md" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link href="/" className="block text-2xl font-bold gradient-text">
              L∞kingfor
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      className={`text-gray-500 hover:gradient-text ${
                        pathname === link.href ? "gradient-text" : ""
                      }`}
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {status === "loading" ? (
                <div className="h-full w-full bg-white"></div>
              ) : session ? (
                <button onClick={() => setOpenProfile((prev) => !prev)}>
                  <Image
                    src={`${
                      session.user.image ||
                      `https://ui-avatars.com/api/?name=${session.user.name}`
                    }`}
                    width={40}
                    height={40}
                    alt="user profile"
                    className="rounded-full border hover:border-indigo-600"
                  />

                  {openProfile && (
                    <div className="relative text-left">
                      <div
                        className="absolute end-0 z-10 mt-2 w-48 rounded-md border border-gray-100 bg-white shadow-lg"
                        role="menu"
                      >
                        <div className="p-2">
                          <Link
                            href="/profile"
                            className="flex gap-2 items-center rounded-lg px-4 py-2 text-sm hover:bg-gray-50 hover:text-gray-700"
                            role="menuitem"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                            >
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            Profile
                          </Link>

                          <button
                            className="flex gap-2 items-center w-full text-left rounded-lg px-4 py-2 text-sm  hover:bg-gray-50 hover:text-gray-700"
                            role="menuitem"
                            onClick={() =>
                              signOut({ callbackUrl: "/login", redirect: true })
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                            >
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path d="M5 3h14a2 2 0 0 1 2 2v6h-2V5H5v14h14v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm11 10v4h-2v-4h-2.586L16 10.414 14.586 9l-4 4 4 4L16 14.586 13.414 12H16z" />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              ) : (
                <div className="sm:flex sm:gap-4 items-center">
                  <Link
                    className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-700 duration-200"
                    href="/login"
                  >
                    Login
                  </Link>

                  <Link
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-indigo-500 hover:bg-gray-200 duration-200"
                    href="/signup"
                  >
                    Register
                  </Link>
                </div>
              )}
              {/* MOBILE SCREEN */}
              <div className="block md:hidden">
                <button
                  onClick={() => setToggle((prev) => !prev)}
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {toggle && (
                    <motion.div
                      className="absolute top-16 left-0 right-0 bg-white shadow-md rounded-md p-4 z-50"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                          <li key={link.name}>
                            <a
                              className="block py-2 text-gray-500 transition hover:text-gray-500/75 hover:gradient-text"
                              href={link.href}
                            >
                              {link.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
