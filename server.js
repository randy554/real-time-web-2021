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
// const api_key = process.env.API_KEY;
let firstAnswer = 1;
let finalStatus = [];

let question = "";
let correct_answer = "";
let answers = [];

let usrRoom = "";
let usrId = "";
let usrName = "";

let nextContentKey = "";
let correctAnswer = "";

// Store room data
let roomDB = [];
// Store game data
let gameStatus = [];
// Store trivia data
let triviaDB = [];

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

    // Is room name already in DB
    let room_count = roomDB.filter((game) => {
      if (game.room == data.room) {
        return game.room;
      }
    });

    console.log(`${data.room} has: ${room_count} in roomDB`);
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

    // Find user in game room with sessionID
    let userIn = roomDB.filter((user) => {
      if (gameCONTENT.userId == user.userId) {
        return user;
      } else {
        return false;
      }
    });

    console.log("USER OBJECT:", userIn);
    console.log("USERNAME:", userIn[0].username);

    // If username in room exist
    // assign db values to variables
    if (userIn[0].username.length > 0) {
      usrRoom = userIn[0].room;
      usrId = userIn[0].userId;
      usrName = userIn[0].username;
      // let usrRoom = userIn[0].room;
      // let usrId = userIn[0].userId;
      // let usrName = userIn[0].username;

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
      // of er een gamestatus set beschikbaar is dmv van filter & .length van de room
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

      // let finalStatus = [];

      // If gameStatus db is empty
      // assign player 1 data to Status set
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
        // Else gameStatus set exist
        // Use room name to get right set
        let theRoom = gameStatus.filter((room) => {
          if (usrRoom == room.room) {
            return room;
          }
        });

        if (theRoom.length < 1) {
          console.log(
            "======================== WATTTTTTTT ========================"
          );
          console.log("GAME STATUS SET LEEG:", gameStatus.length);
          console.log("GAME ROOM STATUS OBJECT:", gameStatus);
          console.log(
            "======================== WATTTTTTTT ========================"
          );
          gameStatus.push({
            room: usrRoom,
            round: 1,
            playerName1: usrName,
            player1Score: 0,
            playerName2: "",
            player2Score: 0,
          });

          // Assign current gameStatus object set to variable
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

          // Assign player 2 username
          // & return gameStatus object
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

      // let question = "";
      // let correct_answer = "";
      // let answers = [];

      // console.log("DB INHOUD:", triviaDB);
      if (gameCONTENT.quizContent == "start" && triviaDB.length > 0) {
        question = htmlContent.decode(triviaDB[0].question);
        correct_answer = triviaDB[0].correct_answer;
        console.log("correct_answers DB:", correct_answer);
        answers = triviaDB[0].incorrect_answers;
        console.log("incorrect_answers DB:", answers);
        answers.pop();

        console.log("After pop", answers);
        answers.push(triviaDB[0].correct_answer);
        answers.sort();
        console.log("With correct_answer & sort:", answers);

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
          round: finalStatus[0].round,
        });
      }
    }
  });

  function nextQuestion(contentKey) {
    console.log(
      "NEXT =========================================================="
    );
    console.log("DE KEY", contentKey);
    // Get the incorrect answers from TriviaDB
    answers = triviaDB[contentKey].incorrect_answers;
    // Remove the last element of the list
    answers.pop();
    // Add correct answer to the list
    answers.push(triviaDB[contentKey].correct_answer);
    // Sort list alphabetically in ascending order
    answers.sort();

    console.log("ROUND IN NEXT:", finalStatus[0].round);
    // console.log("DE KEY", contentKey);
    // activate fist answer variable
    firstAnswer = 1;

    // send next content to
    io.to(usrRoom).emit("quiz content", {
      round: finalStatus[0].round,
      question: htmlContent.decode(triviaDB[contentKey].question),
      answers: answers,
      username: usrName,
      playerNames: [finalStatus[0].playerName1, finalStatus[0].playerName2],
      playerScore: [finalStatus[0].player1Score, finalStatus[0].player2Score],
    });
  }

  // send end game results to the players
  function showResults() {
    let winner = "";

    // Determine who is the winner
    if (finalStatus[0].player1Score > finalStatus[0].player2Score) {
      winner = finalStatus[0].playerNames;
    } else {
      winner = finalStatus[0].playerName2;
    }

    // send the data to the room
    io.to(usrRoom).emit("quiz result", {
      round: finalStatus[0].round,
      won: winner,
      playerNames: [finalStatus[0].playerName1, finalStatus[0].playerName2],
      playerScore: [finalStatus[0].player1Score, finalStatus[0].player2Score],
    });
  }

  socket.on("send answer", (answers) => {
    // console.log("User:", answers.username);
    console.log(
      "IN SEND ANSWER ========================================================== round:",
      finalStatus[0].round
    );
    console.log("Round:", finalStatus[0].round);

    // Determine content key based on current round number
    if (answers.round === 1) {
      nextContentKey = finalStatus[0].round;
    } else {
      nextContentKey = finalStatus[0].round - 1;
    }

    console.log("NEXT CONTENT KEY:", nextContentKey);

    // let contentKey = answers.round++;

    // For the first 4 rounds of the game
    if (finalStatus[0].round < 5) {
      // Get the correct answer from Trivia DB based on round nr
      let getCurrentAnswerNr = finalStatus[0].round - 1;
      console.log("Answer nr:", getCurrentAnswerNr);
      correctAnswer = triviaDB[getCurrentAnswerNr].correct_answer;

      // only accept the first answer from any player
      if (firstAnswer) {
        // If given answer is correct
        if (answers.answer == correctAnswer) {
          console.log("Right answer!");
          // disable fist answer variable
          firstAnswer = 0;
          // If the player is player 1
          if (answers.username == finalStatus[0].playerName1) {
            // Add a point
            finalStatus[0].player1Score++;
            console.log("Player 1:", finalStatus);
            finalStatus[0].round++;
            console.log("ROUND IN RECEIVE ANS:", finalStatus[0].round);
            nextQuestion(nextContentKey);
          } else {
            // Else player is player 2 & add a point
            finalStatus[0].player2Score++;
            console.log("Player 2:", finalStatus);
            finalStatus[0].round++;
            console.log("ROUND IN RECEIVE ANS:", finalStatus[0].round);
            nextQuestion(nextContentKey);
          }
        } else {
          // If given answer is wrong
          console.log("Wrong answer!");
          firstAnswer = 0;
          // If the player is player 1
          if (answers.username == finalStatus[0].playerName1) {
            // Add a point to player 2
            finalStatus[0].player2Score++;
            console.log("Player 1:", finalStatus);
            finalStatus[0].round++;
            console.log("ROUND IN RECEIVE ANS:", finalStatus[0].round);
            nextQuestion(nextContentKey);
          } else {
            // Else player is player 2 & add a point to player 1
            finalStatus[0].player1Score++;
            console.log("Player 2:", finalStatus);
            finalStatus[0].round++;
            console.log("ROUND IN RECEIVE ANS:", finalStatus[0].round);
            nextQuestion(nextContentKey);
          }
        }
      }
    } else {
      console.log(
        "FINISH =========================================================="
      );

      // Get the correct answer from Trivia DB based on round nr
      correctAnswer = triviaDB[4].correct_answer;

      if (answers.answer == correctAnswer) {
        // If given answer is correct
        console.log("Right answer!");
        firstAnswer = 0;
        // If the player is player 1
        if (answers.username == finalStatus[0].playerName1) {
          // Add a point
          finalStatus[0].player1Score++;
          console.log("Player 1:", finalStatus);
          // finalStatus[0].round++;
          console.log("ROUND IN RECEIVE ANS:", finalStatus[0].round);
          showResults();
        } else {
          // Else player is player 2 & add a point
          finalStatus[0].player2Score++;
          console.log("Player 2:", finalStatus);
          // finalStatus[0].round++;
          console.log("ROUND IN RECEIVE ANS:", finalStatus[0].round);
          showResults();
        }
      } else {
        // If answer is wrong
        console.log("Wrong answer!");
        firstAnswer = 0;
        // If the player is player 1
        if (answers.username == finalStatus[0].playerName1) {
          // Add a point to player 2
          finalStatus[0].player2Score++;
          console.log("Player 1:", finalStatus);
          // finalStatus[0].round++;
          console.log("ROUND IN RECEIVE ANS:", finalStatus[0].round);
          showResults();
        } else {
          // Else player is player 2 & add a point to player 1
          finalStatus[0].player1Score++;
          console.log("Player 2:", finalStatus);
          // finalStatus[0].round++;
          console.log("ROUND IN RECEIVE ANS:", finalStatus[0].round);
          showResults();
        }
      }
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

// Store trivia data to DB
let storeTrivia = (triviaData) => {
  return (triviaDB = triviaData);
};

app.get("/", (req, res) => {
  console.log("sess id server:", req.sessionID);
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
