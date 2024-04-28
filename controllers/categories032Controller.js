const Categories032Model = require("../models/categories032_model"); // call cat model
const {
  successAddCategory,
  successUpdateCategory,
  successDeleteCategory
} = require("../public/template/js/alertSuccess")
const {
  failedAddCategory,
  failedUpdateCategory,
  failedDeleteCategory,
  failedFill
} = require("../public/template/js/alertFailed")

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
        res.render("categories032/category_form_032", { 
          data,
          failed: req.flash("failed"),
        });
      } else {
        res.redirect("/auth/login")
      }
    })
  },

  // proccess add
  add: (req, res) => {
    const { category_name_032, description_032 } = req.body;

    if(!category_name_032 || !description_032) {
      req.flash("failed", failedFill);
      return res.redirect("/categories/add");
    }

    Categories032Model.create(req.body, (err) => {
      if (err) {
        req.flash("failed", failedAddCategory);
      } else {
        req.flash("success", successAddCategory);
        res.redirect("/categories");
      }
    });
  },

  // render form edit file
  editForm: (req, res) => {
    Categories032Model.read_by(req.params.id, (err, rows) => {
      if (req.session && req.session.user) {
        res.render("categories032/category_form_032", { 
          data: rows[0],
          failed: req.flash("failed"),
        });
      } else {
        res.redirect("/auth/login")
      }
    });
  },

  // proccess edit
  update: (req, res) => {
    const { category_name_032, description_032 } = req.body;
    const id = req.params.id;

    if(!category_name_032 || !description_032) {
      req.flash("failed", failedFill);
      return res.redirect(`/categories/edit/${id}`);
    }

    Categories032Model.update(req.body, req.params.id, (err) => {
      if (err) {
        req.flash("failed", failedUpdateCategory);
      } else {
        req.flash("success", successUpdateCategory);
        res.redirect("/categories");
      }
    });
  },

  // proccess delete
  delete: (req, res) => {
    Categories032Model.delete(req.params.id, (err) => {
      if (err) {
        req.flash("failed", failedDeleteCategory);
      } else {
        req.flash("success", successDeleteCategory);
        res.redirect("/categories");
      }
    });
  },
};

module.exports = Categories032Controller; // export controller
