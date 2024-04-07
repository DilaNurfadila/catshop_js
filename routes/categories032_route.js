const express = require("express");
const Categories032Controller = require("../controllers/categories032Controller"); // call controller

const router = express.Router(); // router

// Create routes for controllers
router.get("/", Categories032Controller.getAll);
router.get("/add", Categories032Controller.addForm);
router.post("/add", Categories032Controller.add);
router.get("/edit/:id", Categories032Controller.editForm);
router.post("/edit/:id", Categories032Controller.update);
router.get("/delete/:id", Categories032Controller.delete);

module.exports = router; // export router
