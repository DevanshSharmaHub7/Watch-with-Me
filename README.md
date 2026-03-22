# 🎬 Watch with Me

Watch YouTube videos in perfect sync with your friends — in real time.

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![Socket.io](https://img.shields.io/badge/Socket.io-4.x-black?style=flat-square&logo=socket.io)
![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)
![Live](https://img.shields.io/badge/Live-Render-blue?style=flat-square)

---

## ✨ Features

- 🔗 **Create or join rooms** with a shareable room code
- ▶️ **Real-time sync** — play, pause, seek, speed & quality all sync instantly
- 💬 **Live chat** with WhatsApp-style bubbles
- 📱 **Responsive** — works on desktop and mobile
- ⚡ **Latency compensation** — debounced sync prevents drift accumulation

---

## 🚀 Live Demo

👉 [watchwithme-k82s.onrender.com](https://watchwithme-k82s.onrender.com)

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Backend | Node.js + Express |
| Real-time | Socket.io |
| Frontend | Vanilla HTML, CSS, JS |
| Video | YouTube IFrame API |
| Hosting | Render |

---

## 📁 Project Structure
```
Watch-with-Me/
├── index.html        # Home page (create/join room)
├── home.css          # Home page styles
├── room.html         # Room page (video + chat)
├── room.css          # Room page styles
├── index.js          # Express server + Socket.io logic
├── package.json
└── README.md
```

---

## ⚙️ Run Locally

### Prerequisites
- Node.js 18+
- npm

### Steps
```bash
# 1. Clone the repo
git clone https://github.com/DevanshSharmaHub7/Watch-with-Me.git
cd Watch-with-Me

# 2. Install dependencies
npm install

# 3. Start the server
node index.js

# 4. Open in browser
http://localhost:3000
```

---

## 🎮 How to Use

1. Open the app and enter your name + a YouTube URL
2. Click **Create Room** — you'll get a Room ID
3. Share the link with friends:
```
   http://localhost:3000/room/ROOM_ID?name=YourName
```
4. Anyone who joins will be synced to the same video in real time
5. Play, pause, change speed or quality — everyone stays in sync

---

## 🔌 Socket Events

| Event | Direction | Payload |
|-------|-----------|---------|
| `join-room` | Client → Server | `{ roomId, name }` |
| `user-joined` | Server → Client | `string` |
| `chat-message` | Both | `{ roomId, name, message }` |
| `video-control` | Both | `{ roomId, action, time, sentAt }` |

---

## 🚀 Deploy on Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set build command: `npm install`
5. Set start command: `node index.js`
6. Deploy ✅

---

## 🙌 Made With Love

Made with ❤️ by **Devansh** and **Naman**

---

## 📄 License

MIT — free to use, modify and share.
