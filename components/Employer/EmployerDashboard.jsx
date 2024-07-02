"use client";

import { useState } from "react";

import SideMenu from "@/components/Employer/SideMenu";
import Overview from "@/components/Employer/Overview";
import Candidates from "@/components/Employer/Candidates";
import ViewAllJobs from "@/components/Employer/ViewAllJobs";

const EmployerDashboard = () => {
  const [currentTab, setCurrentTab] = useState("");
  return (
    <div className="max-w-screen-xl py-8 flex gap-6 mx-auto text-slate-700 ">
      <SideMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {(currentTab === "overview" || currentTab === "") && <Overview />}
      {currentTab === "candidates" && <Candidates />}
      {currentTab === "jobs" && <ViewAllJobs />}
    </div>
  );
};

export default EmployerDashboard;
