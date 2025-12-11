import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contex/Authcontext";
import axios from "axios"; // Import axios

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  // Make the function async to handle the API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Backend call to authenticate user
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        {
          username: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract tokens and user data from response
      const { tokens, user } = response.data;

      // Call handleLogin with tokens and user info
      handleLogin({
        token: tokens.access,
        user: {
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          refreshToken: tokens.refresh,
        },
      });

      // Navigate to dashboard on successful login
      navigate("/dashboard");
    } catch (err) {
      // Handle login errors
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password");
      } else if (err.response) {
        setError(err.response.data.error || "Login failed. Please try again.");
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-light flex flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Admin Login
          </h2>
          {/* Display error message if it exists */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Input fields are the same */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 font-medium mb-1">
                Username
              </label>
              <input
                type="text" // Changed type to text since it's a username
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white font-semibold rounded-lg py-2 mt-2 hover:bg-blue-800 transition"
            >
              Login
            </button>
            <div className="text-sm text-gray-500 mt-2 flex justify-end">
              <a href="#" className="hover:text-primary transition">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;