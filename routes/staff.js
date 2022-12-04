const express = require('express');
const router = express.Router();
const controller = require("../controllers/mainController");
const {checkAuthenticated} = require("../config/auth.js")
const {checkNotAuthenticated} = require("../config/auth.js")

// router.get("/list", controller.listStaff)



router.get("/register", checkNotAuthenticated, controller.register);
router.post("/register", checkNotAuthenticated, controller.createStaff)


router.get("/login", checkNotAuthenticated,  controller.login)
router.post("/login", checkNotAuthenticated, controller.post_login)



module.exports = router;