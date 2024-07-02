import { useState, useEffect } from "react";

import JobCard from "./JobCard";
import Loading from "../Loading";

const ViewAllJobs = () => {
  const [jobs, setJobs] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchJobs();
  }, []);
  console.log(jobs);
  return (
    <div className="flex-1 px-4 py-6 bg-white shadow-md rounded-lg">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-4">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllJobs;
