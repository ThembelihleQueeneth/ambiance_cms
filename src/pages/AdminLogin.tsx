import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "ambiance@gmail.com" && password === "12345") {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex justify-center mt-12">
        <div className="bg-white p-8 rounded-xl shadow-md w-96">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
            Admin Login
          </h2>

          {/* Email */}
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
          />

          {/* Password */}
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
