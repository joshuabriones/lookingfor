"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow, parseISO } from "date-fns";

import Loading from "@/components/Loading";

const Appliedjobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session && session.user.role === "EMPLOYER") {
    router.push("/dashboard");
  }

  console.log(session);

  if (!session && status === "unauthenticated") {
    router.push("/login");
  }

  const fetchAppliedJobs = async () => {
    if (!session?.user?.id) return;

    try {
      const res = await fetch(`/api/users/${session.user.id}`);
      const data = await res.json();

      if (data.status === 404) {
        return setAppliedJobs([]);
      }

      setAppliedJobs(data.applications);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchAppliedJobs();
    }
  }, [status]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-screen-md py-8 mx-auto px-4">
      <h2 className="text-2xl font-medium mb-10">Applied Jobs</h2>
      {appliedJobs.length === 0 ? ( // if no applications
        <div className="text-center text-gray-500">No applications found</div>
      ) : (
        appliedJobs.map((job, index) => <Card key={index} job={job} />)
      )}
    </div>
  );
};

export default Appliedjobs;

const Card = ({ job }) => {
  return (
    <div className="px-6 py-4 bg-gray-100 rounded-lg mb-4 relative">
      <h3 className="text-lg text-slate-700 font-medium mb-2">
        {job?.job?.title}
      </h3>
      <p className="text-sm text-gray-500">{job?.job?.location}</p>
      <p className="text-sm text-gray-500">
        {job?.createdAt &&
          `Applied ${formatDistanceToNow(parseISO(job?.createdAt), {
            addSuffix: true,
          })}`}
      </p>

      <p className="text-sm text-gray-500 mt-4">{job?.job?.description}</p>
      <span
        className={`absolute top-4 right-4 text-xs text-white px-2 py-1 rounded-xl ${
          job?.status === "PENDING" ? "bg-orange-400" : "bg-green-400"
        }`}
      >
        {job?.status}
      </span>
    </div>
  );
};
