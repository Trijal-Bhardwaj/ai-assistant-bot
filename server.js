const express = require("express");
const path = require("path");
const fs = require("fs-extra");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: require("./package.json").version,
  });
});

// Status endpoint for monitoring
app.get("/status", (req, res) => {
  try {
    // Read bot status if available
    const botStatus = global.botStatus || {
      connected: false,
      messagesSent: 0,
      messagesReceived: 0,
      unauthorizedAttempts: 0,
      errors: 0,
      uptime: 0,
    };

    res.json({
      bot: botStatus,
      system: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        platform: process.platform,
        nodeVersion: process.version,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Simple dashboard
app.get("/dashboard", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>AI Assistant Dashboard</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .status { padding: 10px; margin: 10px 0; border-radius: 5px; }
        .healthy { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
        .warning { background: #fff3cd; color: #856404; }
        .metric { display: inline-block; margin: 10px; padding: 10px; background: #f8f9fa; border-radius: 5px; }
        .metric-value { font-size: 24px; font-weight: bold; color: #007bff; }
        .metric-label { font-size: 12px; color: #6c757d; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🤖 AI Assistant Dashboard</h1>
        <div id="status" class="status">Loading...</div>
        <div id="metrics"></div>
        <div id="logs" style="margin-top: 20px; padding: 10px; background: #f8f9fa; border-radius: 5px; max-height: 300px; overflow-y: auto;">
          <h3>Recent Activity</h3>
          <div id="log-content"></div>
        </div>
      </div>
      
      <script>
        function updateStatus() {
          fetch('/status')
            .then(response => response.json())
            .then(data => {
              const statusDiv = document.getElementById('status');
              const metricsDiv = document.getElementById('metrics');
              
              // Update status
              if (data.bot.connected) {
                statusDiv.className = 'status healthy';
                statusDiv.innerHTML = '✅ Bot is connected and running';
              } else {
                statusDiv.className = 'status error';
                statusDiv.innerHTML = '❌ Bot is disconnected';
              }
              
              // Update metrics
              metricsDiv.innerHTML = \`
                <div class="metric">
                  <div class="metric-value">\${data.bot.messagesSent}</div>
                  <div class="metric-label">Messages Sent</div>
                </div>
                <div class="metric">
                  <div class="metric-value">\${data.bot.messagesReceived}</div>
                  <div class="metric-label">Messages Received</div>
                </div>
                <div class="metric">
                  <div class="metric-value">\${data.bot.unauthorizedAttempts}</div>
                  <div class="metric-label">Blocked Attempts</div>
                </div>
                <div class="metric">
                  <div class="metric-value">\${Math.floor(data.system.uptime / 3600)}h</div>
                  <div class="metric-label">Uptime</div>
                </div>
              \`;
            })
            .catch(error => {
              document.getElementById('status').className = 'status error';
              document.getElementById('status').innerHTML = '❌ Error loading status: ' + error.message;
            });
        }
        
        // Update every 5 seconds
        updateStatus();
        setInterval(updateStatus, 5000);
      </script>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
  console.log(`❤️ Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
