require("dotenv").config();
console.log("ENV CHECK:", process.env.SUPABASE_URL);

const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db.js");
const { initSocket } = require("./config/socket.js");

const deviceRoutes = require("./routes/deviceRoutes.js");
const qrRoutes = require("./routes/qrRoutes.js");
const attendanceRoutes = require("./routes/attendanceRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ Render (and most PaaS hosts) sit behind a reverse proxy, which sets
// X-Forwarded-For. Without this, express-rate-limit can't reliably
// identify individual client IPs (and throws a ValidationError warning
// on every request, as seen in Render logs).
app.set("trust proxy", 1);

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

// ✅ GLOBAL ERROR HANDLER — safety net so ANY uncaught error in a route
// (malformed JSON body, sync throw, etc.) gets logged and returns JSON
// instead of silently producing a bare 500 with no trace in the logs.
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err.message, err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;

// ✅ Wrap Express in a raw HTTP server so Socket.IO can attach to it.
// (Socket.IO needs the underlying http.Server, not the Express app itself.)
const httpServer = http.createServer(app);

// ✅ Initialize Socket.IO on the same server/port — no second port needed,
// and it reuses the same CORS allow-list as the REST API.
initSocket(httpServer, allowedOrigins);

connectDB().then(() => {
  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔌 Socket.IO ready`);
  });
});
