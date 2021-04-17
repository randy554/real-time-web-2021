// Make socket connection to server
let socket = io();

// Setup access to form elements
let messages = document.querySelector("#messages"),
  userName = document.querySelector("#name"),
  userMessage = document.querySelector("#userMessage"),
  buttonA = document.querySelector("#sendA"),
  buttonB = document.querySelector("#sendB"),
  buttonC = document.querySelector("#sendC");

// On button click send to server
buttonA.addEventListener("click", () => {
  console.log(`Button A: ${buttonA.innerText} - ID: ${socket.id}`);
  socket.emit("send answer", {
    id: socket.id,
    answer: buttonA.innerText,
  });
});

// On button click send to server
buttonB.addEventListener("click", () => {
  console.log(`Button B: ${buttonB.innerText} - ID: ${socket.id}`);
  socket.emit("send answer", {
    id: socket.id,
    answer: buttonB.innerText,
  });
});

// On button click send to server
buttonC.addEventListener("click", () => {
  console.log(`Button C: ${buttonC.innerText} - ID: ${socket.id}`);
  socket.emit("send answer", {
    id: socket.id,
    answer: buttonC.innerText,
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
  // messages.innerHTML +=
  //   "<li class='server'><strong> SERVER: " + "</strong> " + message + "</li>";

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

console.log(`Socket ID: ${socket.id}`);
