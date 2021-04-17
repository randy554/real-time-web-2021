import express from "express";
import path from "path";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const port = process.env.PORT || 2021;
const api_key = process.env.API_KEY;

// connect express to http port
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.resolve("public")));

app.set("view engine", "ejs");
app.set("views", "views");

// Create a socket
io.on("connection", (socket) => {
  // Listen for a user has connected event
  console.log(" a user has connected");

  let newUserName = "";

  // Listen for chat message event
  socket.on("join room", (data) => {
    // Set the new username;

    console.log("Join room request", data);

    newUserName = data.userName;

    let room_count = roomDB.filter((game) => {
      if (game.room == data.room) {
        return game.room;
      }
    });

    if (room_count.length == 0) {
      console.log("Enter room 1st");
      roomDB.push({
        room: data.room,
        userId: data.id,
        username: data.userName,
      });
    } else if (room_count.length == 1) {
      console.log("Join room 2nd");
      roomDB.push({
        room: data.room,
        userId: data.id,
        username: data.userName,
      });
    } else {
      console.log(`No space in room: ${data.room}. Create/join other room`);
      socket.emit(
        "enter room",
        `No space in room: ${data.room}. Create/join a other room`
      );
    }

    console.log("DB status:", roomDB);

    socket.emit("join room", data);
  });

  // Listen for a user has disconnected event
  socket.on("disconnect", () => {
    console.log(" a user has disconnected");
    io.emit("server message", `${newUserName} has left the chat!`);
  });
});

// Store room data
let roomDB = [];
// Store game data
let gameStatus = [];

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/play", (req, res) => {
  res.render("play");
});

// Listen on this port
httpServer.listen(port, () => {
  console.log(`Open page @ http://localhost:${port}`);
});
