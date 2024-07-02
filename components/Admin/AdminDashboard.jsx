"use client";

import { signOut } from "next-auth/react";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin dashboard</h1>
      <button
        onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
      >
        Sign Out
      </button>
    </div>
  );
};

export default AdminDashboard;
