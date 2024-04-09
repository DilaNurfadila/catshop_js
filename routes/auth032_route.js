const express = require("express");
const Auth032Controller = require("../controllers/auth032Controller"); // call controller

const router = express.Router(); // router

// Create routes for controllers
router.route("/login")
.get(Auth032Controller.loginForm)
.post(Auth032Controller.login);
router.get("/logout", Auth032Controller.logout);
router.route("/changepass")
.get(Auth032Controller.changePassForm)
.post(Auth032Controller.changePass)
// router.route("/add")
// .get(Users032Controller.addForm)
// .post(Users032Controller.add);

module.exports = router; // export router
