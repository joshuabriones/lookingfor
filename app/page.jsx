import Image from "next/image";

export default function Home() {
  const trendingSearches = ["Freelance", "Remote", "Full-time", "Internship"];

  const howItWorks = [
    {
      title: "Join a Thriving Work Community",
      description:
        "Connect with like-minded professionals, share experiences, and gain valuable insights to navigate your career path.",
      image: "/assets/images/hero1.png",
    },
    {
      title: "Discover and Apply to Dream Jobs",
      description:
        "Explore a wide range of job listings, tailored to your skills and aspirations, and take the next step towards your dream career.",
      image: "/assets/images/hero2.png",
    },
    {
      title: "Make Informed Salary Comparisons",
      description:
        "Compare salaries across roles and industries to ensure you’re getting the best value for your skills and experience.",
      image: "/assets/images/hero3.png",
    },
  ];
  return (
    <div className="relative max-w-screen-2xl min-h-screen mx-auto">
      <section
        id="hero_section"
        className="relative w-full h-[520px] shadow-inner flex flex-col items-center justify-center text-center bg-slate-100 px-10 py-20"
      >
        <h1 className="text-4xl sm:text-5xl font-semibold mb-4 text-slate-700">
          Land your <span className="gradient-text">Job</span>, today.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mb-8">
          Find the perfect opportunity quickly and easily 🤩
        </p>
        <SearchInput />
        <div className="flex gap-2 mt-3 text-slate-700">
          <span className="text-sm sm:text-base">Trending Searches:</span>
          <span className="flex md:gap-4 gap-2 flex-wrap">
            {trendingSearches.map((search) => (
              <span
                key={search}
                className="text-white text-xs bg-indigo-600 px-3 py-1 rounded-lg"
              >
                🔍 {search}
              </span>
            ))}
          </span>
        </div>
      </section>
      <section className="max-w-screen-md mx-auto py-14">
        <div className="flex flex-col gap-20 sm:gap-10 items-center">
          {howItWorks.map((work, index) => (
            <div
              key={index}
              className={`flex md:gap-8 sm:px-1 px-4 gap-0 items-center justify-center md:text-left text-center md:flex-row flex-col ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <Image
                src={work.image}
                width={500}
                height={500}
                alt={work.title}
                className="flex-1"
              />
              <div className="py-2 sm:py-10 flex-1">
                <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-600 mb-1 sm:mb-4">
                  {work.title}
                </h2>
                <p className="text-sm md:text-base text-slate-600">
                  {work.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-indigo-600 py-6 sm:py-10 text-white text-center">
        © 2024 Lookingfor All Rights Reserved
      </footer>
    </div>
  );
}

function SearchInput() {
  return (
    <div className="relative rounded-2xl md:w-1/2 w-full">
      <label htmlFor="Search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="Search"
        placeholder="Search for..."
        className="w-full rounded-lg border-2 border-purple-200 px-4 sm:py-3 py-2 pe-10 shadow-sm sm:text-sm"
      />
      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button type="button" className="text-gray-600 hover:text-gray-700">
          <span className="sr-only">Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </div>
  );
}
