const { Server } = require("socket.io");

let io = null;

/**
 * Initialize Socket.IO on top of the existing HTTP server.
 * Call this once from server.js after creating the http server.
 */
function initSocket(httpServer, allowedOrigins) {
  io = new Server(httpServer, {
    cors: {
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error(`Socket.IO CORS blocked: ${origin}`));
      },
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    // Teacher dashboard joins a room scoped to className+subject
    // so events only go to clients watching that specific session.
    socket.on("join:session", ({ className, subject }) => {
      if (!className || !subject) return;
      const room = `${className}:${subject}`;
      socket.join(room);
      console.log(`📌 ${socket.id} joined room ${room}`);
    });

    socket.on("leave:session", ({ className, subject }) => {
      if (!className || !subject) return;
      const room = `${className}:${subject}`;
      socket.leave(room);
    });

    socket.on("disconnect", () => {
      console.log(`🔌 Socket disconnected: ${socket.id}`);
    });
  });

  return io;
}

/**
 * Get the initialized Socket.IO instance from anywhere in the app
 * (e.g. the BullMQ worker). Throws if called before initSocket().
 */
function getIO() {
  if (!io) {
    throw new Error(
      "Socket.IO not initialized. Call initSocket() first in server.js",
    );
  }
  return io;
}

module.exports = { initSocket, getIO };
