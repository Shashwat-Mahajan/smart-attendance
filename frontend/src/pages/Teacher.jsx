import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BrowserQRCodeSvgWriter } from "@zxing/library";
import AttendancePanel from "../components/AttendancePannel";
import PendingRequests from "../components/PendingRequest";
import Header from "../UI/Header";
import Card from "../UI/Card";
import LiveAttendance from "../components/LiveAttendace";

function RollingQR() {
  // Full mock list of students
  const mockStudents = [
    {
      studentName: "Samanvay Agrawal",
      studentId: "CS2024001",
      status: "Present",
      time: "09:02 AM",
    },
    {
      studentName: "Sarah Johnson",
      studentId: "CS2024011",
      status: "Present",
      time: "09:02 AM",
    },
    {
      studentName: "Mike Chen",
      studentId: "CS2024032",
      status: "Late",
      time: "09:12 AM",
    },
    {
      studentName: "Emily Davis",
      studentId: "CS2024045",
      status: "Present",
      time: "09:20 AM",
    },
  ];

  const [liveAttendanceData, setLiveAttendanceData] = useState([]);
  const [showLiveAttendance, setShowLiveAttendance] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [isActive, setIsActive] = useState(false);
  const qrRef = useRef(null);
  const intervalRef = useRef(null);
  const attendanceIntervalRef = useRef(null);

  const fetchQR = async () => {
    if (!className || !subject) return;
    const res = await axios.get("http://localhost:5000/api/qr/generate", {
      params: { className, subject },
    });
    setQrData(res.data);
  };

  const startLiveAttendance = () => {
    setLiveAttendanceData([]);
    let index = 0;

    attendanceIntervalRef.current = setInterval(() => {
      if (index < mockStudents.length) {
        setLiveAttendanceData([mockStudents[index]]);
      } else {
        clearInterval(attendanceIntervalRef.current);
      }
    }, 2000); // 1 second gap
  };

  const toggleQR = () => {
    if (isActive) {
      clearInterval(intervalRef.current);
      clearInterval(attendanceIntervalRef.current);
      setQrData(null);
      setIsActive(false);
      setShowLiveAttendance(false);
      setLiveAttendanceData([]);
    } else {
      fetchQR();
      intervalRef.current = setInterval(fetchQR, 10000);
      setIsActive(true);
      setTimeout(() => {
        setShowLiveAttendance(true);
        startLiveAttendance(); // Start showing students one by one
      }, 2000); // 1.5 sec delay after QR appears
    }
  };

  useEffect(() => {
    if (qrData && qrRef.current) {
      const writer = new BrowserQRCodeSvgWriter();
      const svgElement = writer.write(JSON.stringify(qrData), 250, 250);
      qrRef.current.innerHTML = "";
      qrRef.current.appendChild(svgElement);
    }
  }, [qrData]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(attendanceIntervalRef.current);
    };
  }, []);

  return (
    <>
      <Header userName="ravi" department="cse" />
      <div className="flex flex-row mt-[80px]">
        <AttendancePanel />
        <Card className="p-6 border-2 border-gray-300 rounded-lg shadow-md m-10">
          <div>
            <div>
              <h2 className="text-xl font-bold mb-4">Smart Attendance QR</h2>
              <input
                type="text"
                placeholder="Enter Class Name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="border p-2 m-2"
              />
              <input
                type="text"
                placeholder="Enter Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border p-2 m-2"
              />
              <button
                onClick={toggleQR}
                disabled={!className || !subject}
                className={`px-4 py-2 rounded text-white ${
                  isActive ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {isActive ? "Stop QR" : "Start QR"}
              </button>
              {isActive && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">
                    Rolling QR for {subject}
                  </h3>
                  <div ref={qrRef}></div>
                </div>
              )}
            </div>
            {showLiveAttendance && (
              <div className="mt-6">
                <LiveAttendance liveAttendanceData={liveAttendanceData} />
              </div>
            )}
          </div>
        </Card>
        <PendingRequests />
      </div>
    </>
  );
}

export default RollingQR;
