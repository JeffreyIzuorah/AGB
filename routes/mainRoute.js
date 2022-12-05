const express = require('express');
const router = express.Router();
const controller = require("../controllers/mainController");
const {checkAuthenticated} = require("../config/auth.js")
const {checkNotAuthenticated} = require("../config/auth.js")





router.get("/",  controller.homePage);
router.get("/about",  controller.about);

router.get("/logout", controller.logout);
// router.get("/goals", controller.goals);
router.get("/create", checkAuthenticated, controller.addGoal);
router.post("/create", checkAuthenticated, controller.createGoal);
router.get('/edit/:id', checkAuthenticated, controller.editGoal)
router.post('/edit/:id', checkAuthenticated, controller.updateGoal)
// router.patch("/update/:id",controller.updateGoal)
router.get("/delete/:id", checkAuthenticated, controller.deleteGoal)
router.get("/completeGoal/:id", controller.completeGoal)
router.get("/deleteStaff/:id", checkAuthenticated, controller.deleteStaff)

// router.patch("/staff/update/:id",controller.updateStaff)

router.get("/manageStaff",  controller.staffPage);
router.get("/addStaff",  controller.addStaffPage);
router.post("/addStaff", controller.addStaff);



router.get("/dashboard", checkAuthenticated, controller.dashboard,);




module.exports = router;