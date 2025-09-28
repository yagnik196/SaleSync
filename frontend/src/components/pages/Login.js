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

    try {
      // Make the POST request to your Django backend
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        // IMPORTANT: Django expects 'username', but your form has 'email'.
        // For now, we'll send the email value as the username.
        username: email,
        password: password,
      });

      // Assuming a successful login, the response will have tokens
      const accessToken = response.data.access;

      // Use your existing context to handle the login state
      // We'll pass the token and a user object.
      // In a real app, you might make another API call to get user details.
      handleLogin({ token: accessToken, user: { email: email } });

      // Navigate to the dashboard on successful login
      navigate("/Dashboard");

    } catch (err) {
      // Handle login errors (e.g., wrong password)
      console.error("Login failed:", err);
      setError("Invalid username or password. Please try again.");
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