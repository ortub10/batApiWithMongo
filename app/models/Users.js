const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  accounts: {
    type: [
      {
        numberAcount: {
          type: Number,
          required: true,
          unique: true,
        },
        cash: {
          type: Number,
          default: 0,
        },

        credit: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
