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
const { on } = require("events");

const port = process.env.PORT || 2021;
const api_key = process.env.API_KEY;

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

  // Listen for join event
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

  socket.on("quiz content", (gameCONTENT) => {
    console.log("GameCONTENT:", gameCONTENT.quizContent);
    console.log("User id:", gameCONTENT.userId);

    console.log("ROOM:", roomDB);

    let userIn = roomDB.filter((user) => {
      if (gameCONTENT.userId == user.userId) {
        return user;
      } else {
        return false;
      }
    });

    console.log("USER OBJECT:", userIn);
    console.log("USERNAME:", userIn[0].username);

    if (userIn[0].username.length > 0) {
      let usrRoom = userIn[0].room;
      let usrId = userIn[0].userId;
      let usrName = userIn[0].username;

      console.log("Room found 1:", usrRoom);
      socket.join(usrRoom);

      // 1. --------------------------

      // is gameStatus database leeg?
      //  dan ben je de eerste speler
      /* vul dan jouw:
      
      , - room(ID), 
      - ronde,
      - naam
      - score 
      
      in een gamestatus set
      
      */
      // 2. --------------------------

      //  als database niet leeg is
      // check aan de hand van room name
      // of er een gamestatus set beschikbaar is dmv van filter & .length
      // nee? herhaal stap: 1.
      // ja? Je bent player 2.
      // voer stap 1 uit voor player 2:
      /* vul dan jouw:
     
     , - room(ID), 
     - ronde,
     - naam
     - score 
     
     in een gamestatus set
     
     */

      let finalStatus = [];

      if (gameStatus.length < 1) {
        console.log("GAME STATUS DB LEEG:", gameStatus.length);
        gameStatus.push({
          room: usrRoom,
          round: 1,
          playerName1: usrName,
          player1Score: 0,
          playerName2: "",
          player2Score: 0,
        });

        finalStatus = gameStatus.map((status) => {
          if (status.room == usrRoom) {
            return status;
          }
        });
      } else {
        // check if user room exist in db
        let theRoom = gameStatus.filter((room) => {
          if (usrRoom == room.room) {
            return room;
          }
        });

        if (theRoom.length < 1) {
          console.log("GAME STATUS ROOM LEEG:", gameStatus.length);
          console.log("GAME ROOM STATUS OBJECT:", gameStatus);
          gameStatus.push({
            room: usrRoom,
            round: 1,
            playerName1: usrName,
            player1Score: 0,
            playerName2: "",
            player2Score: 0,
          });

          finalStatus = gameStatus.map((status) => {
            if (status.room == usrRoom) {
              return status;
            }
          });
        } else {
          console.log("GAME STATUS ROOM BESTAAT:", theRoom.length);
          console.log("GAME ROOM STATUS OBJECT:", theRoom);

          // gameStatus.forEach((status) => {
          //   if (status.room == usrRoom) {
          //     status.playerName2 = usrName;
          //   }
          // });

          finalStatus = gameStatus.map((status) => {
            if (status.room == usrRoom) {
              status.playerName2 = usrName;
              return status;
            }
          });

          console.log("FINAL GAME ROOM STATUS:", finalStatus);
        }
      }
      console.log("ERBUITEN? :", finalStatus);

      console.log("FINAL GAME DB STATUS:", gameStatus);

      // 3. --------------------------

      // Haal aan de hand van de room de gamestatus van
      // speler 1 & 2 naarvoren:
      /*

      , - room(ID), 
      - ronde,
      - playerNaam1
      - playerScore1 
      - playerNaam2
      - playerScore2 
      
      */

      let question = "";
      let correct_answer = "";
      let answers = [];

      // console.log("DB INHOUD:", triviaDB);
      if (gameCONTENT.quizContent == "start" && triviaDB.length > 0) {
        question = htmlContent.decode(triviaDB[0].question);
        correct_answer = triviaDB[0].correct_answer;
        console.log("correct_answers DB:", correct_answer);
        answers = triviaDB[0].incorrect_answers;
        console.log("incorrect_answers DB:", answers);
        answers.pop();
        console.log("After pop:", answers);
        answers.push(triviaDB[0].correct_answer);
        console.log("With correct_answer:", answers);

        console.log("Emit CONTENT NAAR ROOM");
        io.to(usrRoom).emit("quiz content", {
          round: finalStatus[0].round,
          question: question,
          answers: answers,
          username: usrName,
          playerNames: [finalStatus[0].playerName1, finalStatus[0].playerName2],
          playerScore: [
            finalStatus[0].player1Score,
            finalStatus[0].player2Score,
          ],
        });

        socket.emit("profile", {
          username: usrName,
        });
      }
    }
  });

  socket.on("send answer", (answers) => {
    console.log("User:", answers.username);
    console.log("Antwoord:", answers.answer);
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

http.listen(port, () => {
  console.log(`Open page @ http://localhost:${port}`);
});
