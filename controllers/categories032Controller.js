const Categories032Model = require("../models/categories032_model"); // call cat model

// Create controller
const Categories032Controller = {
  // get all
  getAll: (req, res) => {
    Categories032Model.read((categories) => {
      res.render("categories032/category_list_032", {
        categories,
        success: req.flash("success"),
        failed: req.flash("failed"),
      });
    });
  },

  // get by id
  getById: (req, res) => {
    const id = req.params.id;
    Categories032Model.read_by(id, (category) => {
      res.render("categories032", { category });
    });
  },

  // render form add file
  addForm: (req, res) => {
    res.render("categories032/category_form_add_032");
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
      res.render("categories032/category_form_edit_032", { data: rows[0] });
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
