import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const port = process.env.PORT || 2021;

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

  // Make username available outside .on('chat')
  let newUserName = "";

  // Listen for chat message event
  socket.on("chat", (data) => {
    // Set the new username;
    newUserName = data.userName;

    // Create variable for .includes()
    let str = data.userMessage;

    // Check if message includes 'mood' words
    if (str.includes(":happy")) {
      // To all connected clients
      io.emit("chat", {
        userMessage: data.userMessage,
        userName: data.userName,
        moodSet: true,
        mood: getGif(),
      });
    } else if (str.includes(":motivated")) {
      // To all connected clients
      io.emit("chat", {
        userMessage: data.userMessage,
        userName: data.userName,
        moodSet: true,
        mood: getGif(),
      });
    } else if (str.includes(":tired")) {
      // To all connected clients
      io.emit("chat", {
        userMessage: data.userMessage,
        userName: data.userName,
        moodSet: true,
        mood: getGif(),
      });
    } else if (str.includes(":frustrated")) {
      // To all connected clients
      io.emit("chat", {
        userMessage: data.userMessage,
        userName: data.userName,
        moodSet: true,
        mood: getGif(),
      });
    } else {
      // To all connected clients
      io.emit("chat", data);
    }

    console.log("chat: ", data);
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

app.get("/", (req, res) => {
  res.render("index");
});

// Listen on this port
httpServer.listen(port, () => {
  console.log(`Open page @ http://localhost:${port}`);
});
