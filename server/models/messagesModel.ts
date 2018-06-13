import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
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
