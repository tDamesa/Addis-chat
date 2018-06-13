"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var messagesSchema = new Schema({
    message: {
        type: String,
        required: 'message required'
    },
    sender: {
        type: String,
        required: 'enter sender email'
    },
    receiver: {
        type: String,
        required: 'enter receiver email'
    },
    date: {
        type: Date,
        required: 'date requrired'
    }
});
module.exports = mongoose.model('Messages', messagesSchema);
//# sourceMappingURL=messagesModel.js.map