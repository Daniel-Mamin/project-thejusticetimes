const jwt = require("jsonwebtoken");
const config = require("config");
const errorHandler = require("../utils/errorHandler");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized!" });
    }

    const decoded = jwt.verify(token, config.get("jwt-secret"));
    req.user = decoded;
    next();
  } catch (e) {
    errorHandler(res, e);
  }
};
