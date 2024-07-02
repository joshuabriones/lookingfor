"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const JobPage = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState({});

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
    <div className="max-w-screen-md mx-auto min-h-screen px-8 py-10 text-slate-700"></div>
  );
};

export default JobPage;
