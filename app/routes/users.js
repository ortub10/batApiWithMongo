const express = require("express");
const {
  createUser,
  getUsers,
  getUser,
  addAccount,
  depositing,
  updateCredit,
  cashWithdrawal,
} = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:userId", getUser);
usersRouter.post("/", createUser);
usersRouter.put("/add-account/:userId", addAccount);
usersRouter.put("/cash/:userId/:accountNumber", depositing);
usersRouter.put("/credit/:userId/:accountNumber", updateCredit);
usersRouter.put("/withdrawal/:userId/:accountNumber", cashWithdrawal);

module.exports = usersRouter;
