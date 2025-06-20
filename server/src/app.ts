import express from "express";
import type { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/user.routes";
import taskRouter from "./routes/Task.routes";

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*", // fallback for dev
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

let clients:any = [];

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
