# 📚 Blogify - MERN Stack Blogging Platform

**Blogify** is a modern full-stack blogging platform where users can create, view, and manage blogs. Built using the **MERN stack** (MongoDB, Express, React, Node.js) with clean UI and intuitive functionality.

---

## 🚀 Live Demo

- 🔗 Frontend: [https://blogify-beta-two.vercel.app](https://blogify-beta-two.vercel.app)
- 🔗 Backend API: [https://blogify-gcdw.onrender.com](https://blogify-gcdw.onrender.com)

---

## 📁 Project Structure
Blogify/
├── frontend/ # React Frontend
├── backend/ # Node + Express Backend
├── .gitignore
├── README.md
└── package.json

---

## 💡 Features

- 🔐 Authentication (Login / Signup)
- 📝 Create, Read, Update, Delete (CRUD) Blogs
- 🔎 Blog Search by Title, Author, or Tags
- 🔖 Save / Bookmark Blogs 
- 💬 Comment on Blog
- 🔄 Pagination & Filtering
- 📦 Fully deployed with Vercel (frontend) and Render (backend)

---

## 🧑‍💻 Tech Stack

### Frontend (React)
- React.js (Vite)
- React Router
- TailwindCSS
- Axios
- React Toastify

### Backend (Node.js)
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- CORS + Middleware

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/MeetVora79/Blogify.git
cd Blogify

### 2. Backend Setup
cd backend
npm install
node index.js

Create .env file inside backend directory:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### 3. Frontend Setup
cd frontend
npm install
npm run dev


🤝 Author
Built with 💖 by Meet Vora


