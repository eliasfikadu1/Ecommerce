import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await axios.post(
        "https://ecommerce-eg1n.onrender.com/api/register",
        {
          name,
          email,
          password,
        }
      );

      console.log("REGISTER:", response.data);

      setMessage("Registration successful! 🎉");

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-orange-100 p-8 md:p-10">

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-3xl shadow-md">
            👤
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Join FoodExpress today 🍴
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
              required
            />

            <p className="text-xs text-gray-500 mt-2">
              Password must be at least 6 characters.
            </p>
          </div>

          {/* Message */}
          {message && (
            <div className="bg-orange-50 border border-orange-200 text-orange-600 p-3 rounded-xl text-center font-semibold">
              {message}
            </div>
          )}
          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition shadow-md text-lg"
          >
            Register 🚀
          </button>

        </form>

        {/* Login */}
        <p className="text-center mt-7 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-bold hover:text-orange-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;