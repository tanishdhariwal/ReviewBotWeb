const express = require("express");
const dotenv = require("dotenv").config();
const router = express.Router();
const { login, signup ,logout, verifyuser } = require("../utils/userControllers");
const User = require("../models/User");
const { verifyToken } = require("../tokenManaging/tokenManager");



router.post("/signup",signup);

router.post("/login",login);

router.get("/logout",verifyToken,logout);

router.get("/authstatus",verifyToken,verifyuser)

router.get("/", (req, res) => {
    res.status(200).send("Hello from the server");
});

module.exports = router;

