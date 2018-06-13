"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {
        type: String,
        required: 'enter user name'
    },
    email: {
        type: String,
        required: 'enter email address'
    },
    phoneNo: {
        type: String
    },
    group: {},
    active: {
        type: Boolean,
        required: 'status required',
        default: true
    }
});
module.exports = mongoose.model('Users', userSchema);
