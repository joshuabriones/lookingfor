"use client";

import { useState } from "react";

import Applicants from "@/components/Employer/Applicants";
import Candidates from "@/components/Employer/Candidates";
import Overview from "@/components/Employer/Overview";
import SideMenu from "@/components/Employer/SideMenu";
import ViewAllJobs from "@/components/Employer/ViewAllJobs";

const EmployerDashboard = () => {
  const [currentTab, setCurrentTab] = useState("");
  return (
    <div className="max-w-screen-xl py-8 flex gap-6 mx-auto text-slate-700 flex-col md:flex-row ">
      <SideMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {(currentTab === "overview" || currentTab === "") && <Overview />}
      {currentTab === "candidates" && <Candidates />}
      {currentTab === "jobs" && <ViewAllJobs />}
      {currentTab === "applicants" && <Applicants />}
    </div>
  );
};

export default EmployerDashboard;
