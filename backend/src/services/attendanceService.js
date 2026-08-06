const Attendance = require("../models/Attendance");

const getTodayRange = () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  return { todayStart, todayEnd };
};

// Has THIS student already marked attendance for this class/subject today?
const hasAlreadyMarked = async (studentId, className, subject) => {
  const { todayStart, todayEnd } = getTodayRange();

  return await Attendance.findOne({
    studentId,
    className,
    subject,
    date: { $gte: todayStart, $lt: todayEnd },
  });
};

// Has this DEVICE already been used to mark someone else's attendance today,
// for this same class/subject? (anti-proxy check)
const hasDeviceAlreadyMarked = async (deviceId, className, subject) => {
  if (!deviceId) return null;
  const { todayStart, todayEnd } = getTodayRange();

  return await Attendance.findOne({
    deviceId,
    className,
    subject,
    date: { $gte: todayStart, $lt: todayEnd },
  });
};

const saveAttendance = async ({
  studentId,
  studentName,
  enrollmentNo,
  department,
  className,
  subject,
  deviceId,
  qrToken,
}) => {
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
  return await attendance.save();
};

// Real records for the teacher's live dashboard — today's scans for a class/subject
const getLiveAttendance = async (className, subject) => {
  const { todayStart, todayEnd } = getTodayRange();

  return await Attendance.find({
    className,
    subject,
    date: { $gte: todayStart, $lt: todayEnd },
  }).sort({ date: -1 });
};

module.exports = {
  hasAlreadyMarked,
  hasDeviceAlreadyMarked,
  saveAttendance,
  getLiveAttendance,
};
