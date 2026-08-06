const { validateToken } = require("../services/qrService");
const Attendance = require("../models/Attendance");
const { attendanceQueue } = require("../queues/attendanceQueue"); // ← add this
const {
  hasAlreadyMarked,
  getLiveAttendance,
  getTodayRange,
} = require("../services/attendanceService");

module.exports.markAttendance = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { token, deviceId } = req.body;

    if (!token) {
      return res.status(400).json({ message: "QR token required" });
    }

    const qr = await validateToken(token);
    if (!qr) {
      return res.status(400).json({ message: "Invalid or expired QR" });
    }

    // 🚫 Anti-proxy check
    if (deviceId) {
      const { todayStart, todayEnd } = getTodayRange();
      const deviceUsed = await Attendance.findOne({
        deviceId,
        date: { $gte: todayStart, $lt: todayEnd },
      });
      if (deviceUsed && deviceUsed.studentId !== studentId) {
        return res.status(403).json({
          message:
            "This device has already been used to mark attendance for another student today.",
        });
      }
    }

    // 🚫 Duplicate check
    const alreadyMarked = await hasAlreadyMarked(
      studentId,
      qr.className,
      qr.subject,
    );
    if (alreadyMarked) {
      return res.status(400).json({ message: "Attendance already marked" });
    }

    const studentName =
      req.user.user_metadata?.name ||
      req.user.user_metadata?.full_name ||
      req.user.email ||
      "Unknown";
    const enrollmentNo = req.user.user_metadata?.enrollment_no || null;
    const department = req.user.user_metadata?.department || null;

    // ✅ Add to Redis queue — responds instantly, DB write happens in background
    await attendanceQueue.add("mark", {
      studentId,
      studentName,
      enrollmentNo,
      department,
      className: qr.className,
      subject: qr.subject,
      deviceId,
      qrToken: token,
    });

    res.json({ message: "Attendance marked successfully" });
  } catch (err) {
    console.error("❌ Error marking attendance:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports.getLiveAttendance = async (req, res) => {
  try {
    const { className, subject } = req.query;

    if (!className || !subject) {
      return res
        .status(400)
        .json({ message: "className and subject required" });
    }

    const records = await getLiveAttendance(className, subject);

    const formatted = records.map((r) => ({
      studentName: r.studentName,
      studentId: r.enrollmentNo || r.studentId,
      status: "Present",
      time: new Date(r.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    res.json({ count: formatted.length, students: formatted });
  } catch (err) {
    console.error("❌ Error fetching live attendance:", err);
    res.status(500).json({ error: err.message });
  }
};
