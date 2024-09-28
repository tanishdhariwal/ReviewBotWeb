const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please provide name email and password" });
  }
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: "Duplicate entry: User already exists" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  try {
    let gotuser = await User.findOne({ email: email });
    if (!gotuser) {
      return res.status(400).json({ error: "User not found" });
    }

    let matched = await gotuser.comparePass(password);
    if (!matched) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    res.clearCookie(process.env.COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = jwt.sign(
      { id: gotuser._id, username: gotuser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const expires = new Date(Date.now() + 3600000); // 1 hour

    res.cookie(process.env.COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ message: "Login successful", token, canLogin: true });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const verifyuser = async (req, res) => {
  console.log("verifying user");
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    } 

    return res.status(200).json({ message: "Ok", "username": user.username, "email": user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    res.clearCookie(process.env.COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    // res.cookie(process.env.COOKIE_NAME, token, {
    //   path: "/",
    //   domain: "localhost",
    //   expires,
    //   httpOnly: true,
    //   signed: true,
    // });

    return res.status(200).json({ message: "Ok", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};

module.exports = { signup, login, logout, verifyuser };