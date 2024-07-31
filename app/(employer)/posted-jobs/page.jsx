"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { imageDB } from "@/lib/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import Loading from "@/components/Loading";

const PostedJobs = () => {
  const { data: session, status } = useSession();
  const [postedJobs, setPostedJobs] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const fetchPostedJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/getAllJobsByEmployer?employerId=${session?.user?.id}`
      );
      const data = await res.json();

      setPostedJobs(data.jobs);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostedJobs();
  }, [session]);

  return (
    <div className="max-w-screen-md mx-auto min-h-screen px-8 py-10 text-slate-700">
      <h1 className="text-3xl font-bold mb-8">Posted Jobs</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          {postedJobs.length === 0 ? (
            <p className="text-center">No posted jobs</p>
          ) : (
            <div className="flex flex-col gap-10">
              {postedJobs.map((job, index) => (
                <CardBlogAction
                  job={job}
                  key={index}
                  fetchPostedJobs={fetchPostedJobs}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostedJobs;

function CardBlogAction({ job, fetchPostedJobs }) {
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);
  const [deadline, setDeadline] = useState(formatDateForInput(job.deadline));
  const [salary, setSalary] = useState(job.salary);
  const [location, setLocation] = useState(job.location);
  const [requirements, setRequirements] = useState(job.requirements);
  const [image, setImage] = useState(job.image);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const handleSelectedImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgsRef = ref(imageDB, `jobposts/${v4()}`);
      const snapshot = await uploadBytesResumable(imgsRef, file);
      const imgUrl = await getDownloadURL(snapshot.ref);
      setImage(imgUrl);
      setSelectedImage(file);
    }
  };

  console.log("UPDATED IMAGE: ", image);

  function formatDateForInput(dateString) {
    if (!dateString) return ""; // Return an empty string if dateString is not provided
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Return an empty string if date is invalid
    return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
  }

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          deadline,
          salary,
          location,
          requirements,
          image,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        fetchPostedJobs();
        toast.success("Job updated successfully");
      } else {
        toast.error("Failed to update job");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        fetchPostedJobs();
        toast.success("Job deleted successfully");
      } else {
        toast.error("Failed to delete job");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
        <Link href={`job/${job.id}`}>
          {job.image && (
            <figure>
              <img
                src={job.image}
                alt="card image"
                className="aspect-video w-full"
              />
            </figure>
          )}
          {/*  <!-- Body--> */}
          <div className="p-6">
            <header className="mb-4 flex gap-4">
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-white">
                <img
                  src={job?.employer?.profile?.image}
                  alt="user name"
                  title="user name"
                  width="48"
                  height="48"
                  className="max-w-full rounded-full"
                />
              </span>
              <div>
                <h3 className="text-xl font-medium text-slate-700">
                  {job.title}
                </h3>
                <p className="text-sm text-slate-400">
                  {" "}
                  {formatDateWithoutTime(job.deadline)}
                </p>
              </div>
            </header>
            <p>{job.description}</p>
            <p className="mt-5 text-sm">Location: {job.location}</p>
            <p className="text-sm">Requirements: {job.requirements}</p>
            <p className=" text-sm text-green-600">Salary: ${job.salary}</p>
            <p className=" text-sm text-blue-600">
              Applicants: {job?.applications?.length}
            </p>
          </div>
        </Link>
        <div className="flex justify-end gap-2 p-2 pt-0">
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
          >
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide text-red-500 transition duration-300 hover:bg-red-100 hover:text-red-600 focus:bg-red-200 focus:text-red-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-red-300 disabled:shadow-none disabled:hover:bg-transparent"
          >
            <span>Delete</span>
          </button>
        </div>

        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg md:h-3/4 h-1/2 overflow-scroll w-3/4 md:w-1/2">
              <label>Title</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
              <label className="block mt-4">Description</label>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
              <label className="block mt-4">Deadline</label>
              <input
                type="date"
                placeholder="Deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
              <label className="block mt-4">Salary</label>
              <input
                type="number"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
              <label className="block mt-4">Location</label>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
              <label className="block mt-4">Requirements</label>
              <input
                type="text"
                placeholder="Requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
              <label className="block mt-4">Image</label>
              <input
                type="file"
                onChange={handleSelectedImage}
                accept="image/*"
                id="bannerImage"
                className="mt-1 w-full py-2 px-4 text-gray-400 rounded-md border border-gray-200 shadow-sm peer order-2 [&::file-selector-button]:hidden sm:text-sm"
              />
              {/* <input
                type="text"
                placeholder="Image"
                value={image}
                onChange={(e) =>
                  setImage(
                    e.target.value ||
                      "https://via.placeholder.com/150?text=No+Image"
                  )
                }
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              /> */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleUpdate}
                  className="w-1/2 mr-2 p-2 bg-blue-500 text-white rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-1/2 ml-2 p-2 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
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
