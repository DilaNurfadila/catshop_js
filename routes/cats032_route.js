const express = require("express");
const Cats032Controller = require("../controllers/cats032Controller"); // call controller

const router = express.Router(); // router

// Create routes for controllers
router.get("/", Cats032Controller.getAll);
// router.get("/add", Cats032Controller.addForm);
// router.post("/add", Cats032Controller.add);
router.route("/add")
.get(Cats032Controller.addForm)
.post(Cats032Controller.add);
// router.get("/edit/:id", Cats032Controller.editForm);
// router.post("/edit/:id", Cats032Controller.update);
router.route("/edit/:id")
.get(Cats032Controller.editForm)
.post(Cats032Controller.update);
router.route("/changephoto/:id")
.get(Cats032Controller.changePhotoForm)
.post(Cats032Controller.changePhoto);
router.get("/delete/:id", Cats032Controller.delete);
router.get("/sales", Cats032Controller.sales);
// router.get("/sale/:id", Cats032Controller.saleForm);
// router.post("/sale/:id", Cats032Controller.sale);
router.route("/sale/:id")
.get(Cats032Controller.saleForm)
.post(Cats032Controller.sale);
router.get("/getCatSold/:id", Cats032Controller.getCatSold);

module.exports = router; // export router
