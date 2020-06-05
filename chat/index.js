const HTTP = require('http');
const EXPRESS = require('express');
const PORT = 5000;

const APP = EXPRESS();
const SERVER = HTTP.createServer(APP);

// RUNNING
SERVER.listen(PORT, () => {
      console.log("Awesome Chat is listening...");
});

// ROUTING

APP.get("/", (req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.render('index.ejs');
})

.use((req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(404).send("Nothing was found here.");
});

// SOCKET

const IO = require('socket.io').listen(SERVER);
IO.sockets.on('connection', (socket) => {
      console.log("New user has arrived.");
      socket.emit('welcome', "Connection etablished, welcome.");
});