const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let selected = [];

app.use(express.static('public'));

server.listen(3000, () => {
  console.log('listening on port 3000');
});

io.on('connection', (socket) => {
  socket.emit('update', selected);
  
  socket.on('select', (selection) => {
    selected = selected
      .filter(item =>
        item.index !== selection.index);

    selected = [...selected, selection];
    io.emit('update', selected);
  });
});