const express = require("express");
const Cats032Controller = require("../controllers/cats032Controller");

const router = express.Router();

router.get("/", Cats032Controller.getCats);
router.get("/add", Cats032Controller.createCat);
router.post("/add", Cats032Controller.addCat);
router.get("/edit/:id", Cats032Controller.editCat);
router.post("/edit/:id", Cats032Controller.updateCat);
router.get("/delete/:id", Cats032Controller.deleteCat);

module.exports = router;
