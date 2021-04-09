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

io.on("connection", (socket) => {
  console.log("a user has connected");
});

app.get("/", (req, res) => {
  res.render("index");
});

httpServer.listen(port, () => {
  console.log(`Open page @ http://localhost:${port}`);
});
