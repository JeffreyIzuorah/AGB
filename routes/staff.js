const express = require('express');
const router = express.Router();
const controller = require("../controllers/staffController");

router.get("/list",controller.listStaff)
router.post("/login",controller.login)
router.post("/create",controller.createStaff)
router.patch("/update/:id",controller.updateStaff)
router.get("/:id",controller.getStaff)
router.delete("/delete/:id",controller.deleteStaff)


module.exports = router;