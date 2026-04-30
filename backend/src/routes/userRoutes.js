const express = require("express");
const router = express.Router();

const {
  createTeacher,
  createStudent,
} = require("../controllers/userController");
const { verifyUser, allowRoles } = require("../middlewares/authMiddleware");

// 🔥 ADMIN → create teacher
router.post("/create-teacher", verifyUser, allowRoles("admin"), createTeacher);

// 🔥 TEACHER → create student
router.post(
  "/create-student",
  verifyUser,
  allowRoles("teacher"),
  createStudent,
);

module.exports = router;
