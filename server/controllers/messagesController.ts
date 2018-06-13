import * as mongoose from 'mongoose';
import * as sockets from '../shared/sockets';

export class MessageController {
  addMessage(req, res) {
    const messagesSchema = mongoose.model('Messages');
    const message = req.body;
    message.sender = req.user.email;
    message.date = new Date();
 
    const messageModel = new messagesSchema(message);
    messageModel.save((err, message) => {
      if (err) res.send(err);
      const receiver = req.body.receiver;
      console.log(receiver);
      if (sockets[receiver]) {
        sockets[receiver].emit('message', {
          sender: req.user.email,
          message: req.body.message
        });
        res.json(message);
      } else {
        res.json(null);
      }
      
      // res.json(message);
    });
  }

  getMessages(req, res) {
    console.log(req.params.email +"end "+req.user.email );
    mongoose
      .model('Messages')
      .find({
        $or: [
          {
            $and: [{ sender: req.params.email }, { receiver: req.user.email }]
          },
          {
            $and: [{ sender: req.user.email }, { receiver: req.params.email }]
          }
        ]
      }).sort({date:-1})
      .limit(10)
      .exec((err, message) => {
        if (err) res.send(err);
        res.json(message);
      });
  }
}
