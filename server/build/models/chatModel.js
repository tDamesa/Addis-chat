"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var messageSchema = new Schema({
    message: {
        type: String,
        required: 'message required'
    },
    sender: {
        type: String,
        required: 'sender email enter'
    },
    reciever: {
        type: String,
        required: 'reciever email enter'
    }
});
module.exports = mongoose.model('Messages', messageSchema);
