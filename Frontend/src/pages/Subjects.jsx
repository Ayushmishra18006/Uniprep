import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Subjects() {

  const location = useLocation();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);

  const params = new URLSearchParams(location.search);

  const course = params.get("course");
  const year = params.get("year");
  const branch = params.get("branch");

  useEffect(() => {
    fetchSubjects();
  }, [course, year, branch]);

  const fetchSubjects = async () => {
    try {

      const res = await axios.get(
        `http://localhost:3000/api/course-subjects?course=${course}&year=${year}&branch=${branch}`
      );

      console.log(res.data);

      setSubjects(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        {course?.toUpperCase()} - Year {year} ({branch})
      </h1>

      {subjects.length === 0 ? (
        <p>No subjects found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {subjects.map((sub) => (

            <div
              key={sub._id}
              onClick={() =>
                navigate(`/subject/${sub.subject_slug}`)
              }
              className="bg-indigo-100 p-6 rounded-xl cursor-pointer hover:scale-105 transition"
            >

              <h2 className="font-semibold text-indigo-700 text-center">
                {sub.subject_slug}
              </h2>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Subjects;