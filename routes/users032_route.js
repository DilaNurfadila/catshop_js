const express = require("express");
const Users032Controller = require("../controllers/users032Controller"); // call controller

const router = express.Router(); // router

// Create routes for controllers
router.get("/", Users032Controller.getAll);
router.route("/add")
.get(Users032Controller.addForm)
.post(Users032Controller.add);
router.route("/edit/:id")
.get(Users032Controller.editForm)
.post(Users032Controller.update);
router.get("/delete/:id", Users032Controller.delete);

module.exports = router; // export router
