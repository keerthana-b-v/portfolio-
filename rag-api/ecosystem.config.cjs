module.exports = {
  apps: [
    {
      name: "ruthvik-rag-api",
      cwd: "/var/www/ruthvikrr.in/rag-api",
      script: "src/server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },
    },
  ],
};
