const express = require("express");
const { auth } = require("./authMiddleware");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();

app.use(auth);

app.use(express.static("public"));

const server = app.listen(8000, () => {
  console.log("Listening on port 8000");
});

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("play", () => socket.broadcast.emit("played"));
  socket.on("pause", () => socket.broadcast.emit("paused"));
  socket.on("updateTime", (time) => socket.broadcast.emit("updatedTime", time));
});
