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
  socket.broadcast.emit("server message", "a user has connected");
  // Setup for username
  let newUserName = "";

  // Listen for chat message event
  socket.on("join room", (data) => {
    console.log("Join room request:", data);

    // Assign username
    newUserName = data.userName;

    let room_count = roomDB.filter((game) => {
      if (game.room == data.room) {
        return game.room;
      }
    });

    if (room_count.length == 0) {
      console.log("Enter room 1st");

      // Join user to room
      socket.join(data.room);
      // Announce arrival of new user to other user in room
      socket
        .to(data.room)
        .emit("enter room", `${data.userName} is binnen in: ${data.room}`);
      // Store user data
      roomDB.push({
        room: data.room,
        userId: data.id,
        username: data.userName,
      });
      // Get & store trivia data
      getTriviaData();
    } else if (room_count.length == 1) {
      console.log("Join room 2nd");

      // Join user to room
      socket.join(data.room);
      // Announce arrival of new user to other user in room
      socket
        .to(data.room)
        .emit("enter room", `${data.userName} is binnen in: ${data.room}`);
      // Store user data
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
  });

  // Listen for a user has disconnected event
  socket.on("disconnect", () => {
    console.log(" a user has disconnected");
    socket.broadcast.emit("server message", `${newUserName} has left the chat`);
  });
});

// Fetch & return data from an API
let getData = async (apiEndpoint) => {
  const response = await fetch(apiEndpoint);

  const data = await response.json();
  console.log("API 1e", data.results);
  return data.results;
};

// Request data from the Trivia API & return this data
let getTriviaData = () => {
  // Set up API parameters
  const questionsAmount = 5;
  const typeAnswer = "multiple";

  //Build API endpoint
  const apiEndpoint = `https://opentdb.com/api.php?amount=${questionsAmount}&type=${typeAnswer}`;

  // Get Trivia data & store results in DB
  getData(apiEndpoint).then((results) => {
    storeTrivia(results);
  });
};

// Store room data
let roomDB = [];
// Store game data
let gameStatus = [];
// Store trivia data
let triviaDB = [];

// Store trivia data to DB
let storeTrivia = (triviaData) => {
  return (triviaDB = triviaData);
};

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
