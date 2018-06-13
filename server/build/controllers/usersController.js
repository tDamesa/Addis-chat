"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.addUser = function (req, res) {
        var usersSchema = mongoose.model('Users');
        var user = new usersSchema(req.body);
        user.save(function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        var user = req.body;
        user.email = req.user.email;
        mongoose
            .model('Users')
            .findOneAndUpdate({ email: req.user.email }, user, { new: true }, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    };
    UserController.prototype.searchUser = function (req, res) {
        var doc = mongoose.model('Users').find();
        if (req.params.term) {
            doc = doc.or([
                { name: { $regex: "^" + req.params.term } },
                { email: { $regex: "^" + req.params.term } },
                { phoneNo: { $regex: "^" + req.params.term } }
            ]);
        }
        doc
            .find({ email: { $ne: req.user.email } })
            .limit(10)
            .exec(function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    };
    UserController.prototype.getUser = function (req, res) {
        mongoose
            .model('Users')
            .findOne({ email: req.params.email }, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=usersController.js.map