"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import Loading from "../Loading";

const JobSeekerDashboard = () => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/jobs");
      const data = await res.json();
      const jobs = data.jobs.filter((job) => job.image !== null).slice(0, 6);
      setJobs(jobs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl py-8 mx-auto ">
      <div className="px-6 pt-8 pb-6 rounded-xl bg-gradient-to-r from-purple-400 to-blue-500 text-white ">
        <h4 className="font-medium md:text-3xl text-2xl">
          Welcome to L∞kingfor,{" "}
          {session.user.name
            ? session.user.name.split(" ")[0]
            : session.image.split("=")[1].split("+").join(" ")}
        </h4>
        <div className="flex gap-4 mt-6 lg:flex-row flex-col">
          <div className="flex-1 p-4 rounded-lg bg-white bg-opacity-20">
            <p className="text-[12px]">RECOMMENDED FOR YOU</p>
            <div className="flex justify-between items-start mt-3 gap-3 sm:gap-0 sm:items-center sm:flex-row flex-col ">
              <div className="flex items-center gap-2">
                <span className="bg-purple-400 bg-opacity-90 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 9V5a3 3 0 00-3-3L5 12v8a2 2 0 002 2h9.28a2 2 0 001.89-1.316l1.38-4.14a1 1 0 00-.743-1.285l-7.442-1.57a.25.25 0 01-.198-.245V9z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 13h5v8H7v-8z"
                    />
                  </svg>
                </span>
                <div className="">
                  <p className="font-medium">Get matched with employers</p>
                  <p className="text-[12px]">
                    Create a brief and get custom offers.
                  </p>
                </div>
              </div>

              <a
                href="#hotjobs"
                className="border border-white rounded-md px-4 py-2 self-end hover:bg-white hover:bg-opacity-10"
              >
                Get started
              </a>
            </div>
          </div>
          <div className="flex-1 p-4 rounded-lg bg-white bg-opacity-20 ">
            <p className="text-[12px]">JOB RECOMMENDATIONS</p>
            <div className="flex justify-between items-start mt-3 gap-3 sm:gap-0 sm:items-center sm:flex-row flex-col">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-400 bg-opacity-90 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 11V7a4 4 0 10-8 0v4H5a1 1 0 00-1 1v8a2 2 0 002 2h12a2 2 0 002-2v-8a1 1 0 00-1-1h-3z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 11V7a2 2 0 014 0v4m-2 4h.01"
                    />
                  </svg>
                </span>
                <div className="">
                  <p className="font-medium">Tailor L∞kingfor to your needs</p>
                  <p className="text-[12px]">
                    We'll find the best jobs for you.
                  </p>
                </div>
              </div>

              <Link
                href="/findwork"
                className="border border-white rounded-md px-4 py-2 self-end hover:bg-white hover:bg-opacity-10"
              >
                Search jobs
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section id="hotjobs" className="mt-8">
        <div className="flex flex-col md:flex-row items-start gap-3 md:gap-0 md:items-center justify-between mb-8">
          <h1 className="font-medium text-2xl">
            Explore hot jobs on L∞kingfor
          </h1>
          <SearchInput
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-8 mt-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Link
                href="/findwork"
                key={job.id}
                className="hover:scale-105 transition-all duration-300"
              >
                <div className="relative w-full h-52 ">
                  <img
                    src={job.image}
                    alt={job.title}
                    className="h-full w-full object-cover rounded-lg border border-gray-300"
                  />
                </div>

                <h2 className="flex items-center gap-1 mt-4 font-medium">
                  <span>
                    <img
                      src={
                        job.employer.profile.image ||
                        `https://ui-avatars.com/api/?name=${job?.employer?.profile?.firstName}+${job?.employer?.profile?.lastName}`
                      }
                      className="w-8 h-8 rounded-full"
                    />
                  </span>
                  {job.title}
                </h2>

                <p className="text-slate-500 mt-1 hover:underline">
                  {job.description}
                </p>
                <p className="mt-1 text-slate-500">
                  💰Starting salary ₱{job.salary}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default JobSeekerDashboard;

function SearchInput({ searchInput, setSearchInput }) {
  return (
    <div className="relative rounded-2xl md:w-1/2 w-full">
      <label htmlFor="Search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Software Engineer, Web Developer, etc."
        className="w-full rounded-lg border-2 border-purple-200 px-4 sm:py-3 py-2 pe-10 shadow-sm sm:text-sm"
      />
      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button type="button" className="text-gray-600 hover:text-gray-700">
          <span className="sr-only">Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </div>
  );
}
