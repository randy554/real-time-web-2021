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

  // Listen for a user has disconnected event
  socket.on("disconnect", () => {
    console.log(" a user has disconnected");
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

// Listen on this port
httpServer.listen(port, () => {
  console.log(`Open page @ http://localhost:${port}`);
});
