const { Queue, Worker } = require("bullmq");
const Attendance = require("../models/Attendance");
const { getIO } = require("../config/socket.js");

// Upstash requires TLS — the tls:{} option enables it
const connection = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
  tls: {},
};

// Queue — accepts jobs instantly, no DB touch at scan time
const attendanceQueue = new Queue("attendance", { connection });

// Worker — processes jobs in controlled batches
// concurrency: 10 means max 10 simultaneous DB writes
const attendanceWorker = new Worker(
  "attendance",
  async (job) => {
    const {
      studentId,
      studentName,
      enrollmentNo,
      department,
      className,
      subject,
      deviceId,
      qrToken,
    } = job.data;

    const attendance = new Attendance({
      studentId,
      studentName,
      enrollmentNo,
      department,
      className,
      subject,
      deviceId,
      qrToken,
    });

    await attendance.save();
    console.log(`✅ Attendance saved for ${studentName}`);

    // ─── Emit real-time update to the teacher dashboard ───────────────────
    // Room is scoped to className:subject so only the teacher watching
    // this exact session gets the event (see config/socket.js).
    try {
      const io = getIO();
      const room = `${className}:${subject}`;
      io.to(room).emit("attendance:new", {
        studentId,
        studentName,
        enrollmentNo,
        department,
        className,
        subject,
        markedAt: attendance.createdAt || new Date(),
      });
    } catch (err) {
      // Don't fail the job if the socket layer isn't ready/available —
      // attendance is already saved, this is just the live-update push.
      console.error("⚠️ Failed to emit attendance:new:", err.message);
    }

    return attendance;
  },
  {
    connection,
    concurrency: 10,
  },
);

attendanceWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

attendanceWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});

module.exports = { attendanceQueue };
