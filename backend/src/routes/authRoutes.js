const express = require("express");
const { signup, login, setCookie, logout } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/set-cookie", setCookie);
router.post("/logout", logout);

module.exports = router;
