const express = require("express");
const dotenv = require("dotenv").config();
const router = express.Router();
const { signup,login } = require("../utils/userControllers");

router.post("/signup",signup);
router.post("/login",login);

router.get("/", (req, res) => {
    res.send("Hello from the server");
});

module.exports = router;

