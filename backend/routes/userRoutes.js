const express = require("express");
// const dotenv = require("dotenv").config();
const userRouter = express.Router();
const {
  login,
  signup,
  logout,
  verifyuser,
  get_response,
} = require("../Controllers/userControllers");
const { verifyToken } = require("../utils/tokenManager");

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", verifyToken, logout);
userRouter.get("/authstatus", verifyToken, verifyuser);
// userRouter.post("/chat_response", get_response); 

userRouter.get("/", (req, res) => {
  res.status(200).send("Hello from the server");
});

module.exports = userRouter;
