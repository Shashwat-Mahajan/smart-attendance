const express = require("express");
const { signup, login, setCookie, logout } = require("../controllers/authController");
const { createProfile } = require("../controllers/authController");
const { verifyUser } = require("../middlewares/authMiddleware");


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/set-cookie", setCookie);
router.post("/logout", logout);
router.post("/create-profile", verifyUser, createProfile);

module.exports = router;
