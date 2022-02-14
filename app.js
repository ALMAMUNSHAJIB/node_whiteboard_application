const express = require("express");


const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let connections = [];

io.on("connect", (socket) => {
  connections.push(socket);
  console.log(`${socket.id} has connected`);

  socket.on("propogate", (data) => {
    connections.map((con) => {
      if (con.id !== socket.id) {
        con.emit("onpropogate", data);
      }
    });
  });

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} is disconnected`);
    connections = connections.filter((con) => con.id !== socket.id);
  });
});

app.use(express.static("public"));

server.listen(8080, () => {
    console.log('Server is runing....');
});
