"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

import Loading from "@/components/Loading";

const FindWork = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data.jobs);
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
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-screen-md py-8 mx-auto px-4">
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h3 className="font-medium text-2xl mt-8">Jobs you might like</h3>
      <p className="text-slate-500 text-sm mt-1">
        Explore job opportunities that align with your experience and the
        client's hiring preferences, sorted by relevance.
      </p>
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-8">
          {filteredJobs.map((job) => (
            <Link
              href={`/findwork/${job.id}`}
              key={job.id}
              className="group flex justify-between bg-white p-4 border-b  hover:border-purple-400 hover:bg-gray-50 transition-all duration-200 gap-2 flex-col-reverse sm:flex-row"
            >
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-[12px] text-gray-500">
                    {`Posted ${formatDistanceToNow(parseISO(job.createdAt), {
                      addSuffix: true,
                    })}`}
                  </p>
                  <h2 className="font-medium text-xl group-hover:gradient-text ">
                    {job.title}
                  </h2>
                  <p className="text-sm mt-4 text-gray-500">
                    {job.description}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Requirements: {job.requirements}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">💰 ₱{job.salary}</p>
                  <p className="text-sm text-gray-500">
                    📍
                    {job.location}
                  </p>
                </div>
              </div>
              {job.image ? (
                <Image
                  src={job.image}
                  alt={job.title}
                  width={300}
                  height={100}
                  className="object-cover rounded"
                />
              ) : (
                <div></div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindWork;

function SearchInput({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative rounded-2xl w-full">
      <label htmlFor="Search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for..."
        className="w-full rounded-lg border-2 px-4 sm:py-3 py-2 pe-10 shadow-sm sm:text-sm"
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
