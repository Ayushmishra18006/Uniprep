import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item) => {
    switch (item) {
      case "Courses":
        navigate("/");
        break;
      case "Attendance":
        navigate("/attendance");
        break;
      case "Progress":
        navigate("/progress");
        break;
      case "Community":
        navigate("/community");
        break;
      case "AI Mentor":
        alert("🚧 AI Mentor is under development. Stay tuned!");
        break;
      case "Timetable":
        alert("📅 Timetable feature coming soon!");
        break;
      default:
        break;
    }
  };

  const items = [
    "Courses",
    "Progress",
    "AI Mentor",
    "Community",
    "Attendance",
    "Timetable",
  ];

  return (
    <div className="w-64 bg-white shadow-lg p-5 hidden md:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      
      

      <ul className="space-y-2">
        {items.map((item) => {
          const isActive =
            (item === "Courses" && location.pathname === "/") ||
            (item === "Attendance" && location.pathname === "/attendance") ||
            (item === "Progress" && location.pathname === "/progress") ||
            (item === "Community" && location.pathname === "/community");

          return (
            <li
              key={item}
              onClick={() => handleClick(item)}
              className={`p-2 rounded cursor-pointer transition 
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-600 font-medium"
                    : "hover:bg-gray-100"
                }`}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;