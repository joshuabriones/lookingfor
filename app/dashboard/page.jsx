"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import JobSeekerDashboard from "@/components/JobSeeker/JobSeekerDashboard";
import EmployerDashboard from "@/components/Employer/EmployerDashboard";
import AdminDashboard from "@/components/Admin/AdminDashboard";

const Dashboard = () => {
  const { data: session } = useSession();
  console.log("ROLE: ", session?.role);
  const router = useRouter();

  if (session && !session.user.role) {
    router.push(`/additional-info?userId=${session.user.id}`);
  }

  return (
    <>
      {session?.role === "JOB_SEEKER" && <JobSeekerDashboard />}
      {session?.role === "EMPLOYER" && <EmployerDashboard />}
      {session?.role === "ADMIN" && <AdminDashboard />}
    </>
  );
};

export default Dashboard;
