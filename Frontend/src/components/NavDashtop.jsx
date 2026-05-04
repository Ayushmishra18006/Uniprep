import { useNavigate } from "react-router-dom";

function NavDashtop() {
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

        {/* Right Side Options */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          
          <span
            onClick={() => navigate("/")}
            className="hover:text-indigo-600 cursor-pointer"
          >
            Home
          </span>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default NavDashtop;