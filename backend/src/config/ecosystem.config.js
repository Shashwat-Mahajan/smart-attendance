module.exports = {
  apps: [
    {
      name: "smart-attendance-backend",
      script: "./src/server.js",
      instances: 2, // ← fixed number, not "max"
      exec_mode: "cluster",
      watch: false,
      env: {
        NODE_ENV: "development",
        PORT: 5000,
      },
      max_memory_restart: "200M",
      restart_delay: 3000,
      max_restarts: 5,
    },
  ],
};
