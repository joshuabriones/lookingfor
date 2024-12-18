"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (!session && status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <div className="max-w-screen-md py-8 mx-auto px-4">
      <div className="p-10">
        <div className="relative w-full h-36 rounded-tr-xl rounded-tl-xl md:h-48 gradient-bg">
          <img
            src={session?.user?.image}
            alt={session?.user?.name}
            className="absolute w-28 h-28 rounded-full -bottom-10 left-1/2 -translate-x-1/2 border-2 border-gray-400"
          />
        </div>
        <div className="border border-slate-200 h-full rounded-br-xl rounded-bl-xl">
          <div className="p-4 mt-10">
            <h2 className="text-2xl text-center font-medium ">
              {" "}
              {session?.user?.name
                ? session?.user?.name.split(" ")[0]
                : session?.image?.split("=")[1].split("+").join(" ")}
            </h2>
            <p className="text-gray-500 text-sm text-center mb-4">
              {session?.user?.role}
            </p>
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
