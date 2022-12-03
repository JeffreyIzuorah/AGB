const express = require('express');
const router = express.Router();
const controller = require("../controllers/mainController");


router.get("/", controller.homePage);

router.get("/logout", controller.logout);
// router.get("/goals", controller.goals);
router.get("/create", controller.addGoal);
router.post("/create", controller.createGoal);
router.patch("/update/:id",controller.updateGoal)
router.delete("/delete/:id",controller.deleteGoal)

router.patch("/staff/update/:id",controller.updateStaff)



router.get("/dashboard", controller.dashboard);




module.exports = router;