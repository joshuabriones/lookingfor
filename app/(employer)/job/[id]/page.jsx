"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const JobPage = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState({});
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session && session.user.role === "JOB_SEEKER") {
    router.push("/dashboard");
  }

  if (!session && status === "unauthenticated") {
    router.push("/login");
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();

        setJobs(data.job);
      } catch (e) {
        console.log(e);
      }
    };

    fetchJobs();
  }, [id]);

  console.log(jobs);

  return (
    <div className="max-w-screen-md mx-auto min-h-screen px-8 py-10 text-slate-700">
      {jobs.title}
    </div>
  );
};

export default JobPage;
