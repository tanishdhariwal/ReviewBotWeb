const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  let gotuser = await User.findOne({ email: req.body.email });
    // if (gotuser) {
    //     console.log(gotuser)
    // }
  if (gotuser) {
    let matched = await gotuser.comparePass(password);
    if (matched) {
      
        const token = jwt.sign(
            { id: gotuser._id }, process.env.JWT_SECRET, 
            {
            expiresIn: "1h",
            });
            return res.status(200).json({ message: "Login successful", token ,canLogin:true});


    } else {
      return res.status(400).json({ error: "Incorrect password" });
    }
  } else {
    return res.status(400).json({ error: "User not found" });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide name email and password" });
  }
  try {
    const user = new User({ name, email, password });
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

module.exports = { signup ,login};
