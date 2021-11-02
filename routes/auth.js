const { Router } = require("express");
const { check } = require("express-validator");

const controllers = require("../controllers/auth");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Incorrect email.").normalizeEmail().isEmail(),
    check("password", "Incorrect password.").exists(),
  ],
  controllers.login
);
router.post(
  "/registration",
  [
    check("email", "Incorrect email.").normalizeEmail().isEmail(),
    check("password", "Password must be between 8 and 16 characters.").isLength(
      {
        min: 8,
        max: 16,
      }
    ),
  ],
  controllers.registration
);

module.exports = router;
