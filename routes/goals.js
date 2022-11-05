const express = require('express');
const router = express.Router();
const controller = require("../controllers/goalsController");


router.get("/list",controller.listGoals)
router.post("/create",controller.createGoal)
router.patch("/update/:id",controller.updateGoal)
router.delete("/delete/:id",controller.deleteGoal)


module.exports = router;