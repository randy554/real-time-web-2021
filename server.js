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
        `No space in room: ${data.room}. Create/join other room`
      );
    }

    console.log("DB status:", roomDB);

    socket.emit("join room", data);
  });

  socket.on("no input", () => {
    // Send to client who submitted a empty form
    socket.emit("no input", "Fill in a username & message before submitting");
    console.log(
      "%c No name or message input filled!",
      "color: black; background-color: orange; font-weight: bold;"
    );
  });

  // Listen for a user has disconnected event
  socket.on("disconnect", () => {
    console.log(" a user has disconnected");
    io.emit("server message", `${newUserName} has left the chat!`);
  });
});

let gifDB = {
  happy: [],
  motivated: [],
  frustrated: [],
  tired: [],
};

let roomDB = [];

let getData = async (tag) => {
  let api_endpoint = `https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag=${tag}&rating=g`;

  if (gifDB.happy.length > 0) {
    // Empty gif DB  if not empty
    gifDB.happy.splice(0, 8);
    gifDB.frustrated.splice(0, 8);
    gifDB.motivated.splice(0, 8);
    gifDB.tired.splice(0, 8);

    // Get data from API
    let res = await fetch(api_endpoint);
    let data = await res.json();

    let res2 = await fetch(api_endpoint);
    let data2 = await res2.json();

    let res3 = await fetch(api_endpoint);
    let data3 = await res3.json();

    let res4 = await fetch(api_endpoint);
    let data4 = await res4.json();

    // Add data to DB
    gifDB[tag].push(data.data.images.fixed_height.webp);
    gifDB[tag].push(data2.data.images.fixed_height.webp);
    gifDB[tag].push(data3.data.images.fixed_height.webp);
    gifDB[tag].push(data4.data.images.fixed_height.webp);

    console.log("DB", gifDB);
  } else {
    let res = await fetch(api_endpoint);
    let data = await res.json();

    let res2 = await fetch(api_endpoint);
    let data2 = await res2.json();

    let res3 = await fetch(api_endpoint);
    let data3 = await res3.json();

    let res4 = await fetch(api_endpoint);
    let data4 = await res4.json();

    gifDB[tag].push(data.data.images.fixed_height.webp);
    gifDB[tag].push(data2.data.images.fixed_height.webp);
    gifDB[tag].push(data3.data.images.fixed_height.webp);
    gifDB[tag].push(data4.data.images.fixed_height.webp);

    console.log("DB", gifDB);
  }
};

// Get & store the gifs for different moods
let storeGifs = () => {
  getData("happy");
  getData("motivated");
  getData("frustrated");
  getData("tired");
};

// Get a random gif from a specific mood
let getGif = (mood, listNr) => {
  return gifDB[mood][listNr];
};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/play", (req, res) => {
  res.render("index");
});

// Listen on this port
httpServer.listen(port, () => {
  console.log(`Open page @ http://localhost:${port}`);
});
