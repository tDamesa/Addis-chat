"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userRoutes_1 = require("./routes/userRoutes");
var messageRoutes_1 = require("./routes/messageRoutes");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
require('./models/usersModel');
require('./models/messagesModel');
var common_1 = require("./shared/common");
var sockets = require("./shared/sockets");
mongoose.connect('mongodb://admin:admin@ds241699.mlab.com:41699/chat_app');
var app = express();
var port = process.env.port || 3000;
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server, {
    handlePreflightRequest: function (req, res) {
        var headers = {
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Origin': req.headers.origin,
            'Access-Control-Allow-Credentials': true
        };
        res.writeHead(200, headers);
        res.end();
    }
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(common_1.jwtCheck);
new userRoutes_1.UserRoutes().init(app);
new messageRoutes_1.MessageRoutes().init(app);
server.listen(port, function () {
    console.log('listening on http://localhost:' + port);
});
// var socketioJwt = require('socketio-jwt');
// var socketIo=require('socket.io')
// const server= http.createServer(app);
// var sio = socketIo.listen(server);
// sio.set('authorization', socketioJwt.authorize({
//   secret: 'UrIokl3zBxPNswjhwUO4eqwaI1jarW85UJ2mtIf2V5Msu4ZTRPhVIvTD2CqGEUv3',
//   handshake: true
// }));
// sio.sockets
//   .on('connection', function (socket) {
//      console.log(socket.handshake.decoded_token.email, 'connected');
//      //socket.on('event');
//   });
// server.listen(port, function () {
//   console.log('listening on http://localhost:'+ port);
// });
// using middleware
// io.use(
//   jwtAuth.authenticate(
//     {
//       secret:
//         'UrIokl3zBxPNswjhwUO4eqwaI1jarW85UJ2mtIf2V5Msu4ZTRPhVIvTD2CqGEUv3', // required, used to verify the token's signature
//       algorithm: 'RS256' // optional, default to be HS256
//     },
//     function(payload, done) {
//       console.log(payload);
//     }
//   )
// );
// io.on('connection', function(socket) {
//   console.log('Authentication passed!');
//   // now you can access user info through socket.request.user
//   // socket.request.user.logged_in will be set to true if the user was authenticated
//   socket.emit('success', {
//     message: 'success logged in!',
//     user: socket.request.user
//   });
// });
// io.listen(9000);
// io.set('origins', 'http://localhost:3000');
io.use(function (socket, next) {
    common_1.jwtCheck(socket.request, socket.request.res, next);
});
io.sockets.on('connection', function (socket, req, res) {
    sockets[socket.request.user.email] = socket;
    console.log(socket.request.user.email + ' connected');
});
//# sourceMappingURL=server.js.map