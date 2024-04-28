const Users032Model = require("../models/users032_model"); // call user model
const {
  successAddUser,
  successUpdateUser,
  successDeleteUser,
  successResetPass
} = require("../public/template/js/alertSuccess")
const {
  failedAddUser,
  failedUpdateUser,
  failedDeleteUser,
  failedFill,
  failedResetPass
} = require("../public/template/js/alertFailed")

// Create controller
const Users032Controller = {
  // get all
  getAll: (req, res) => {
    Users032Model.read((users) => {
      if (req.session && req.session.user) {
        if(req.session.user.usertype === 'Manager') {
          res.render("users032/user_list_032", {
            users,
            success: req.flash("success"),
            failed: req.flash("failed"),
          });
        } else {
          res.redirect("/")
        }
      } else {
        res.redirect("/auth/login")
      }
    });
  },

  // render form add file
  addForm: (req, res) => {
    Users032Model.read((data) => {
      if (req.session && req.session.user) {
        if(req.session.user.usertype === 'Manager') {
          res.render("users032/user_form_032", { 
            data,
            failed: req.flash("failed"), 
          });
        } else {
          res.redirect("/")
        }
      } else {
        res.redirect("/auth/login")
      }
    })
  },

  // proccess add
  add: (req, res) => {
    const { username_032, usertype_032, fullname_032 } = req.body;

    if(!username_032 || !usertype_032 || !fullname_032) {
      req.flash("failed", failedFill);
      return res.redirect("/users/add");
    }
    
    Users032Model.create(req.body, (err) => {
      if (err) {
        req.flash("failed", failedAddUser);
      } else {
        req.flash("success", successAddUser);
        res.redirect("/users");
      }
    });
  },

  // render form edit file
  editForm: (req, res) => {
    Users032Model.read_by(req.params.id, (err, rows) => {
      if (req.session && req.session.user) {
        if(req.session.user.usertype === 'Manager') {
          res.render("users032/user_form_032", { 
            data: rows[0],
            failed: req.flash("failed"),
          });
        } else {
          res.redirect("/")
        }
      } else {
        res.redirect("/auth/login")
      }
    });
  },

  // proccess edit
  update: (req, res) => {
    const { username_032, usertype_032, fullname_032 } = req.body;
    const id = req.params.id;

    if(!username_032 || !usertype_032 || !fullname_032) {
      req.flash("failed", failedFill);
      return res.redirect(`/users/edit/${id}`);
    }

    Users032Model.update(req.body, req.params.id, (err) => {
      if (err) {
        req.flash("failed", failedUpdateUser);
      } else {
        req.flash("success", successUpdateUser);
        // Add session
        req.session.user.username = username_032;
        req.session.user.usertype = usertype_032;
        req.session.user.fullname = fullname_032;
        res.redirect("/users");
      }
    });
  },

  // proccess delete
  delete: (req, res) => {
    Users032Model.delete(req.params.id, (err) => {
      if (err) {
        req.flash("failed", failedDeleteUser);
      } else {
        req.flash("success", successDeleteUser);
        res.redirect("/users");
      }
    });
  },

  // reset password
  resetpass: (req, res) => {
    Users032Model.read_by(req.params.id, (err, rows) => {
      const user = rows[0]
      // console.log(user);
      if (req.session && req.session.user) {
        Users032Model.resetpass(user.usertype_032, user.userid_032, (err) => {
          if (err) {
            req.flash("failed", failedResetPass);
          } else {
            req.flash("success", successResetPass);
            res.redirect("/users")
          }
        })
      } else {
        res.redirect("/auth/login")
      }
    });
  }
};

module.exports = Users032Controller; // export controller
