import db from "@/lib/db";

const CandidateProfilePage = async ({ params }) => {
  console.log(params.id);
  const user = await db.user.findUnique({
    where: { id: params.id },
    include: { profile: true, applications: true },
  });
  console.log(user);

  return (
    <div className="relative max-w-screen-lg mx-auto min-h-screen px-8 py-10 text-slate-700 flex flex-col items-center">
      <h1 className="text-2xl font-semibold absolute left-5 top-4">
        User's Profile
      </h1>
      <div className="mt-6 flex items-center gap-4">
        <div>
          <img
            src={
              user?.profile?.image ||
              `https://ui-avatars.com/api/?name=${user.email}`
            }
            alt="user profile"
            className="rounded-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            {user.profile.firstName} {user.profile.lastName}
          </h2>
          <p className="text-lg">{user.email}</p>
        </div>
      </div>
      <div className="mt-10">
        <p className="italic text-slate-400">
          {user.profile.bio || "No bio yet"}
        </p>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Applications</h2>
        <div className="mt-4">
          {user.applications === null ? (
            <>
              {" "}
              {user.applications.map((application) => (
                <div key={application.id} className="mt-4">
                  <h3 className="text-lg font-semibold">
                    {application.job.title}
                  </h3>
                  <p className="mt-2">{application.job.description}</p>
                </div>
              ))}
            </>
          ) : (
            <p className="text-slate-400 italic">No applications yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
