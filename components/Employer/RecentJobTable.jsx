import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

const RecentJobTable = ({ employerId }) => {
  const [jobs, setJobs] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `/api/getAllJobsByEmployer?employerId=${employerId}`
        );
        const data = await res.json();
        const processedJobs = data.jobs.map((job) => {
          const currentDate = new Date();
          const deadlineDate = new Date(job.deadline);
          const status = deadlineDate > currentDate ? "Active" : "Expired";

          return { ...job, status };
        });

        setJobs(processedJobs);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [employerId]);

  return (
    <div className="overflow-x-auto text-left rounded-t-lg">
      {isLoading ? (
        <Loading />
      ) : (
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right bg-gray-100 ">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-400">
                JOBS
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-400">
                STATUS
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-400">
                APPLICANTS
              </th>

              {/* <th className="px-4 py-2"></th> */}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {jobs.map((job, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {job.title}
                  <span className="block font-normal text-xs mt-2 text-gray-400">
                    Deadline: {formatDateWithoutTime(job.deadline)}
                  </span>
                </td>
                <td
                  className={`whitespace-nowrap px-4 py-2 ${
                    job.status === "Active" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {job.status === "Active" ? "✅" : "❌"} {job.status}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="rgba(17, 24, 39, 0.4)"
                    className="inline-block mr-2"
                  >
                    <path d="M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Zm6,13A6,6,0,0,0,6,23a1,1,0,0,0,2,0,4,4,0,0,1,8,0,1,1,0,0,0,2,0ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,18,2Zm6,13a6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8ZM6,2A2,2,0,1,0,8,4,2,2,0,0,0,6,2ZM2,15a4,4,0,0,1,4-4A1,1,0,0,0,6,9a6.006,6.006,0,0,0-6,6,1,1,0,0,0,2,0Z" />
                  </svg>
                  {job?.applications?.length} Applicants
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentJobTable;

function formatDateWithoutTime(dateString) {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}
