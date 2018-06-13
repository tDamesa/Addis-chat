"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var usersController_1 = require("../controllers/usersController");
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
        this.userController = new usersController_1.UserController();
    }
    UserRoutes.prototype.init = function (app) {
        app.route('/api/users').post(this.userController.addUser);
        app.route('/api/users/search/:term').get(this.userController.searchUser);
        app.route('/api/users/search').get(this.userController.searchUser);
        app
            .route('/api/users/:email')
            .put(this.userController.updateUser)
            .get(this.userController.getUser);
        app.route('/api/users').post(this.userController.getUser);
    };
    return UserRoutes;
}());
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=userRoutes.js.map