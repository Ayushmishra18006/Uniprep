/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth"; // ✅ import API

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // UseEffect to save the theme even if the page is reloaded
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDark));
  }, [isDark]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await loginUser(form); // ✅ backend call
      navigate("/dashboard"); // ✅ redirect after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed"); // ✅ error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        isDark
          ? "bg-gray-900"
          : "bg-gradient-to-br from-indigo-100 to-purple-100"
      }`}
    >
      {/* Card */}
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl p-8 transition-colors duration-300 ${
          isDark ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        {/* Toggle to dark mode feature */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            className="text-2xl"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Logo / Title */}
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
          UniPrep
        </h1>

        <p
          className={`text-center mt-2 ${
            isDark ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Welcome back! Please login to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label
              className={`text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-black"
              }`}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              className={`text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-black"
                }`}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? "🙈" : "👀"}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right text-sm">
            <span className="text-indigo-600 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {/* 🔴 Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 text-center text-gray-400 text-sm">or</div>

        {/* Social Login (UI only) */}
        <button
          className={`w-full py-2 border rounded-lg transition ${
            isDark
              ? "border-gray-600 hover:bg-gray-700 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Continue with Google
        </button>

        {/* Register link */}
        <p
          className={`text-center text-sm mt-4 ${
            isDark ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
