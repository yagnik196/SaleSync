import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../reusables/Navbar";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    seller_id: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be exactly 10 digits";
    }
    if (!formData.seller_id.trim()) {
      newErrors.seller_id = "Seller ID is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register/",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          seller_id: formData.seller_id,
          mobile: formData.mobile,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Registration successful
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      // Handle registration errors
      if (err.response && err.response.data) {
        const backendErrors = err.response.data;
        if (typeof backendErrors === "object") {
          const newErrors = {};
          for (const [key, value] of Object.entries(backendErrors)) {
            newErrors[key] = Array.isArray(value) ? value[0] : value;
          }
          setErrors(newErrors);
        } else {
          setErrors({ submit: "Registration failed. Please try again." });
        }
      } else if (err.request) {
        setErrors({ submit: "Network error. Please check your connection." });
      } else {
        setErrors({ submit: "An unexpected error occurred." });
      }
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-light flex flex-col">
      {/* Centered form */}
      <div className="mt-12 flex flex-1 items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Create an Account
          </h2>
          {errors.submit && (
            <p className="text-red-500 text-center mb-4 text-sm">{errors.submit}</p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
                  errors.username ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"
                }`}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>

            {/* Name inputs */}
            <div className="flex gap-4">
              <div className="flex flex-col flex-1">
                <label className="text-gray-700 font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
                    errors.first_name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"
                  }`}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
                )}
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-gray-700 font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
                    errors.last_name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"
                  }`}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
                )}
              </div>
            </div>

            {/* Seller ID */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Seller ID</label>
              <input
                type="text"
                name="seller_id"
                value={formData.seller_id}
                onChange={handleChange}
                placeholder="Enter your seller ID"
                className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
                  errors.seller_id ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"
                }`}
              />
              {errors.seller_id && (
                <p className="text-red-500 text-xs mt-1">{errors.seller_id}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength="10"
                className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
                  errors.mobile ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"
                }`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
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
                className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password (min 8 characters)"
                className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
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
                className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
                  errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white font-semibold rounded-lg py-2 mt-2 hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {/* Login link */}
            <p className="text-center text-gray-600 text-sm mt-2">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:underline font-semibold">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
