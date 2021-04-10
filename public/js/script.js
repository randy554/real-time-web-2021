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
    socket.emit("chat", {
      userMessage: userMessage.value,
      userName: userName.value,
      moodSet: false,
      mood: false,
    });

    // Empty message after submit
    userMessage.value = "";
  } else {
    // If username or message is empty then notify user via chat
    socket.emit("no input", "No name or message");
    console.log(
      "%c No name or message input filled!",
      "color: black; background-color: orange; font-weight: bold;"
    );
  }
});

// Listen from server
socket.on("chat", (data) => {
  // messages.innerHTML += "<li><strong>" + data.userName + "</strong>: " + data.userMessage + "</li>";

  if (data.moodSet) {
    messages.innerHTML +=
      "<li><strong>" +
      data.userName +
      "</strong>: " +
      "<img class='moodGif' src='" +
      data.mood +
      "' alt='happy person'> " +
      data.userMessage +
      "</li>";
  } else {
    messages.innerHTML +=
      "<li><strong>" +
      data.userName +
      "</strong>: " +
      data.userMessage +
      "</li>";
  }
});

// Listen for server message about no input
socket.on("no input", (message) => {
  messages.innerHTML +=
    "<li class='server'><strong> SERVER: " + "</strong> " + message + "</li>";
});

// Listen for server message about a user leaving the chat/being disconnected
socket.on("server message", (message) => {
  messages.innerHTML +=
    "<li class='server'><strong> SERVER: " + "</strong> " + message + "</li>";

  console.log(
    `%c Server: ${message}`,
    "color: white; background-color: blue; font-weight: bold;"
  );
});
