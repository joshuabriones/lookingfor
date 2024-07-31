"use client";

import { useState } from "react";

const Testpage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit() {
    const res = await fetch("/api/user/new", {
      method: "POST",
      body: JSON.stringify({ email, name }),
    });

    if (res.ok) {
      alert("User created successfully");
    } else {
      alert("Failed to create user");
    }
  }

  return (
    <div className="w-full h-screen bg-black text-white">
      <form>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Testpage;
