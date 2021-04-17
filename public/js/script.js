// Make socket connection to server
let socket = io();

// Setup access to form elements
let messages = document.querySelector("#messages"),
  userName = document.querySelector("#name"),
  userMessage = document.querySelector("#userMessage"),
  button = document.querySelector("#send");

// On button click send to server
button.addEventListener("click", () => {
  // If username & message fields are filled then send to chat
  if (userName.value !== "" && userMessage.value !== "") {
    socket.emit("join room", {
      id: socket.id,
      userName: userName.value,
      room: userMessage.value,
    });

    // Empty message after submit
    messages.innerText = "";
  } else {
    // If username or message is empty then notify user via chat
    // socket.emit("no input", "Fill in the username and room field");
    // socket.emit("no input", "No name or message");
    console.log(
      "%c No username or room input filled! - ID: " + socket.id,
      "color: black; background-color: orange; font-weight: bold;"
    );

    messages.innerText +=
      "Fill in the username and room field before submitting";
  }
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
