const User = require("../models/Users");

module.exports = {
  createUser: async (req, res) => {
    try {
      const userBody = req.body;
      const user = new User(userBody);
      const newUser = await user.save();
      res.send(newUser);
    } catch (e) {
      res.send(e);
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (e) {
      res.send(e);
    }
  },

  getUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findOne({ userId: userId });
      res.send(user);
    } catch (e) {
      res.send(e);
    }
  },

  addAccount: async (req, res) => {
    try {
      const userId = req.params.userId;
      const acoount = req.body;
      const user = await User.findOneAndUpdate(
        { userId: userId },
        { $push: { accounts: [acoount] } },
        {
          new: true,
        }
      );
      res.send(user);
    } catch (e) {
      res.send(e);
    }
  },
};
