# 🚀 UniPrep AI
### Smart Academic & Exam Preparation Platform
UniPrep AI is a MERN-based platform that helps students manage academics, prepare for exams, track study progress, and access AI-powered learning support — all in one place.
---

## ✨ Features

- 📚 Structured Academic Dashboard
- 🎥 YouTube Learning Integration
- 📈 Study Tracker
- 🧮 SGPA / CGPA Calculator
- 🤖 AI Mentor
- 💬 Real-time Community Chat
- 🎯 Placement & GATE Preparation
- 🔐 JWT Authentication

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Other Tools
- JWT
- Socket.io
- YouTube API

---

## 🏗️ Architecture

```text
React Frontend
      │
      ▼
Node.js + Express Backend
      │
      ▼
MongoDB + External APIs
```

---

## 📂 Project Structure

```bash
UniPrep-AI/
│
├── frontend/
├── backend/
├── routes/
├── controllers/
├── models/
├── middleware/
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <your-repository-url>
cd UniPrep-AI
```

### Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside backend:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
YOUTUBE_API_KEY=your_api_key
```

---
