import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Herophoto from "../assets/Herophoto.png";

function HomeHero() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const searchData = [
    { name: "c programming", route: "/subject/c-programming" },
    { name: "dbms", route: "/subject/dbms" },
    { name: "bca 1st year", route: "/subjects?course=bca&year=1&branch=General" },
    { name: "bca 2nd year", route: "/subjects?course=bca&year=2&branch=General" },
    { name: "btech 2nd year cse", route: "/subjects?course=btech&year=2&branch=CSE" }
  ];

  const handleSearch = (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const filtered = searchData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
  };

  const handleSelect = (route) => {
    navigate(route);
    setQuery("");
    setResults([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0].route);
    }
  };

  return (
    <section className="bg-[#f8fafc] pt-28 pb-16 px-6">
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Advance your learning journey 🚀
          </h1>

          <p className="text-gray-500 mt-3">
            Search subjects, courses, and more
          </p>

          {/* Search */}
          <div className="relative mt-6 w-full max-w-md">

            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search (e.g. DBMS, BCA 1st year...)"
              className="w-full px-5 py-3 rounded-full border shadow focus:outline-none"
            />

            {results.length > 0 && (
              <div className="absolute bg-white w-full mt-2 rounded-lg shadow-lg z-50">
                {results.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelect(item.route)}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE (IMAGE BACK) */}
        <div className="relative flex justify-center">

          <div className="absolute w-80 h-80 bg-gradient-to-r from-indigo-300 to-blue-300 rounded-3xl -z-10"></div>

          <img
            src={Herophoto}
            alt="student"
            className="w-96 rounded-2xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}

export default HomeHero;