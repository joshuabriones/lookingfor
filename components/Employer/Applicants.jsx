import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Applicants = () => {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 10;

  const fetchApplications = async () => {
    if (!session?.user?.id) {
      console.error("Employer ID is required");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/applications/employer/${session.user.id}`
      );
      const data = await response.json();
      console.log("API Response:", data);
      setApplications(data.applications || []);
    } catch (error) {
      console.error(error);
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchApplications();
    }
  }, [session]);

  const openResume = async (applicationId, resumeUrl) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "REVIEWED" }),
      });

      if (!response.ok) {
        throw new Error("Failed to update application status");
      }

      window.open(resumeUrl, "_blank");

      fetchApplications();
      //   setApplications((prevApplications) =>
      //     prevApplications.map((app) =>
      //       app.id === applicationId ? { ...app, status: "REVIEWED" } : app
      //     )
      //   );
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const handleAcceptApplication = async (applicationId) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "ACCEPTED" }),
      });

      if (!response.ok) {
        throw new Error("Failed to update application status");
      }

      fetchApplications();
      toast.success("Application accepted successfully");
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const handleRejectApplication = async (applicationId) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "REJECTED" }),
      });

      if (!response.ok) {
        throw new Error("Failed to update application status");
      }

      fetchApplications();
      toast.success("Application rejected...");
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applications.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REVIEWED":
        return "bg-blue-100 text-blue-800";
      case "ACCEPTED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex-1 rounded-lg shadow-lg p-4 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Full Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Applied Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Job Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Approve/Decline
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentApplications.length > 0 ? (
                currentApplications.map((application, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              application.user.profile?.image ||
                              `https://ui-avatars.com/api/?name=${application.user.email}`
                            }
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {application.user.profile?.firstName}{" "}
                            {application.user.profile?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateWithoutTime(application.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.job.title}
                    </td>
                    {application.status === "PENDING" ||
                      (application.status === "REVIEWED" && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() =>
                              openResume(application.id, application.resumeUrl)
                            }
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            See Resume
                          </button>
                        </td>
                      ))}
                    {application.status === "REVIEWED" && (
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() =>
                            handleAcceptApplication(application.id)
                          }
                          className="text-green-600 hover:text-green-900"
                        >
                          ✅
                        </button>
                        <button
                          onClick={() =>
                            handleRejectApplication(application.id)
                          }
                          className="text-red-600 hover:text-red-900 ml-2"
                        >
                          ❌
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastApplication >= applications.length}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Applicants;

function formatDateWithoutTime(dateString) {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}
