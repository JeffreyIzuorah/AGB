const express = require('express');
const router = express.Router();
const controller = require("../controllers/mainController");

// router.get("/list", controller.listStaff)

router.get("/register", controller.register);
router.post("/register", controller.createStaff)


router.get("/login", controller.login)
router.post("/login",controller.post_login)
// router.get("/register", controller.createStaff)
// router.post("/register", controller.createStaff)
// router.patch("/update/:id",controller.updateStaff)
// router.get("/:id", controller.getStaff)
// router.delete("/delete/:id", controller.deleteStaff)
// router.get("/logout",controller.logout)


module.exports = router;