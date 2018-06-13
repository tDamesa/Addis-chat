import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const usersSchema = new Schema({
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

module.exports = mongoose.model('Users', usersSchema);
