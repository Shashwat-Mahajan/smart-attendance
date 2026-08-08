import { useEffect, useState, useRef } from "react";
import { BrowserQRCodeSvgWriter } from "@zxing/library";
import api from "../lib/api";
import socket from "../lib/socket";
import AttendancePanel from "../components/AttendancePannel";
import PendingRequests from "../components/PendingRequest";
import Header from "../UI/Header";
import Card from "../UI/Card";
import LiveAttendance from "../components/LiveAttendace";

function RollingQR() {
  const [liveAttendanceData, setLiveAttendanceData] = useState([]);
  const [showLiveAttendance, setShowLiveAttendance] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [isActive, setIsActive] = useState(false);
  const qrRef = useRef(null);
  const intervalRef = useRef(null);

  // ─── QR fetch ────────────────────────────────────────────────────────────
  const fetchQR = async () => {
    if (!className || !subject) return;
    try {
      const res = await api.get("/api/qr/generate", {
        params: { className, subject },
      });
      setQrData(res.data);
    } catch (err) {
      console.error("Failed to fetch QR:", err);
    }
  };

  // ─── One-time load of whatever's already marked when the session starts ──
  const fetchInitialAttendance = async () => {
    if (!className || !subject) return;
    try {
      const res = await api.get("/api/attendance/live", {
        params: { className, subject },
      });
      setLiveAttendanceData(res.data.students);
    } catch (err) {
      console.error(
        "Failed to fetch live attendance:",
        err.response?.data || err.message,
      );
    }
  };

  // ─── Live attendance: Socket.IO push instead of 5s polling ───────────────
  const startLiveAttendance = () => {
    setLiveAttendanceData([]);
    fetchInitialAttendance(); // seed with anything already marked

    if (!socket.connected) socket.connect();
    socket.emit("join:session", { className, subject });

    socket.on("attendance:new", (record) => {
      // Guard against stale events if the session/room changes mid-flight
      if (record.className !== className || record.subject !== subject) return;
      setLiveAttendanceData((prev) => {
        // avoid duplicates if the same student event arrives twice
        if (prev.some((s) => s.studentId === record.studentId)) return prev;
        return [...prev, record];
      });
    });
  };

  const stopLiveAttendance = () => {
    socket.off("attendance:new");
    if (className && subject) {
      socket.emit("leave:session", { className, subject });
    }
    if (socket.connected) socket.disconnect();
  };

  // ─── Toggle QR session on/off ─────────────────────────────────────────────
  const toggleQR = () => {
    if (isActive) {
      clearInterval(intervalRef.current);
      stopLiveAttendance();
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
        startLiveAttendance();
      }, 2000);
    }
  };

  // ─── Render QR SVG ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!qrData || !qrRef.current) return;
    try {
      const writer = new BrowserQRCodeSvgWriter();
      const svg = writer.write(JSON.stringify(qrData), 250, 250);
      qrRef.current.innerHTML = "";
      qrRef.current.appendChild(svg);
    } catch (err) {
      console.error("QR Render Error:", err);
    }
  }, [qrData]);

  // ─── Cleanup on unmount ───────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      stopLiveAttendance();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header userName="Alex" department="cse" />
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
