// test-server.js - Simple debug server
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

console.log("🔍 DEBUG INFO:");
console.log("📍 Current directory:", __dirname);
console.log("📁 Files in directory:", fs.readdirSync(__dirname));

// Check if our files exist
const files = ['index.html', 'room.html', 'style.css'];
files.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  console.log(`${exists ? '✅' : '❌'} ${file}: ${exists ? 'EXISTS' : 'NOT FOUND'} at ${filePath}`);
});

// Simple route to test
app.get("/", (req, res) => {
  res.send(`
    <h1>Debug Server</h1>
    <p>Directory: ${__dirname}</p>
    <p>Files found:</p>
    <ul>
      ${fs.readdirSync(__dirname).map(file => `<li>${file}</li>`).join('')}
    </ul>
  `);
});

// Test room route
app.get("/room/:roomId", (req, res) => {
  const roomPath = path.join(__dirname, "room.html");
  res.send(`
    <h1>Room Debug</h1>
    <p>Looking for room.html at: ${roomPath}</p>
    <p>Exists: ${fs.existsSync(roomPath) ? 'YES' : 'NO'}</p>
    <p>Room ID: ${req.params.roomId}</p>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Debug server running on http://localhost:${PORT}`);
});