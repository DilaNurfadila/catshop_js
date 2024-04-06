const Cats032Model = require("../models/cats032_model");

const Cats032Controller = {
  getCats: (req, res) => {
    Cats032Model.getAllCats((cats) => {
      res.render("cats032/cat_list_032", {
        cats,
        success: req.flash("success"),
        failed: req.flash("failed"),
      });
    });
  },
  getCatById: (req, res) => {
    const id = req.params.id;
    Cats032Model.getCatById(id, (cat) => {
      res.render("cats032", { cat });
    });
  },
  createCat: (req, res) => {
    res.render("cats032/cat_form_add_032");
  },
  addCat: (req, res) => {
    Cats032Model.addCat(req.body, (err) => {
      if (err) {
        req.flash("failed", `Cat add failed`);
      } else {
        req.flash("success", `Cat added successfully`);
        res.redirect("/cats");
      }
    });
  },
  editCat: (req, res) => {
    Cats032Model.getCatById(req.params.id, (err, rows) => {
      res.render("cats032/cat_form_edit_032", { data: rows[0] });
    });
  },
  updateCat: (req, res) => {
    Cats032Model.updateCat(req.body, req.params.id, (err) => {
      if (err) {
        req.flash("failed", `Cat update failed`);
      } else {
        req.flash("success", `Cat updated successfully`);
        res.redirect("/cats");
      }
    });
  },
  deleteCat: (req, res) => {
    Cats032Model.deleteCat(req.params.id, (err) => {
      if (err) {
        req.flash("failed", `Cat delete failed`);
      } else {
        req.flash("success", `Cat deleted successfully`);
        res.redirect("/cats");
      }
    });
  },
};

module.exports = Cats032Controller;
