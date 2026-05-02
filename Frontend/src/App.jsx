import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import Subjects from "./pages/Subjects";
import SubjectDetail from "./pages/SubjectDetail"; // (we'll create next)

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Homepage />} />

        {/* Subjects Page */}
        <Route path="/subjects" element={<Subjects />} />

        {/* Subject Detail Page */}
        <Route path="/subject/:subject" element={<SubjectDetail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;