import Sidebar from "../components/Sidebar";
import ProfilePanel from "../components/ProfilePanel";
import CourseCard from "../components/CourseCard";
import ProgressSection from "../components/ProgressSection";
import Actions from "../components/Actions";
import Attendance from "../components/Attendance";
import Timetable from "../components/Timetable";
import NavDashtop from "../components/NavDashtop";

const Dashboard = () => {
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
            Welcome back, <span className="text-primary">Amit 👋</span>
          </h1>

          {/* COURSES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <CourseCard title="DBMS" progress={75} color="bg-purple-500" />
            <CourseCard title="CN" progress={60} color="bg-green-500" />
            <CourseCard title="C Language" progress={80} color="bg-blue-500" />
            <CourseCard title="DSA" progress={45} color="bg-orange-500" />
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