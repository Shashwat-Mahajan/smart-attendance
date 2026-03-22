import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";
import RollingQR from "./pages/Teacher";
import Student from "./pages/Student";
import Admin from "./components/Admin";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("loggedInUser");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <Student />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <RollingQR />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
