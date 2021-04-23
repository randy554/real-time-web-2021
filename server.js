require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const htmlContent = require("html-entities");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const fetch = require("node-fetch");

// let store = new MemStore({ checkPeriod: 3600000 });
// dotenv.config();
// const app = express();
const port = process.env.PORT || 2021;
const api_key = process.env.API_KEY;

// connect express to http port
// const httpServer = createServer(app);
// const io = new Server(httpServer);
let store = new MemoryStore({ checkPeriod: 3600000 });

app.use(
  session({
    cookie: { maxAge: 3600000 },
    store: store,
    resave: false,
    saveUninitialized: true,
    secret: "somesupersmartsecretstring",
  })
);
app.use(express.static(path.resolve("public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // console.log("RDMemStore:", store);
  next();
});

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
    console.log(room_count);
    if (room_count.length == 0) {
      console.log("Enter room 1st");

      // Join user to room
      socket.join(data.room);
      // Announce arrival of new user to other user in room
      // socket
      //   .to(data.room)
      //   .emit("enter room", `${data.userName} is binnen in: ${data.room}`);
      // Get & store trivia data
      getTriviaData().then(() => {
        socket.emit("enter room", {
          redirect: true,
          message: "",
        });
      });
      // Store user data
      roomDB.push({
        room: data.room,
        userId: data.id,
        username: data.userName,
      });
    } else if (room_count.length == 1) {
      console.log("Join room 2nd");

      // Join user to room
      socket.join(data.room);
      // Announce arrival of new user to other user in room
      // socket
      //   .to(data.room)
      //   .emit("enter room", `${data.userName} is binnen in: ${data.room}`);
      socket.emit("enter room", {
        redirect: true,
        message: "",
      });
      // Store user data
      roomDB.push({
        room: data.room,
        userId: data.id,
        username: data.userName,
      });
    } else {
      console.log(`No space in room: ${data.room}. Create/join other room`);
      socket.emit("enter room", {
        redirect: false,
        message: `No space in room: ${data.room}. Create/join a other room`,
      });
    }

    console.log("DB status:", roomDB);
  });

  socket.on("quiz content", (gameStatus) => {
    console.log("Gamestatus:", gameStatus.quizContent);
    console.log("User id:", gameStatus.userId);

    let user = roomDB.map((user) => {
      if (gameStatus.userId == user.userId) {
        return user;
      } else {
        return false;
      }
    });

    // console.log("Wat zit er in ROOM:", user);

    let usrRoom = user[0].room;
    let usrId = user[0].userId;
    let usrName = user[0].username;

    console.log("Room found 1:", usrRoom);
    socket.join(usrRoom);

    let question = "";
    let correct_answer = "";
    let answers = [];

    console.log("DB INHOUD:", triviaDB);
    if (gameStatus.quizContent == "start" && triviaDB.length > 0) {
      question = htmlContent.decode(triviaDB[0].question);
      correct_answer = triviaDB[0].correct_answer;
      console.log("correct_answers DB:", correct_answer);
      answers = triviaDB[0].incorrect_answers;
      console.log("incorrect_answers DB:", answers);
      answers.pop();
      console.log("After pop:", answers);
      answers.push(triviaDB[0].correct_answer);
      console.log("With correct_answer:", answers);

      io.to(usrRoom).emit("quiz content", {
        round: 1,
        question: question,
        answers: answers,
        username: usrName,
      });
    }
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
  return getData(apiEndpoint).then((results) => {
    storeTrivia(results);
    console.log("1E DB: ", triviaDB);
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
  console.log("sess id server:", req.sessionID);
  req.session.name = "blowfish";
  res.render("index", { id: req.sessionID });
});

app.get("/play", (req, res) => {
  console.log("sess id server /play:", req.sessionID);

  let loggedIn = roomDB.filter((user) => {
    if (user.userId == req.sessionID) {
      return user.userId;
    }
  });

  if (loggedIn.length > 0) {
    res.render("play", { id: req.sessionID });
  } else {
    res.render("index", { id: req.sessionID });
  }
});
app.post("/test", (req, res) => {
  req.session.something = "yes";
  console.log("SESSION_ID:", req.sessionID);
  console.log("HELE SESSION:", req.session);

  res.sendStatus(200);
});

// Listen on this port
// httpServer.listen(port, () => {
//   console.log(`Open page @ http://localhost:${port}`);
// });
http.listen(port, () => {
  console.log(`Open page @ http://localhost:${port}`);
});

async function getUser(params) {}
