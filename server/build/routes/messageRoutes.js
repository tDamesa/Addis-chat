"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var messagesController_1 = require("../controllers/messagesController");
var MessageRoutes = /** @class */ (function () {
    function MessageRoutes() {
        this.messageController = new messagesController_1.MessageController();
    }
    MessageRoutes.prototype.init = function (app) {
        app.route('/api/messages').post(this.messageController.addMessage);
        app.route('/api/messages/:email').get(this.messageController.getMessages);
    };
    return MessageRoutes;
}());
exports.MessageRoutes = MessageRoutes;
//# sourceMappingURL=messageRoutes.js.map