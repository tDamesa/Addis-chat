import { Express } from 'express-serve-static-core';
import { MessageController } from '../controllers/messagesController';

export class MessageRoutes {
  private messageController: MessageController = new MessageController();
  constructor() {}
  init(app: Express) {
    app.route('/api/messages').post(this.messageController.addMessage);
    app.route('/api/messages/:email').get(this.messageController.getMessages);
  }
}
