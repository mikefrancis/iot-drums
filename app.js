var express    = require('express');
var app        = express();
var server     = require('http').Server(app);
var io         = require('socket.io')(server);
var DashButton = require('dash-button');
var dotenv     = require('dotenv').config();

var buttonOn1     = new DashButton(process.env.DASH_ON_1_MAC_ADDRESS);
var buttonOn2     = new DashButton(process.env.DASH_ON_2_MAC_ADDRESS);
var buttonAndrex1 = new DashButton(process.env.DASH_ANDREX_1_MAC_ADDRESS);
var buttonAndrex2 = new DashButton(process.env.DASH_ANDREX_2_MAC_ADDRESS);
var buttonAriel1  = new DashButton(process.env.DASH_ARIEL_1_MAC_ADDRESS);
var buttonAriel2  = new DashButton(process.env.DASH_ARIEL_2_MAC_ADDRESS);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/static'));

console.log('Waiting for connection...');

io.on('connection', function (socket) {

  console.log('Listening for button presses...');

  buttonOn1.addListener(function () {
      console.log('Play kick');

      socket.emit('sample', 'kick');
  });

  buttonOn2.addListener(function () {
      console.log('Play snare');

      socket.emit('sample', 'snare');
  });

  buttonAndrex1.addListener(function () {
      console.log('Play hithat');

      socket.emit('sample', 'hihat');
  });

  buttonAndrex2.addListener(function () {
      console.log('Play tom');

      socket.emit('sample', 'tom');
  });

  buttonAriel1.addListener(function () {
      console.log('Play ride');

      socket.emit('sample', 'ride');
  });

  buttonAriel2.addListener(function () {
      console.log('Play boom');

      socket.emit('sample', 'boom');
  });

});
