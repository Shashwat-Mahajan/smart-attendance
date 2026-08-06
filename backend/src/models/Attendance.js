const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: String,
  enrollmentNo: String,
  department: String,
  deviceId: String,
  qrToken: String,
  className: String,
  subject: String,
  date: { type: Date, default: Date.now },
});

// ─── Indexes ──────────────────────────────────────────────────────────────────
// Without these, every query does a full collection scan.
// With these, lookups are direct — critical when attendance records grow large.

// Used by hasAlreadyMarked() — "has this student marked this class today?"
attendanceSchema.index({ studentId: 1, className: 1, subject: 1, date: 1 });

// Used by anti-proxy check — "has this device been used today?"
attendanceSchema.index({ deviceId: 1, date: 1 });

// Used by getLiveAttendance() — "who attended this class today?"
attendanceSchema.index({ className: 1, subject: 1, date: 1 });

module.exports = mongoose.model("Attendance", attendanceSchema);
