// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../UI/logo.png";
import Slogo from "../UI/stu1logo.png";
import supabase from "../lib/supabaseClient";


const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1️⃣ Supabase logout
      await supabase.auth.signOut();

      // 2️⃣ Clear backend cookie
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // 3️⃣ Redirect
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed");
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Left section with Logo and App Name */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <img
            src={logo}
            alt="SmartAttend Logo"
            className="rounded-full shadow-md h-15 w-15"
          />
          <div className="ml-3">
            <h1 className="text-xl font-extrabold text-gray-900">
              SmartAttendance
            </h1>
            <span className="text-sm font-medium text-gray-500 hidden sm:block">
              Students
            </span>
          </div>
        </div>
      </div>

      {/* Right section with User actions */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        {/* Notifications */}
        <div className="relative">
          <button className="text-gray-500 hover:text-gray-700 transition duration-150 p-2 rounded-full hover:bg-gray-100">
            <span className="h-6 w-6">🔔</span>
          </button>
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </div>

        {/* Faculty Profile and Logout Button */}
        <div className="flex items-center space-x-3 cursor-pointer group relative">
          <img
            src={Slogo}
            alt="Faculty Profile"
            className="rounded-full ring-2 ring-indigo-300 group-hover:ring-indigo-500 transition-all duration-300 w-10 h-10"
          />
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-semibold text-gray-800">
              Mr. Krishna Yadav
            </span>
            <span className="text-xs text-gray-500">Students</span>
          </div>
          {/* Logout button with SVG icon */}
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-600 transition duration-300 p-2 rounded-md hover:bg-gray-100 ml-2"
            title="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-out"
            >
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100">
          <span className="h-6 w-6">☰</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
