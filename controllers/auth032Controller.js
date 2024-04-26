const Auth032Model = require("../models/auth032_model"); // call model
const bcrypt = require("bcrypt"); // call bcrypt library

// Multer
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/uploads/users/'); // path lokasi gambar yang akan disimpan
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname); // nama file gambar yang akan disimpan
  }
});
const upload = multer({ storage: storage });

const Auth032Controller = {
  // render form
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
      console.log(user);

      // password check
      bcrypt.compare(password, user.password_032, (err, result) => {

        // if password match, create session for the user
        if (result) {
          // create session
          req.session.user = {
            username: user.username_032,
            usertype: user.usertype_032,
            fullname: user.fullname_032,
            photo: user.photo_032,
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

  // render form edit file
  changePhotoForm: (req, res) => {
    if (req.session && req.session.user) {
      res.render("auth032/form_photo_032", {
        user: req.session.user,
        success: req.flash("success"),
        failed: req.flash("failed"),
      });
    } else {
      res.redirect("/auth/login");
    }
  },

  // upload proccess
  changePhoto: (req, res) => {
    upload.single('photo')(req, res, (err) => {
      if(err) {
        console.log(err);
        req.flash("failed", "Upload file failed");
        return res.redirect("/auth/changephoto");
      }

      Auth032Model.changephoto(req.session.user.username, req.file.originalname, req.session.user.photo, (err) => {
        if (err) {
          req.flash("failed", "Photo change failed");
        } else {
          req.flash("success", "Photo changed successfully");
          req.session.user.photo = req.file.originalname;
        }
      res.redirect("/auth/changephoto");
      })
    });
  }
};

module.exports = Auth032Controller; // export controller
