import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

import RecentJobTable from "./RecentJobTable";

const Overview = () => {
  const { data: session } = useSession();
  const [openJobs, setOpenJobs] = useState(0);
  const [candidates, setCandidates] = useState(0);

  useEffect(() => {
    // fetch open jobs
    const fetchOpenJobs = async () => {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setOpenJobs(data.jobs.length);
    };

    const fetchCandidates = async () => {
      const res = await fetch("/api/getAllApplicants");
      const data = await res.json();
      setCandidates(data.users.length);
    };

    fetchOpenJobs();
    fetchCandidates();
  }, []);
  return (
    <div className="flex-1 px-4 py-6 bg-white shadow-md rounded-lg">
      <h3 className="font-semibold text-lg">
        Hello, {session?.user?.name.split(" ")[0]} 👋
      </h3>
      <p className="text-sm text-slate-600">
        Here's your activities and applications
      </p>

      <div className="flex md:gap-6 gap-2 items-start mt-6 flex-col sm:flex-row">
        <div className="flex gap-20 bg-indigo-100 px-4 py-4 rounded-md">
          <div className="flex flex-col justify-between ">
            <h4 className="font-medium text-2xl">{openJobs}</h4>
            <p className="text-sm text-slate-500">Open Jobs</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-md">
            <Image
              src={"/assets/icons/briefcase.svg"}
              width={30}
              height={30}
              alt="open jobs"
            />
          </div>
        </div>
        <div className="flex md:gap-20 gap-[74px] bg-purple-100 px-4 py-4 rounded-md ">
          <div className="flex flex-col justify-between ">
            <h4 className="font-medium text-2xl">{candidates}</h4>
            <p className="text-sm text-slate-500">Candidates</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-md">
            <Image
              src={"/assets/icons/users-alt.svg"}
              width={30}
              height={30}
              alt="Candidates"
            />
          </div>
        </div>
      </div>

      <h4 className="font-semibold text-base mt-10 mb-4">
        Recently Posted Jobs
      </h4>
      <RecentJobTable employerId={session.user.id} />
    </div>
  );
};

export default Overview;
