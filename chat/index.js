const HTTP = require('http');
const EXPRESS = require('express');
const PORT = 5000;

const APP = EXPRESS();
const SERVER = HTTP.createServer(APP);

// RUNNING
SERVER.listen(PORT, () => {
      console.log("Awesome Chat is listening...");
});

// PUBLIC
APP.use(EXPRESS.static('public'));

// ROUTING
APP.get("/", (req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.sendFile(__dirname + '/views/index.html');
})

.use((req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(404).send("Nothing was found here.");
});



// SOCKET
const IO = require('socket.io').listen(SERVER);
IO.sockets.on('connection', (socket) => {
      console.log("New user has arrived.");

      socket.on('newPseudo', (pseudo) => {
            socket.pseudo = pseudo;
            console.log("Last user is know as " + socket.pseudo);
      });

      socket.on('messageToServer', (message) => {
            console.log(socket.pseudo + " send a message : " + message);
            //socket.emit('messageToAll', "You send : " + message);
            //socket.broadcast.emit('messageToAll', socket.pseudo + " send : " + message);
            socket.emit('messageToAll', {author: "You", text: message});
            socket.broadcast.emit('messageToAll', {author: socket.pseudo, text: message});
      });

});