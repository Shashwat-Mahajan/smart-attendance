import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Verify from "./pages/verify";

import RollingQR from "./pages/Teacher";
import Student from "./pages/Student";
import Admin from "./pages/Admin";

import { AuthProvider, AuthContext } from "./context/AuthContext";

// 🚫 Public Route (blocks logged-in users from auth pages)
const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h1>Loading...</h1>;

  if (user) {
    const role = user.user_metadata.role;

    if (role === "admin") return <Navigate to="/admin" replace />;
    if (role === "teacher") return <Navigate to="/teacher" replace />;
    return <Navigate to="/student" replace />;
  }

  return children;
};

// 🔐 Role-based protected route
const RoleRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h1>Loading...</h1>;

  if (!user) return <Navigate to="/" replace />;

  const role = user.user_metadata.role;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🏠 HOME */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />

          {/* 🔐 AUTH */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route path="/verify" element={<Verify />} />

          {/* 🔒 PROTECTED ROUTES */}
          <Route
            path="/admin"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <Admin />
              </RoleRoute>
            }
          />

          <Route
            path="/teacher"
            element={
              <RoleRoute allowedRoles={["teacher"]}>
                <RollingQR />
              </RoleRoute>
            }
          />

          <Route
            path="/student"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <Student />
              </RoleRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
