const Categories032Model = require("../models/categories032_model"); // call cat model

// Create controller
const Categories032Controller = {
  // get all
  getAll: (req, res) => {
    Categories032Model.read((categories) => {
      if (req.session && req.session.user) {
        res.render("categories032/category_list_032", {
          categories,
          success: req.flash("success"),
          failed: req.flash("failed"),
        });
      } else {
        res.redirect("/auth/login")
      }
    });
  },

  // render form add file
  addForm: (req, res) => {
    Categories032Model.read((data) => {
      if (req.session && req.session.user) {
        res.render("categories032/category_form_032", { data });
      } else {
        res.redirect("/auth/login")
      }
    })
  },

  // proccess add
  add: (req, res) => {
    Categories032Model.create(req.body, (err) => {
      if (err) {
        req.flash("failed", `Category add failed`);
      } else {
        req.flash("success", `Category added successfully`);
        res.redirect("/categories");
      }
    });
  },

  // render form edit file
  editForm: (req, res) => {
    Categories032Model.read_by(req.params.id, (err, rows) => {
      if (req.session && req.session.user) {
        res.render("categories032/category_form_032", { data: rows[0] });
      } else {
        res.redirect("/auth/login")
      }
    });
  },

  // proccess edit
  update: (req, res) => {
    Categories032Model.update(req.body, req.params.id, (err) => {
      if (err) {
        req.flash("failed", `Category update failed`);
      } else {
        req.flash("success", `Category updated successfully`);
        res.redirect("/categories");
      }
    });
  },

  // proccess delete
  delete: (req, res) => {
    Categories032Model.delete(req.params.id, (err) => {
      if (err) {
        req.flash("failed", `Category delete failed`);
      } else {
        req.flash("success", `Category deleted successfully`);
        res.redirect("/categories");
      }
    });
  },
};

module.exports = Categories032Controller; // export controller
