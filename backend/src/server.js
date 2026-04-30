require("dotenv").config();
console.log("ENV CHECK:", process.env.SUPABASE_URL);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db.js");

const deviceRoutes = require("./routes/deviceRoutes.js");
const qrRoutes = require("./routes/qrRoutes.js");
const attendanceRoutes = require("./routes/attendanceRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ CORS (must be first)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// ✅ BODY PARSER
app.use(express.json());

// ✅ COOKIE PARSER (🔥 MUST BE BEFORE ROUTES)
app.use(cookieParser());

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/attendance", attendanceRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
