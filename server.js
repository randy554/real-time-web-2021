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

  storeGifs();
  setInterval(storeGifs, 60000);

  // Make username available outside .on('chat')
  let newUserName = "";

  // Listen for chat message event
  socket.on("chat", (data) => {
    // Set the new username;
    newUserName = data.userName;

    let nr = Math.floor(Math.random() * 2 + 1);

    // Create variable for .includes()
    let str = data.userMessage;

    // Check if message includes 'mood' words
    if (str.includes(":happy")) {
      // To all connected clients
      io.emit("chat", {
        userMessage: data.userMessage,
        userName: data.userName,
        moodSet: true,
        mood: getGif("happy", nr),
      });
    } else if (str.includes(":motivated")) {
      // To all connected clients
      io.emit("chat", {
        userMessage: data.userMessage,
        userName: data.userName,
        moodSet: true,
        mood: getGif("motivated", nr),
      });
    } else if (str.includes(":tired")) {
      // To all connected clients
      io.emit("chat", {
        userMessage: data.userMessage,
        userName: data.userName,
        moodSet: true,
        mood: getGif("tired", nr),
      });
    } else if (str.includes(":frustrated")) {
      // To all connected clients
      io.emit("chat", {
        userMessage: data.userMessage,
        userName: data.userName,
        moodSet: true,
        mood: getGif("frustrated", nr),
      });
    } else {
      // To all connected clients
      io.emit("chat", data);
    }

    // console.log("chat: ", data);
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

// Listen on this port
httpServer.listen(port, () => {
  console.log(`Open page @ http://localhost:${port}`);
});
