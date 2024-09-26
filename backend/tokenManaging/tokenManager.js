const jwt = require('jsonwebtoken');

const COOKIE_NAME = process.env.COOKIE_NAME;


const verifyToken = async (req, res, next) => {
  const token = req.signedCookies[COOKIE_NAME];
  console.log(token);

  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    res.locals.jwtData = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Token Expired" });
  }
};

module.exports = { verifyToken };