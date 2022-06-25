const User = require("../models/Users");
const { use } = require("../routes/users");

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
  depositing: async (req, res) => {
    try {
      const userId = req.params.userId;
      const acoountNumber = req.params.accountNumber;
      const cashToAdd = req.body;
      if (cashToAdd.cash < 0) return res.send("Nagetive naumber");
      const user = await User.findOneAndUpdate(
        { userId: userId, "accounts.numberAcount": acoountNumber },
        { $inc: { "accounts.$.cash": cashToAdd.cash } },
        {
          new: true,
        }
      );

      if (user === null) return res.send("User id or account number not exis ");
      res.send(user);
    } catch (e) {
      res.send(e);
    }
  },

  updateCredit: async (req, res) => {
    try {
      const userId = req.params.userId;
      const acoountNumber = req.params.accountNumber;
      const credit = req.body;
      if (credit.credit < 0) return res.send("Nagetive naumber");
      const user = await User.findOneAndUpdate(
        { userId: userId, "accounts.numberAcount": acoountNumber },
        { "accounts.$.credit": credit.credit },
        {
          new: true,
        }
      );
      if (user === null) return res.send("User id or account number not exis");
      res.send(user);
    } catch (e) {
      res.send(e);
    }
  },

  cashWithdrawal: async (req, res) => {
    try {
      const userId = req.params.userId;
      const acoountNumber = req.params.accountNumber;
      const cashToWithdrawal = req.body;
      const userCheck = await User.findOne({ userId: userId });
      const acoountObj = userCheck.accounts.find(
        (acoount) => acoount.numberAcount == acoountNumber
      );

      if (acoountObj.cash - cashToWithdrawal.cash < 0)
        return res.send("The balance does not allow withdrawal");

      if (cashToWithdrawal.cash < 0) return res.send("Nagetive naumber");
      const user = await User.findOneAndUpdate(
        { userId: userId, "accounts.numberAcount": acoountNumber },
        { $inc: { "accounts.$.cash": cashToWithdrawal.cash * -1 } },
        {
          new: true,
        }
      );

      if (user === null) return res.send("User id or account number not exis");
      res.send(user);
    } catch (e) {
      res.send(e);
    }
  },
};
