import React from "react";

const SideMenu = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="flex md:w-[20%] w-full h-auto max-h-52 flex-col justify-between border-e bg-white shadow-md rounded-lg">
      <div className="px-4 py-6">
        <ul className="space-y-1">
          <li>
            <a
              onClick={() => setCurrentTab("overview")}
              className={`block rounded-lg  px-4 py-2 text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-gray-700 ${
                (currentTab === "overview" || currentTab === "") &&
                "bg-gray-100 text-gray-700"
              }`}
            >
              Overview
            </a>
          </li>

          <li>
            <a
              onClick={() => setCurrentTab("candidates")}
              className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-gray-700 ${
                currentTab === "candidates" && "bg-gray-100 text-gray-700"
              }`}
            >
              Candidates
            </a>
          </li>

          <li>
            <a
              onClick={() => setCurrentTab("jobs")}
              className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-gray-700 ${
                currentTab === "jobs" && "bg-gray-100 text-gray-700"
              }`}
            >
              View All Jobs
            </a>
          </li>
          
          <li>
            <a
              onClick={() => setCurrentTab("applicants")}
              className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-gray-700 ${
                currentTab === "applicants" && "bg-gray-100 text-gray-700"
              }`}
            >
              Applicants
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
