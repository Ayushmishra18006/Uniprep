import { useLocation, useNavigate } from "react-router-dom";

function Subjects() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  const course = params.get("course");
  const year = params.get("year");
  const branch = params.get("branch");

  // Dummy Data (later from backend)
  const subjectsData = {
    btech: {
      2: {
        CSE: ["DBMS", "OS", "CN", "DSA"]
      }
    },
    bca: {
      1: {
        General: ["C Programming", "Math", "DBMS"]
      }
    }
  };

  const subjects =
    subjectsData?.[course]?.[year]?.[branch] || [];

  return (
    <div className="p-6">

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">
        {course?.toUpperCase()} - Year {year} ({branch})
      </h1>

      {/* Subjects Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {subjects.map((sub, index) => (
          <div
            key={index}
            onClick={() => navigate(`/subject/${sub.toLowerCase()}`)}
            className="bg-indigo-100 p-6 rounded-xl cursor-pointer hover:scale-105 transition"
          >
            <h2 className="font-semibold text-indigo-700 text-center">
              {sub}
            </h2>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Subjects;