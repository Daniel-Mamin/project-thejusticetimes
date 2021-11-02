const { Router } = require("express");

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const controller = require("../controllers/article");

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", auth, controller.getById);
router.get("/user/:id/articles", auth, controller.getAllByUserId);
router.post("/", auth, upload.single("image"), controller.create);

module.exports = router;
