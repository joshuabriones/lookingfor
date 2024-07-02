import { useState, useEffect } from "react";
import Link from "next/link";

import Loading from "@/components/Loading";

const Candidates = () => {
  const [candidates, setCandidates] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/getAllApplicants");
        const data = await response.json();
        setCandidates(data.users);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  console.log(candidates);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex-1 rounded-lg shadow-lg p-4 bg-white grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          <>
            {candidates.map((user, index) => (
              <Card key={index} user={user} />
            ))}
          </>
        </div>
      )}
    </>
  );
};

export default Candidates;

function Card({ user }) {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 ease-in-out"
    >
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-purple-400 to-blue-500"></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            {user?.profile?.firstName} {user?.profile?.lastName}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-600">{user.email}</p>
        </div>

        <div className="hidden sm:block sm:shrink-0">
          <img
            alt=""
            src={
              user?.profile?.image ||
              `https://ui-avatars.com/api/?name=${user.email}`
            }
            className="size-16 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>

      <dl className="mt-6 flex gap-4 sm:gap-6">
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">Joined</dt>
          <dd className="text-xs text-gray-500">
            {formatDateWithoutTime(user.createdAt)}
          </dd>
        </div>

        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">Jobs</dt>
          <dd className="text-xs text-gray-500">
            {user?.applications?.length} applied
          </dd>
        </div>
      </dl>
    </Link>
  );
}

function formatDateWithoutTime(dateString) {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}
