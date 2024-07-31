"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession, signOut } from "next-auth/react";

const AdditionalInfoContent = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");

  console.log("session user: ", session?.user.role);

  const submitData = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/additional-info", {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          role: role,
          firstName: fname,
          lastName: lname,
          image: session?.user?.image || null,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          router.push(data.redirectUrl);
          toast.success("User account created successfully");
          if (session?.user) {
            signOut({ callbackUrl: "/login", redirect: true });
          }
        }
      } else {
        toast.error("Failed to create user profile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="absolute top-6 left-6 text-2xl font-bold gradient-text">
        L∞kingfor
      </span>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Just a few more things...
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Please fill out the form below to complete your account setup 🚀
          </p>

          <form
            onSubmit={submitData}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-left text-lg font-medium">Account type</p>

            <fieldset className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="employer"
                  className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                >
                  <div>
                    <p className="text-4xl">👩‍💻</p>
                    <p className="mt-1 text-gray-900">Employer</p>
                  </div>

                  <input
                    type="radio"
                    name="account_option"
                    value="EMPLOYER"
                    id="employer"
                    onChange={(e) => setRole(e.target.value)}
                    className="size-5 border-gray-300 text-blue-500"
                  />
                </label>
              </div>

              <div>
                <label
                  htmlFor="jobseeker"
                  className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                >
                  <div>
                    <p className="text-4xl">👨‍💼</p>
                    <p className="mt-1 text-gray-900">Job Seeker</p>
                  </div>

                  <input
                    type="radio"
                    name="account_option"
                    value="JOB_SEEKER"
                    id="jobseeker"
                    onChange={(e) => setRole(e.target.value)}
                    className="size-5 border-gray-300 text-blue-500"
                  />
                </label>
              </div>
            </fieldset>

            <div>
              <label htmlFor="first_name" className="sr-only">
                First name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="First name"
                  name="first_name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="last_name" className="sr-only">
                Last name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Last name"
                  name="last_name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 duration-200"
            >
              Continue
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?
              <Link
                href="/logout"
                className="underline hover:text-indigo-600 duration-200 ml-1"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoContent;
