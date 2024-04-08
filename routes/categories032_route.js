const express = require("express");
const Categories032Controller = require("../controllers/categories032Controller"); // call controller

const router = express.Router(); // router

// Create routes for controllers
router.get("/", Categories032Controller.getAll);
router.route("/add")
.get(Categories032Controller.addForm)
.post(Categories032Controller.add);
router.route("/edit/:id")
.get(Categories032Controller.editForm)
.post(Categories032Controller.update);
router.get("/delete/:id", Categories032Controller.delete);

module.exports = router; // export router
