"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { imageDB } from "@/lib/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const JobPost = () => {
  const { data: session, status } = useSession();
  const [jobInputs, setJobInputs] = useState({
    title: "",
    description: "",
    deadline: "",
    salary: "",
    location: "",
    requirements: "",
  });

  const router = useRouter();

  if (session && session.user.role === "JOB_SEEKER") {
    router.push("/dashboard");
  }

  if (!session && status === "unauthenticated") {
    router.push("/login");
  }

  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    setJobInputs({ ...jobInputs, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/jobs/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...jobInputs,
          image: image,
          employerId: session?.user?.id,
        }),
      });
      const data = await res.json();

      if (data.status === 200) {
        alert("Job posted successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto py-4 px-8">
      <h1 className="text-2xl font-semibold text-slate-700">Post a Job</h1>
      <div>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Job Title{" "}
            </label>
            <input
              type="text"
              id="jobTitle"
              name="title"
              value={jobInputs.title}
              onChange={handleChange}
              placeholder="Add job title, role, etc."
              className="mt-1 w-full py-2 px-4 rounded-md border border-gray-200 shadow-sm sm:text-sm"
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Job Description{" "}
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={jobInputs.description}
              onChange={handleChange}
              placeholder="Enter job description"
              className="mt-1 w-full py-2 px-4 rounded-md border border-gray-200 shadow-sm sm:text-sm"
            />
          </div>
          <div className="mt-3 flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="Deadline"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Deadline{" "}
              </label>
              <input
                type="date"
                id="Deadline"
                name="deadline"
                value={jobInputs.deadline}
                onChange={handleChange}
                className="mt-1 w-full py-2 px-4 text-gray-400 rounded-md border border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="Salary"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Salary{" "}
              </label>
              <input
                type="number"
                id="Salary"
                name="salary"
                value={jobInputs.salary}
                onChange={handleChange}
                placeholder="e.g 12000.00"
                className="mt-1 w-full py-2 px-4 rounded-md border border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="bannerImage"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Banner(Optional)
              </label>
              <input
                type="file"
                onChange={handleSelectedImage}
                accept="image/*"
                id="bannerImage"
                className="mt-1 w-full py-2 px-4 text-gray-400 rounded-md border border-gray-200 shadow-sm peer order-2 [&::file-selector-button]:hidden sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-3">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Job location{" "}
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={jobInputs.location}
              onChange={handleChange}
              placeholder="Enter job location"
              className="mt-1 w-full py-2 px-4 rounded-md border border-gray-200 shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="requirements"
              className="block mt-3 text-sm font-medium text-gray-700"
            >
              {" "}
              Requirements{" "}
            </label>

            <textarea
              id="requirements"
              name="requirements"
              value={jobInputs.requirements}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-200 align-top shadow-sm sm:text-sm"
              rows="4"
              placeholder="Enter job requirements"
            ></textarea>
          </div>
          <input
            type="submit"
            value="Post Job →"
            className="mt-4 text-sm bg-indigo-700 hover:bg-indigo-600 text-white py-2 px-4 rounded-md cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default JobPost;
