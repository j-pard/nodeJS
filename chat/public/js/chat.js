const BTN = document.getElementById("sendBtn");
            const CHATBOX = document.getElementById("chatbox");

            let socket = io.connect('http://localhost:5000');

            let pseudo = prompt("What's your name, User ?");
            socket.emit('newPseudo', pseudo);

            BTN.addEventListener("click", (event) => {
                  let message = document.getElementById("messageToSend").value;
                  socket.emit('messageToServer', message);
                  event.preventDefault();
            });

            socket.on('messageToAll', (message) => {
                  console.log(message);
            });

            /*<script>
            const BTN = document.getElementById("sendBtn");
            const CHATBOX = document.getElementById("chatbox");

            let socket = io.connect('http://localhost:5000');

            let pseudo = prompt("What's your name, User ?");
            socket.emit('newPseudo', pseudo);

            BTN.addEventListener("click", (event) => {
                  let message = document.getElementById("messageToSend").value;
                  socket.emit('messageToServer', message);
                  event.preventDefault();
            });

            socket.on('messageToAll', (message) => {
                  console.log(message);
            });

      </script>*/