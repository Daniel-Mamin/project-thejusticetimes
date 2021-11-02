const { Router } = require("express");

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const controller = require("../controllers/profile");

const router = Router();

router.get("/:id", auth, controller.getInfo);
router.patch("/:id", auth, upload.single("image"), controller.update);
router.put("/deletePhoto", auth, controller.delete);

module.exports = router;