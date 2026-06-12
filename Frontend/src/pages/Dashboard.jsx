import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import ProfilePanel from "../components/ProfilePanel";
import CourseCard from "../components/CourseCard";
import ProgressSection from "../components/ProgressSection";
import Actions from "../components/Actions";
import Attendance from "../components/Attendance";
import Timetable from "../components/Timetable";
import NavDashtop from "../components/NavDashtop";

import api from "../api/axios";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const colors = [
    "bg-purple-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-yellow-500",
  ];

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get("/dashboard");

        const coursesWithColors = data.map((course, index) => ({
          ...course,
          color: colors[index % colors.length],
        }));

        setCourses(coursesWithColors);
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* TOP NAVBAR */}
      <NavDashtop />

      {/* MAIN LAYOUT */}
      <div className="flex">
        {/* LEFT SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 space-y-6">
          <h1 className="text-2xl font-semibold">
            Welcome back,
            <span className="text-primary">
              Welcome back Amit 👋
            </span>
          </h1>

          {/* COURSES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading ? (
              <p>Loading courses...</p>
            ) : courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard
                  key={course.title}
                  title={course.title}
                  progress={course.progress}
                  color={course.color}
                />
              ))
            ) : (
              <p>No subjects found.</p>
            )}
          </div>

          {/* PROGRESS */}
          <ProgressSection />

          {/* ACTION BUTTONS */}
          <Actions />

          {/* ATTENDANCE + TIMETABLE */}
          <div className="grid md:grid-cols-2 gap-5">
            <Attendance />
            <Timetable />
          </div>
        </div>

        {/* RIGHT PROFILE PANEL */}
        <ProfilePanel />
      </div>
    </div>
  );
};

export default Dashboard;
