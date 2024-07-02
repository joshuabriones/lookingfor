"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (response.ok) {
      toast.success("Logged in successfully");
      router.push("/dashboard");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <Link
          href="/"
          className="absolute top-6 left-6 text-2xl font-bold gradient-text"
        >
          L∞kingfor
        </Link>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
              Welcome!
            </h1>
            <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
              Please log in to access your account and continue your journey
              with us 🤩
            </p>

            <form
              onSubmit={handleSubmit}
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            >
              <p className="text-center text-lg font-medium">
                Sign in to your account
              </p>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>

                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter email"
                    name="email"
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>

                <div className="relative">
                  <input
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter password"
                    name="password"
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 duration-200"
              >
                Sign in
              </button>

              <p className="text-center text-sm text-gray-500">
                No account?
                <Link
                  href="/signup"
                  className="underline hover:text-indigo-600 duration-200 ml-1"
                >
                  Sign up
                </Link>
              </p>
              <span className="relative flex justify-center">
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

                <span className="relative z-10 bg-white px-6 text-gray-500">
                  or
                </span>
              </span>

              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                type="button"
                className="flex items-center justify-center gap-4 w-full border rounded-lg px-5 py-3 text-sm font-medium text-gray-500 hover:border-black duration-200"
              >
                <Image
                  src={"/assets/icons/google_icon.svg"}
                  alt="Google"
                  width={24}
                  height={24}
                />
                Sign in with Google
              </button>
              <button
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                type="button"
                className="flex items-center justify-center gap-4 w-full border rounded-lg px-5 py-3 text-sm font-medium text-gray-500 hover:border-black duration-200"
              >
                <Image
                  src={"/assets/icons/github_icon.svg"}
                  alt="Google"
                  width={24}
                  height={24}
                />
                Sign in with Github
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
