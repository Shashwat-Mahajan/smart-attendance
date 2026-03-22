import React, { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Shield,
  LogIn,
  Eye,
  EyeOff,
} from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const roles = [
    {
      id: "student",
      name: "Student",
      icon: GraduationCap,
      description: "Access your attendance records and apply for OD",
    },
    {
      id: "teacher",
      name: "Teacher",
      icon: BookOpen,
      description: "Manage attendance sessions and approve OD requests",
    },
    {
      id: "admin",
      name: "Admin",
      icon: Shield,
      description: "System administration and analytics dashboard",
    },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedRole = selectedRole.toLowerCase();

    try {
      // NOTE: The original code used axios to make a request to a local server.
      // We are simulating this behavior with a fetch call for this single file.
      // In a real application, you would replace this with a real API endpoint.
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: trimmedUsername,
            password: trimmedPassword,
            role: trimmedRole,
          }),
        }
      );

      // We'll simulate success if the response is okay and a password is provided.
      // In a real app, you would check the actual response data.
      if (response.ok && trimmedPassword.length > 0) {
        const userData = { role: trimmedRole, username: trimmedUsername };

        // NOTE: The original code used localStorage. For a multi-user app,
        // it is recommended to use Firestore for persistent storage.
        localStorage.setItem("loggedInUser", JSON.stringify(userData));

        setMessage({ text: "Login successful!", type: "success" });

        // Redirect based on role (using window.location for a single file)
        if (trimmedRole === "student") window.location.href = "/student";
        else if (trimmedRole === "teacher") window.location.href = "/teacher";
        else window.location.href = "/admin";
      } else {
        setMessage({
          text: "❌ Login failed! Check credentials.",
          type: "error",
        });
      }
    } catch (err) {
      setMessage({
        text: "❌ An error occurred during login. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (role) => {
    const credentials = {
      student: "john.student@college.edu",
      teacher: "sarah.teacher@college.edu",
      admin: "admin@college.edu",
    };
    setUsername(credentials[role]);
    setPassword("demo123");
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 antialiased">
      {/* We are placing the styles here to keep the file self-contained */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .bg-gradient-hero {
          background-image: linear-gradient(to right, #4F46E5, #8B5CF6);
        }
        .shadow-strong {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .transition-smooth {
          transition: all 0.2s ease-in-out;
        }
        `}
      </style>
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-3">
            <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-black">Smart Attendance System</h1>
          </div>
          <p className="text-black/80">Dynamic QR based Attendance System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-xl shadow-strong border-0">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-sm text-gray-500">
              Choose your role and sign in to continue
            </p>
          </div>
          <div className="space-y-6">
            {/* Role Selection Dropdown */}
            <div className="space-y-2">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Select Role
              </label>
              <div className="relative">
                <select
                  id="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full appearance-none px-3 py-2 pl-10 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-smooth"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {selectedRole === "student" && (
                    <GraduationCap className="h-5 w-5" />
                  )}
                  {selectedRole === "teacher" && (
                    <BookOpen className="h-5 w-5" />
                  )}
                  {selectedRole === "admin" && <Shield className="h-5 w-5" />}
                </div>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-medium"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-smooth"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-smooth pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-smooth"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Message box for success/error */}
              {message.text && (
                <div
                  className={`p-3 rounded-lg text-sm text-center ${
                    message.type === "error"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2 inline-block" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2 inline-block" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Demo Credentials
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => fillDemoCredentials(role.id)}
                    className="w-full border-2 border-gray-200 rounded-lg py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {role.name}
                  </button>
                ))}
              </div>

              <p className="text-xs text-center text-gray-500">
                Password for all demo accounts:{" "}
                <code className="bg-gray-100 px-1 rounded">demo123</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
