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
      console.log(message);
      let li = document.createElement("li");
      let authorZone = document.createElement("div");
      authorZone.innerHTML = message.author;
      li.appendChild(authorZone);
      let messageZone = document.createElement("div");
      messageZone.innerHTML = message.text;
      li.appendChild(messageZone);
      MESSENGER.appendChild(li);
});