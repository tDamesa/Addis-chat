import { Express } from 'express-serve-static-core';
import { UserController } from '../controllers/usersController';

export class UserRoutes {
  private userController: UserController = new UserController();
  constructor() {}
  init(app: Express) {
    app.route('/api/users').post(this.userController.addUser);
    app.route('/api/users/search/:term').get(this.userController.searchUser);
    app.route('/api/users/search').get(this.userController.searchUser);
    app
      .route('/api/users/:email')
      .put(this.userController.updateUser)
      .get(this.userController.getUser);
    app.route('/api/users').post(this.userController.getUser);
  }
}
