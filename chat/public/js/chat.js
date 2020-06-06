const BTN = document.getElementById("sendBtn");
const CHATBOX = document.getElementById("chatbox");
const MSGBOX = document.getElementById("messageToSend");
const MESSENGER = document.getElementById("messenger");

let socket = io.connect('http://localhost:5000');

let pseudo = prompt("What's your name, User ?");
socket.emit('newPseudo', pseudo);

BTN.addEventListener("click", (event) => {
      let message = MSGBOX.value.trim();
      if(message && message != "" ) {
            socket.emit('messageToServer', message);
            MSGBOX.value = "";
            MSGBOX.placeholder = "Write your message ..."
      }
      else {
            MSGBOX.value = "";
            MSGBOX.placeholder = "Invalid message !"
      }
      event.preventDefault();
});

socket.on('messageToAll', (message) => {
      // Full message
      let li = document.createElement("li");
      li.classList.add("full-message");

      // Author
      let authorZone = document.createElement("div");
      authorZone.innerHTML = message.author;
      authorZone.classList.add("author");
      li.appendChild(authorZone);

      // Text
      let messageZone = document.createElement("div");
      messageZone.innerHTML = message.text;
      messageZone.classList.add("text");
      li.appendChild(messageZone);

      // Style 
      if(message.author == "You") {
            authorZone.classList.add("you");
            li.classList.add("text-right");
      }
      else {
            li.classList.add("text-left");
      }

      // Including
      MESSENGER.appendChild(li);

      // Scroll down
      let allMsg = document.querySelectorAll("#messenger li");
      let lastMsg = allMsg[allMsg.length-1];
      lastMsg.scrollIntoView();
});