// Make socket connection to server
let socket = io();

// Setup access to form elements
let messages = document.querySelector("#messages"),
  userName = document.querySelector("#name"),
  userMessage = document.querySelector("#userMessage"),
  buttonA = document.querySelector("#sendA"),
  buttonB = document.querySelector("#sendB"),
  buttonC = document.querySelector("#sendC");

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

// Get quiz
socket.emit("quiz content", { quizContent: "start", userId: trimSess });

socket.on("quiz content", (quiz) => {
  console.log("Question:", quiz.question);
  console.log("User:", quiz.username);
  console.log("Answers:", quiz.answers);

  elLeadB.innerHTML = `<p>${quiz.username}</p>`;
  elRound.innerHTML = `<p>Round: ${quiz.round}</p>`;
  title.innerText = quiz.question;

  quiz.answers.forEach((element) => {
    answerOptions.insertAdjacentHTML("beforeend", `<li>${element}</li>`);
  });

  buttonA.value = quiz.answers[0];
  buttonB.value = quiz.answers[1];
  buttonC.value = quiz.answers[2];
});

// On button click send to server
buttonA.addEventListener("click", () => {
  console.log(`Button A: ${buttonA.value} - ID: ${trimSess}`);
  socket.emit("send answer", {
    userId: trimSess,
    answer: buttonA.value,
  });
});

// On button click send to server
buttonB.addEventListener("click", () => {
  console.log(`Button B: ${buttonB.value} - ID: ${trimSess}`);
  socket.emit("send answer", {
    userId: trimSess,
    answer: buttonB.value,
  });
});

// On button click send to server
buttonC.addEventListener("click", () => {
  console.log(`Button C: ${buttonC.value} - ID: ${trimSess}`);
  socket.emit("send answer", {
    userId: trimSess,
    answer: buttonC.value,
  });
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
