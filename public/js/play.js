// Make socket connection to server
let socket = io();

// Setup access to form elements
let messages = document.querySelector("#messages"),
  userName = document.querySelector("#name"),
  userMessage = document.querySelector("#userMessage"),
  buttonA = document.querySelector("#sendA"),
  buttonB = document.querySelector("#sendB"),
  buttonC = document.querySelector("#sendC");

let playerNm = "";
let round = "";
let room = "";

// SessionId element
sessEl = document.querySelector("#sessid").value;
let trimSess = sessEl.trim();

// Round element
elLeadB = document.querySelector("#leaderboard");
let elRound = document.querySelector("#round");

// title element
let title = document.querySelector(".title");

// Answer options
let answerOptions = document.querySelector("#question_options");

// Get quiz content
socket.emit("quiz content", { quizContent: "start", userId: trimSess });

socket.on("quiz content", (quiz) => {
  console.log("Question:", quiz.question);
  console.log("User:", quiz.username);
  console.log("Answers:", quiz.answers);
  // set variables
  playerNm = quiz.username;
  round = quiz.round;
  console.log("SET USERNAME:", playerNm);
  console.log("SET ROUND:", round);

  // show player names
  console.log("Username waarde:", elLeadB.value);
  // elLeadB.insertAdjacentHTML("beforeend", `<p>${quiz.username}</p>`);

  // If leaderboard already has content
  // then erase old content before adding new
  // else just add the content
  if (elLeadB.innerHTML != "") {
    elLeadB.innerHTML = "";

    quiz.playerNames.forEach((player, i) => {
      console.log("players:", player);
      if (player != "") {
        elLeadB.insertAdjacentHTML(
          "beforeend",
          `<p>${player} ${quiz.playerScore[i]}</p>`
        );
      }
    });
  } else {
    quiz.playerNames.forEach((player, i) => {
      console.log("players:", player);
      if (player != "") {
        elLeadB.insertAdjacentHTML(
          "beforeend",
          `<p>${player} ${quiz.playerScore[i]}</p>`
        );
      }
    });
  }

  // Add/update round data to the round section
  elRound.innerHTML = `<p>Round: ${quiz.round}</p>`;
  // Add or update title on page
  title.innerText = quiz.question;

  // If answer options section already has content
  // then erase old content before adding new
  // else just add the content
  // Prefix answer options with A, B, or C
  if (answerOptions.innerHTML != "") {
    console.log("answer options 1:", answerOptions.innerHTML);
    answerOptions.innerHTML = "";
    quiz.answers.forEach((element, i) => {
      if (i === 0) {
        answerOptions.insertAdjacentHTML(
          "beforeend",
          `<li><strong>A.</strong> ${element}</li>`
        );
      } else if (i === 1) {
        answerOptions.insertAdjacentHTML(
          "beforeend",
          `<li><strong>B.</strong> ${element}</li>`
        );
      } else if (i === 2) {
        answerOptions.insertAdjacentHTML(
          "beforeend",
          `<li><strong>C.</strong> ${element}</li>`
        );
      }
    });
  } else {
    console.log("answer options 2:", answerOptions.innerHTML);
    quiz.answers.forEach((element, i) => {
      if (i === 0) {
        answerOptions.insertAdjacentHTML(
          "beforeend",
          `<li><strong>A.</strong> ${element}</li>`
        );
      } else if (i === 1) {
        answerOptions.insertAdjacentHTML(
          "beforeend",
          `<li><strong>B.</strong> ${element}</li>`
        );
      } else if (i === 2) {
        answerOptions.insertAdjacentHTML(
          "beforeend",
          `<li><strong>C.</strong> ${element}</li>`
        );
      }
    });
  }

  buttonA.value = quiz.answers[0];
  buttonB.value = quiz.answers[1];
  buttonC.value = quiz.answers[2];
});

// On button click send to server
buttonA.addEventListener("click", () => {
  console.log(
    `Button A: ${buttonA.value} - Round: ${round} - Name: ${playerNm}`
  );
  socket.emit("send answer", {
    userId: trimSess,
    username: playerNm,
    round: round,
    answer: buttonA.value,
  });
});

// On button click send to server
buttonB.addEventListener("click", () => {
  console.log(
    `Button B: ${buttonB.value} - Round: ${round} - Name: ${playerNm}`
  );
  socket.emit("send answer", {
    userId: trimSess,
    username: playerNm,
    round: round,
    answer: buttonB.value,
  });
});

// On button click send to server
buttonC.addEventListener("click", () => {
  console.log(
    `Button C: ${buttonC.value} - Round: ${round} - Name: ${playerNm}`
  );
  socket.emit("send answer", {
    userId: trimSess,
    username: playerNm,
    round: round,
    answer: buttonC.value,
  });
});

// Present the results
socket.on("quiz result", (result) => {
  alert(`After: ${result.round} rounds
  WINNER: ${result.won}
  ========= POINTS =========
  ${result.playerNames[0]}:  ${result.playerScore[0]}
  ${result.playerNames[1]}:  ${result.playerScore[1]}`);

  // socket.emit("end game", {
  //   room: result.room,
  // });

  endgame(result.room);

  window.location = "/";
});

// Listen from server
socket.on("join room", (data) => {
  console.log(
    `%c Server: Hi ${data.userName}, u have joined room: ${data.room}`,
    "color: white; background-color: blue; font-weight: bold;"
  );
});

// Listen for server message about a user leaving the chat/being disconnected
socket.on("server message", (message) => {
  console.log(
    `%c Server: ${message}`,
    "color: white; background-color: blue; font-weight: bold;"
  );
});

socket.on("enter room", (message) => {
  messages.innerText += message;

  console.log(
    `%c Server: ${message}`,
    "color: white; background-color: red; font-weight: bold;"
  );
});

function endgame(userRoom) {
  socket.emit("end game", {
    room: userRoom,
  });
}
