const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const errorHandler = require("../utils/errorHandler");

const createJWT = (payload, secretKey, options) => {
  return jwt.sign(payload, secretKey, options);
};

module.exports.registration = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect registration data!",
      });
    }

    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
      return res.status(409).json({
        message: "This user already exists! Create another!",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      f_name: req.body.f_name,
      l_name: req.body.l_name,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    const token = createJWT(
      { userId: user._id, email: user.email },
      config.get("jwt-secret"),
      { expiresIn: "1h" }
    );

    res.status(201).json({ token: `Bearer ${token}`, userId: user._id });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect login data!",
      });
    }

    const { email, password } = req.body;

    const candidate = await User.findOne({ email });

    if (!candidate) {
      return res.status(404).json({
        message: "No such user found! Try again!",
      });
    }

    const passwordResult = await bcrypt.compare(password, candidate.password);

    if (!passwordResult) {
      return res.status(404).json({
        message: "Password mismatch! Try again!",
      });
    }

    const token = createJWT(
      { userId: candidate._id, email: candidate.email },
      config.get("jwt-secret"),
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token: `Bearer ${token}`,
      userId: candidate._id,
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
