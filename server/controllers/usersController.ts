import * as mongoose from 'mongoose';

export class UserController {
  addUser(req, res) {
    const usersSchema = mongoose.model('Users');
    const user = new usersSchema(req.body);
    user.save((err, user) => {
      if (err) res.send(err);
      res.json(user);
    });
  }

  updateUser(req, res) {
    const user = req.body;
    user.email = req.user.email;
    mongoose
      .model('Users')
      .findOneAndUpdate(
        { email: req.user.email },
        user,
        { new: true },
        (err, user) => {
          if (err) res.send(err);
          res.json(user);
        }
      );
  }

  searchUser(req, res) {
    let doc = mongoose.model('Users').find();
    if (req.params.term) {
      doc = doc.or([
        { name: { $regex: `^${req.params.term}` } },
        { email: { $regex: `^${req.params.term}` } },
        { phoneNo: { $regex: `^${req.params.term}` } }
      ]);
    }

    doc
      .find({ email: { $ne: req.user.email } })
      .limit(10)
      .exec((err, user) => {
        if (err) res.send(err);
        res.json(user);
      });
  }

  getUser(req, res) {
    mongoose
      .model('Users')
      .findOne({ email: req.params.email }, (err, user) => {
        if (err) res.send(err);
        res.json(user);
      });
  }
}
