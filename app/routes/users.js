const express = require("express");
const {
  createUser,
  getUsers,
  getUser,
  addAccount,
} = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:userId", getUser);
usersRouter.post("/", createUser);
usersRouter.put("/add-account/:userId", addAccount);

module.exports = usersRouter;
