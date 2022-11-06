const express = require('express');
const router = express.Router();
const controller = require("../controllers/mainController");


router.get("/", controller.homePage);
router.get("/register", controller.register);
router.get("/login", controller.login);
router.get("/goals", controller.goals);




module.exports = router;