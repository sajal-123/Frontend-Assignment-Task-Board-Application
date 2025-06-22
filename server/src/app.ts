import express from "express";
import type { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/user.routes";
import taskRouter from "./routes/Task.routes";
import { ENV } from "./utils/ENV";

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

let clients: any = [];

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  clients.push(res);
  req.on('close', () => {
    clients = clients.filter(client => client !== res);
  });
});

export const notifyClients = (data) => {
  clients.forEach(client =>
    client.write(`data: ${JSON.stringify(data)}\n\n`)
  );
};

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

// Export app
export { app };
