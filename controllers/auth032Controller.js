const Auth032Model = require("../models/auth032_model"); // call model
const bcrypt = require("bcrypt"); // call bcrypt library

// render form
const Auth032Controller = {
  loginForm: (req, res) => {
    res.render("auth032/form_login_032", {
      success: req.flash("success"),
      failed: req.flash("failed"),
    });
  },

  // login process
  login: (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
      req.flash("failed", "Please fill in all fields");
      return res.redirect("/auth/login");
    }

    // Cari pengguna berdasarkan username
    Auth032Model.getuser(username, (err, rows) => {
      const user = rows[0];
      // console.log(user);

      // password check
      bcrypt.compare(password, user.password_032, (err, result) => {

        // if password match, create session for the user
        if (result) {
          // create session
          req.session.user = {
            username: user.username_032,
            usertype: user.usertype_032,
            fullname: user.fullname_032,
          };
          res.redirect("/");
        } else {
          req.flash("failed", "Invalid username or password");
          res.redirect("/auth/login");
        }
      });
    });
  },

  // logout
  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/auth/login");
  },

  // render form edit file
  changePassForm: (req, res) => {
    if (req.session && req.session.user) {
      res.render("auth032/form_password_032", {
        success: req.flash("success"),
        failed: req.flash("failed"),
      });
    } else {
      res.redirect("/auth/login");
    }
  },

  // proccess edit
  changePass: (req, res) => {
    const { oldpassword, newpassword } = req.body;

    if(!oldpassword || !newpassword) {
      req.flash("failed", "Please fill in all fields");
      return res.redirect("/auth/changepass");
    }

    Auth032Model.getuser(req.session.user.username, (err, rows) => {
      const user = rows[0];

      bcrypt.compare(oldpassword, user.password_032, (err, result) => {
        if (!result) {
          req.flash("failed", "Invalid old password");
          res.redirect("/auth/changepass");
        }
        Auth032Model.changepass(
          newpassword,
          req.session.user.username,
          (err) => {
            if (err) {
              req.flash("failed", `Password change failed`);
              console.log(err);
            } else {
              req.flash("success", `Password changed successfully`);
            }
            res.redirect("/auth/changepass");
          }
        );
      });
    });
  },
};

module.exports = Auth032Controller; // export controller
