import { BrowserRouter, Routes, Route } from "react-router-dom";

// Existing Pages
import Homepage from "./pages/Homepage";
import Subjects from "./pages/Subjects";
import SubjectDetail from "./pages/SubjectDetail";

// New Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Existing Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subject/:subject" element={<SubjectDetail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;