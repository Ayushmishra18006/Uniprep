import { BrowserRouter, Routes, Route } from "react-router-dom";

// Existing Pages
import Homepage from "./pages/Homepage";
import Subjects from "./pages/Subjects";
import SubjectDetail from "./pages/SubjectDetail";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// NEW Dashboard
import Dashboard from "./pages/Dashboard";
//attendance on dashboard
import AttendancePage from "./pages/AttendancePage";
import CommunityPage from "./pages/CommunityPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🌐 Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subject/:subject" element={<SubjectDetail />} />

        {/* 📊 Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<AttendancePage />} />
         <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;