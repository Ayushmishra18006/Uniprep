import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text cursor-pointer"
        >
          UniPrep
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li onClick={() => navigate("/")} className="hover:text-indigo-600 cursor-pointer">Home</li>
          <li className="hover:text-indigo-600 cursor-pointer">Community</li>
          <li className="hover:text-indigo-600 cursor-pointer">Mentor</li>
          <li className="hover:text-indigo-600 cursor-pointer">About</li>
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-white shadow">
          <p onClick={() => navigate("/")} className="cursor-pointer">Home</p>
          <p className="cursor-pointer">Courses</p>
          <p className="cursor-pointer">Mentor</p>
          <p className="cursor-pointer">Docs</p>

          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full py-2 bg-gray-200 rounded-lg"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;