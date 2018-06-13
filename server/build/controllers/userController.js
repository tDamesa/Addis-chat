"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var UserController = /** @class */ (function () {
    function UserController() {
        this.userModel = mongoose.model('Users');
    }
    UserController.prototype.addUser = function (req, res) {
        var user = new this.userModel(req.body);
        user.save(function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        this.userModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    };
    UserController.prototype.searchUser = function (req, res) {
        this.userModel
            .find()
            .or([
            { name: { $regex: "^" + req.params.term } },
            { email: { $regex: "^" + req.params.term } },
            { phoneNo: { $regex: "^" + req.params.term } }
        ])
            .limit(10)
            .exec(function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    };
    UserController.prototype.getUser = function (req, res) {
        this.userModel.findOne({ _id: req.params.id }, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    };
    return UserController;
}());
exports.UserController = UserController;
