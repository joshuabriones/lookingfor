// pages/users.js
import { Suspense } from "react";

export async function getServerSideProps() {
  const response = await fetch("/api/users");
  const users = await response.json();

  console.log(users);

  return {
    props: {
      users,
    },
  };
}

async function Users({ users }) {
  console.log(users);
  return (
    <div>
      <h2>Users</h2>
      {/* {users.map((user) => (
        <div key={user.id}>
          <h3>{user.email}</h3>
          <p>{user.password}</p>
        </div>
      ))} */}
    </div>
  );
}

export default async function UserPage({ users }) {
  return (
    <div>
      <Suspense fallback={<div>Loading users...</div>}>
        <Users users={users} />
      </Suspense>
    </div>
  );
}
