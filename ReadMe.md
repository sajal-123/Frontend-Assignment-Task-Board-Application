# 📝 Task Management App

A full-stack task management application built with modern web technologies and a production-grade architecture. It allows users to manage tasks with features like authentication, smooth animations, and persistent storage.

---

## 🚀 Tech Stack

### Frontend
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand) – state management
- [React Router DOM](https://reactrouter.com/)
- [React Hot Toast](https://react-hot-toast.com/)
- [Framer Motion](https://www.framer.com/motion/) – animations

### Backend
- [Express.js](https://expressjs.com/) running on [Bun](https://bun.sh/)
- [MongoDB](https://www.mongodb.com/)
- [Morgan](https://github.com/expressjs/morgan) – HTTP logging
- [JWT](https://jwt.io/) – authentication

---

## 📁 Folder Structure

<pre>
root
├── client/              # Vite + React frontend
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/     # Zustand store
│       ├── pages/
│       └── App.jsx
├── server/              # Express backend (using Bun)
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.ts
</pre>

> The project follows a modular and scalable folder structure for both frontend and backend.

---

## 🛠️ Features

- ✅ JWT-based authentication
- ✅ Create, update, and delete tasks
- ✅ Responsive UI with Tailwind CSS
- ✅ Global state management using Zustand
- ✅ Smooth animations with Framer Motion
- ✅ Clean, scalable, production-ready architecture

---

## 🧪 Local Setup

### 1. Clone the Repository

```bash
git clone git@github.com:sajal-123/Frontend-Assignment-Task-Board-Application.git
cd task-management-app
```

### 2. Setup Backend (Bun + MongoDB)
```bash
cd server
bun install
```
replace .env.sample > .env

### Add MONGO_URI from Email or personal string in server/.env

```bash
bun run dev
```
server end Point: http://localhost:8000

### 3. Setup Frontend
```bash
cd task-board-app
npm install
npm run dev
```
client end Point:http://localhost:5173