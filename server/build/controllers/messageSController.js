"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var sockets = require("../shared/sockets");
var MessageController = /** @class */ (function () {
    function MessageController() {
    }
    MessageController.prototype.addMessage = function (req, res) {
        var messagesSchema = mongoose.model('Messages');
        var message = req.body;
        message.sender = req.user.email;
        message.date = new Date();
        var messageModel = new messagesSchema(message);
        messageModel.save(function (err, message) {
            if (err)
                res.send(err);
            var receiver = req.body.receiver;
            console.log(receiver);
            if (sockets[receiver]) {
                sockets[receiver].emit('message', {
                    sender: req.user.email,
                    message: req.body.message
                });
                res.json(message);
            }
            else {
                res.json(null);
            }
            // res.json(message);
        });
    };
    MessageController.prototype.getMessages = function (req, res) {
        console.log(req.params.email + "end " + req.user.email);
        mongoose
            .model('Messages')
            .find({
            $or: [
                {
                    $and: [{ sender: req.params.email }, { receiver: req.user.email }]
                },
                {
                    $and: [{ sender: req.user.email }, { receiver: req.params.email }]
                }
            ]
        }).sort({ date: -1 })
            .limit(10)
            .exec(function (err, message) {
            if (err)
                res.send(err);
            res.json(message);
        });
    };
    return MessageController;
}());
exports.MessageController = MessageController;
//# sourceMappingURL=messagesController.js.map