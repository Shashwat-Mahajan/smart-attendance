const express = require("express");
const {
  markAttendance,
  getLiveAttendance,
} = require("../controllers/attendanceController.js");
const { verifyUser, allowRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// 🔐 Student must be logged in — studentId is taken from the verified session
router.post("/mark", verifyUser, markAttendance);

// 🔐 Teacher/Admin only — real-time attendance for the dashboard
router.get(
  "/live",
  verifyUser,
  allowRoles("teacher", "admin"),
  getLiveAttendance,
);

module.exports = router;
