import Image from "next/image";

const JobCard = ({ job }) => {
  return (
    <div className="w-full border-b border-slate-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 relative rounded-full overflow-hidden">
            <Image
              src={
                job?.employer?.profile?.image ||
                `https://ui-avatars.com/api/?name=${job?.employer?.profile?.firstName}+${job?.employer?.profile?.lastName}`
              }
              alt="user name"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold">{job?.title}</h1>
            <p className="text-sm text-slate-500">{job?.location}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-500">Salary: ${job?.salary}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-slate-500">{job?.description}</p>
      </div>
    </div>
  );
};

export default JobCard;
