"use client";

import { signOut } from "next-auth/react";

const JobSeekerDashboard = () => {
  return (
    <div>
      <h1>Job seeker dashboard</h1>
      <button
        onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
      >
        Sign Out
      </button>
    </div>
  );
};

export default JobSeekerDashboard;
