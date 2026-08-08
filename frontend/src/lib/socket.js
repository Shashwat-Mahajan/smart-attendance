import { io } from "socket.io-client";

// Same base URL pattern as lib/api.js:
// - Empty string when using the Vite proxy locally
// - VITE_API_URL in production (Render URL)
const SOCKET_URL = import.meta.env.VITE_API_URL || undefined;

// Single shared socket instance for the whole app.
// autoConnect: false — Teacher.jsx connects explicitly when a QR
// session starts, and disconnects when it stops, to avoid keeping
// idle sockets open on pages that don't need them.
const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
  // Poll first, then upgrade to websocket — this is Socket.IO's default
  // and matters on Render: the initial handshake over polling gets through
  // the edge proxy reliably, then it upgrades. Starting with websocket-only
  // can get refused, especially on a cold start.
  transports: ["polling", "websocket"],
});

export default socket;
