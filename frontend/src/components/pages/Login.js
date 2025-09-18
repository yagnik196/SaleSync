import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../reusables/Navbar";
import { useAuth } from "../../Contex/Authcontext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {handleLogin} = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with API call
    const fakeToken = "12345";
    const fakeUser = { name: "Yagnik", email };

    handleLogin({ token: fakeToken, user: fakeUser });
    navigate("/Dashboard");
  };


  return (
    <div className="min-h-screen bg-light flex flex-col">
      

      {/* Centered form */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Admin Login
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email input */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              />
            </div>

            {/* Password input */}
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

            {/* Submit button */}
            <button
              type="submit"
              className="bg-primary text-white font-semibold rounded-lg py-2 mt-2 hover:bg-blue-800 transition"
            >
              Login
            </button>

            {/* Optional links */}
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
