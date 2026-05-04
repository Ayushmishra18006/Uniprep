import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Attendance</h2>

      {/* Week Header */}
      <div className="grid grid-cols-6 text-center text-sm">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Sample Attendance */}
      <div className="grid grid-cols-6 mt-2 text-center">
        {[1, 1, 1, 0, 0, 0].map((v, i) => (
          <div key={i}>
            {v ? "✅" : "❌"}
          </div>
        ))}
      </div>

      {/* BUTTON → NAVIGATION */}
      <button
        onClick={() => navigate("/attendance")}
        className="mt-4 bg-indigo-400 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Mark Attendance
      </button>
    </div>
  );
};

export default Attendance;