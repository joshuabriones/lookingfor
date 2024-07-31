"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { formatDistanceToNow, parseISO, set } from "date-fns";
import Image from "next/image";
import Loading from "@/components/Loading";
import Modal from "@/components/JobSeeker/Modal";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { imageDB } from "@/lib/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const JobPost = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");
  const { data: session } = useSession();

  const fetchJob = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/jobs/${id}`);
      const data = await res.json();
      setJob(data.job);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyNow = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSelectedResume = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const pdfRef = ref(imageDB, `resume/${v4()}`);
      const snapshot = await uploadBytesResumable(pdfRef, file);
      const pdfUrl = await getDownloadURL(snapshot.ref);

      console.log("NA UPLOAD ANG PDF:   ", pdfUrl);
      setResume(pdfUrl);
      // setSelectedImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = fetch(`/api/applications/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coverLetter,
        resumeUrl: resume,
        jobId: job.id,
        userId: session.user.id,
      }),
    });

    setCoverLetter("");
    setResume("");
    setIsModalOpen(false);
    toast.success("Successfully applied");
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  return (
    <div className="max-w-screen-md mx-auto mt-8 px-4">
      {loading ? (
        <Loading />
      ) : (
        <div
          key={job?.id}
          className="group flex justify-between bg-white p-4 border-b  hover:border-purple-400 transition-all duration-200 flex-col-reverse sm:flex-row gap-2 mx-auto"
        >
          <div className="flex flex-col justify-between ">
            <div>
              <p className="text-[12px] text-gray-500">
                {job?.createdAt
                  ? `Posted ${formatDistanceToNow(parseISO(job.createdAt), {
                      addSuffix: true,
                    })}`
                  : "Posted just now"}
              </p>

              <h2 className="font-medium text-xl group-hover:gradient-text ">
                {job?.title}
              </h2>
              <p className="text-sm mt-4 text-gray-500">{job?.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Requirements: {job?.requirements}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">💰 ₱{job?.salary}</p>
              <p className="text-sm text-gray-500">
                📍
                {job?.location}
              </p>{" "}
              <button
                onClick={handleApplyNow}
                className={`self-start mt-3 ${
                  job?.image !== null ? "w-1/2" : "w-full"
                } py-2 bg-indigo-500 text-white text-sm rounded-2xl hover:bg-opacity-90 transition-all duration-200`}
              >
                Apply now
              </button>
            </div>
          </div>
          {job?.image ? (
            <Image
              src={job.image}
              alt={job.title}
              width={300}
              height={100}
              className="object-cover rounded"
            />
          ) : null}
        </div>
      )}

      <h3 className="text-xl font-medium mt-8">Meet the hiring Team</h3>
      <div className="mt-4 flex justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src={
              job?.employer?.profile?.image ||
              `https://ui-avatars.com/api/?name=${job?.employer?.profile?.firstName}`
            }
            width={50}
            height={50}
            alt={job?.employer?.profile?.firstName}
            className="rounded-full"
          />
          <div>
            <h4 className="font-medium text-sm">
              {job?.employer?.profile?.firstName +
                " " +
                job?.employer?.profile?.lastName}
            </h4>
            <p className="text-sm text-gray-500">{job?.employer?.email}</p>
            <p className="text-[12px] text-gray-500">{job?.employer?.role}</p>
          </div>
        </div>
        <button className="h-12 px-8 border border-gray-500 text-gray-500 rounded-lg hover:text-gray-600  hover:bg-gray-100 hover:bg-opacity-60 transition-all duration-300">
          Message
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <h2 className="text-xl font-bold mb-4">Apply for {job?.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Cover Letter
            </label>
            <textarea
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              rows="4"
              required
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Resume (PDF)
            </label>
            <input
              type="file"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              accept=".pdf"
              required
              onChange={handleSelectedResume}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-200"
            >
              Submit Application
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default JobPost;
