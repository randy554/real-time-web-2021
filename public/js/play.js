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
  // playerNm = quiz.username;

  // show player names
  console.log("Username waarde:", elLeadB.value);
  // elLeadB.insertAdjacentHTML("beforeend", `<p>${quiz.username}</p>`);

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

  elRound.innerHTML = `<p>Round: ${quiz.round}</p>`;
  title.innerText = quiz.question;

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

socket.on("profile", (userprofile) => {
  playerNm = userprofile.username;
  round = userprofile.round;
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
  console.log(`After: ${result.round} rounds`);
  console.log(`WINNER: ${result.winner}`);
  console.log(`========= POINTS =========`);
  console.log(`${result.playerNames[0]}:  ${result.playerScore[0]}`);
  console.log(`${result.playerNames[1]}:  ${result.playerScore[1]}`);
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
