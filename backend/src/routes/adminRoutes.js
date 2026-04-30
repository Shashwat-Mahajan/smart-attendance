const express = require("express");
const router = express.Router();

const { createAdmin } = require("../controllers/adminController");
const { verifyUser, allowRoles } = require("../middlewares/authMiddleware");

// 🔥 ONLY ADMIN CAN CREATE ADMIN
router.post("/create-admin", verifyUser, allowRoles("admin"), createAdmin);

module.exports = router;
