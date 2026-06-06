/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { GoogleLogin } from "@react-oauth/google";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Hook to change the theme of page
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Use effect to stay on same theme even when page is reloaded
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
      await registerUser(form); // ✅ backend call
      navigate("/dashboard"); // ✅ redirect
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed"); // ✅ error UI
    } finally {
      setLoading(false);
    }
  };
  // console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);

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
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            className="text-2xl"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
        {/* Title */}
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
          UniPrep
        </h1>

        <p
          className={`text-center mt-2 ${
            isDark ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Create your account to start learning
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Username */}
          <div>
            <label
              className={`text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-black"
              }`}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
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

          <div>
            <label
              className={`text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
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

          {/* Age */}
          <div>
            <label className="text-sm text-gray-600">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Enter your age"
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-black"
              }`}
              required
            />
          </div>

          {/* 🔴 Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 text-center text-gray-400 text-sm">or</div>

        {/* Social (UI only) */}
        {/* <button
          className={`w-full py-2 border rounded-lg transition ${
            isDark
              ? "border-gray-600 hover:bg-gray-700 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Continue with Google
        </button> */}

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("Google Success:", credentialResponse);
          }}
          onError={() => {
            console.log("Google Login Failed");
          }}
        />

        {/* Login link */}
        <p
          className={`text-center text-sm mt-4 ${
            isDark ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
