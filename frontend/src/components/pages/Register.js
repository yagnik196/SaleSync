import React, { useState } from "react";
import Navbar from "../reusables/Navbar";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registration data:", formData);
    // TODO: Add registration API call
  };

  return (
    <div className=" bg-light flex flex-col">

      {/* Centered form */}
      <div className="mt-12 flex flex-1 items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name inputs */}
            <div className="flex gap-4">
              <div className="flex flex-col flex-1">
                <label className="text-gray-700 font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
                  required
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-gray-700 font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
                  required
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="bg-primary text-white font-semibold rounded-lg py-2 mt-2 hover:bg-blue-800 transition"
            >
              Register
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
