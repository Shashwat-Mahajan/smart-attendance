const { Queue, Worker } = require("bullmq");
const Attendance = require("../models/Attendance");

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
