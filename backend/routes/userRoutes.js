const express = require("express");
const dotenv = require("dotenv").config();
const router = express.Router();
const {
  login,
  signup,
  logout,
  verifyuser,
  get_response,
} = require("../Controllers/userControllers");
const { verifyToken } = require("../utils/tokenManager");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", verifyToken, logout);
router.get("/authstatus", verifyToken, verifyuser);
router.post("/chat_response", verifyToken, get_response); 

router.get("/", (req, res) => {
  res.status(200).send("Hello from the server");
});

module.exports = router;
