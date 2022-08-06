import "dotenv/config";
import express from "express";
import { router } from "./router";
import http from "http";
import cors from "cors";

import { Server } from "socket.io"

const app = express();

app.use(cors());

const serverHTTP = http.createServer(app);

const io = new Server(serverHTTP, { 
  cors: {
    origin: "*"
  }
});

io.on('connection', socket => {
  console.log(`Usuario conectado no socket ${socket.id}`);
})

app.use(express.json());

app.use(router);

export { serverHTTP, io, app };