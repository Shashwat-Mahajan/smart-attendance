require("dotenv").config();
console.log("ENV CHECK:", process.env.SUPABASE_URL);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db.js");

const deviceRoutes = require("./routes/deviceRoutes.js");
const qrRoutes = require("./routes/qrRoutes.js");
const attendanceRoutes = require("./routes/attendanceRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ HELMET
app.use(helmet());

// ✅ CORS — reads allowed origins from .env so no hardcoding needed
// Local:      ALLOWED_ORIGINS=http://localhost:5173
// Production: ALLOWED_ORIGINS=https://your-app.vercel.app
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, curl, mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  }),
);

// ✅ BODY PARSER
app.use(express.json());

// ✅ COOKIE PARSER
app.use(cookieParser());

// ─── Rate Limiters ────────────────────────────────────────────────────────────

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many attempts. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

const attendanceLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { message: "Too many attendance requests. Please wait a moment." },
  standardHeaders: true,
  legacyHeaders: false,
});

const qrLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { message: "Too many QR requests." },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { message: "Too many requests. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ ROUTES
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/admin", generalLimiter, adminRoutes);
app.use("/api/user", generalLimiter, userRoutes);
app.use("/api/device", generalLimiter, deviceRoutes);
app.use("/api/qr", qrLimiter, qrRoutes);
app.use("/api/attendance", attendanceLimiter, attendanceRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
