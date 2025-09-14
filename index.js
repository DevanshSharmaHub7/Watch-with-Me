// index.js (ESM)
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = process.env.PORT || 3000;


// Serve static files from the current directory
app.use(express.static(__dirname));

// Debug: Log what files exist in the directory
console.log("📁 Files in directory:", fs.readdirSync(__dirname));

// Serve index.html at root
app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "index.html");
  console.log("Serving index.html from:", indexPath);
  
  try {
    const content = fs.readFileSync(indexPath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.send(content);
  } catch (error) {
    console.log("❌ Error reading index.html:", error.message);
    res.status(404).send("index.html not found");
  }
});

// Serve room.html for room routes
app.get("/room/:roomId", (req, res) => {
  const roomHtmlPath = path.join(__dirname, "room.html");
  console.log("Looking for room.html at:", roomHtmlPath);
  
  try {
    const content = fs.readFileSync(roomHtmlPath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.send(content);
  } catch (error) {
    console.log("❌ Error reading room.html:", error.message);
    console.log("📁 Available files:", fs.readdirSync(__dirname));
    res.status(404).send(`
      <h1>room.html not found</h1>
      <p>Looking for: ${roomHtmlPath}</p>
      <p>Available files: ${fs.readdirSync(__dirname).join(', ')}</p>
    `);
  }
});

const rooms = {};

// API endpoint to create room
app.get("/create", (req, res) => {
  const videoUrl = req.query.video;
  const roomId = uuidv4().slice(0, 6);

  if (!videoUrl) {
    return res.status(400).json({ error: "Video URL is required" });
  }

  rooms[roomId] = { videoUrl, users: [] };
  console.log(`🏠 Room created: ${roomId} with video: ${videoUrl}`);

  res.json({ roomId, videoUrl });
});

// API endpoint to get room data
app.get("/room-data/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  const room = rooms[roomId];
  
  console.log(`📊 Getting data for room: ${roomId}`, room ? "found" : "not found");
  
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  res.json({ videoUrl: room.videoUrl });
});

io.on("connection", (socket) => {
  console.log("✅ A user connected");

  socket.on("join-room", ({ roomId, name }) => {
    console.log(`👤 ${name} trying to join room: ${roomId}`);
    
    if (!rooms[roomId]) {
      console.log(`❌ Room ${roomId} not found`);
      socket.emit("error", "Room not found!");
      return;
    }

    socket.join(roomId);
    rooms[roomId].users = rooms[roomId].users || [];
    rooms[roomId].users.push({ id: socket.id, name });

    socket.to(roomId).emit("user-joined", `${name} joined the room`);
    console.log(`👥 ${name} joined room: ${roomId}`);
  });

  socket.on("chat-message", ({ roomId, name, message }) => {
    console.log(`💬 Chat in room ${roomId}: ${name}: ${message}`);
    io.to(roomId).emit("chat-message", { name, message });
  });

  socket.on("video-control", ({ roomId, action }) => {
    console.log(`🎮 Video control in room ${roomId}: ${action}`);
    socket.to(roomId).emit("video-control", { action });
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");

    for (const roomId in rooms) {
      if (rooms[roomId].users) {
        rooms[roomId].users = rooms[roomId].users.filter(u => u.id !== socket.id);
        if (rooms[roomId].users.length === 0) {
          console.log(`🗑️ Deleting empty room: ${roomId}`);
          delete rooms[roomId];
        }
      }
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Server directory: ${__dirname}`);
});