"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var MessageController = /** @class */ (function () {
    function MessageController() {
        this.messageModel = mongoose.model('Messages');
    }
    MessageController.prototype.addMessage = function (req, res) {
        var message = req.body;
        message.sender = req.user.email;
        var messageModel = new this.messageModel(req.body);
        messageModel.save(function (err, message) {
            if (err)
                res.send(err);
            res.json(message);
        });
    };
    MessageController.prototype.getMessage = function (req, res) {
        this.messageModel
            .find({
            $or: [
                {
                    $and: [
                        { sender: { $regex: "^" + req.params.term } },
                        { reciever: { $regex: "^" + req.user.email } }
                    ]
                },
                {
                    $and: [
                        { sender: { $regex: "^" + req.user.email } },
                        { reciever: { $regex: "^" + req.params.term } }
                    ]
                }
            ]
        })
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
