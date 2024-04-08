const Cats032Model = require("../models/cats032_model"); // call cat model

// Create controller
const Cats032Controller = {
  // get all cats
  getAll: (req, res) => {
    Cats032Model.read((cats) => {
      res.render("cats032/cat_list_032", {
        cats,
        success: req.flash("success"),
        failed: req.flash("failed"),
      });
    });
  },

  // render form add file
  addForm: (req, res) => {
    res.render("cats032/cat_form_add_032");
  },

  // proccess add cat
  add: (req, res) => {
    Cats032Model.create(req.body, (err) => {
      if (err) {
        req.flash("failed", `Cat add failed`);
      } else {
        req.flash("success", `Cat added successfully`);
        res.redirect("/cats");
      }
    });
    
  },

  // render form edit file
  editForm: (req, res) => {
    Cats032Model.read_by(req.params.id, (err, rows) => {
      res.render("cats032/cat_form_edit_032", { data: rows[0] });
    });
  },

  // proccess edit cat
  update: (req, res) => {
    Cats032Model.update(req.body, req.params.id, (err) => {
      if (err) {
        req.flash("failed", `Cat update failed`);
      } else {
        req.flash("success", `Cat updated successfully`);
        res.redirect("/cats");
      }
    });
  },

  // proccess delete cat
  delete: (req, res) => {
    Cats032Model.delete(req.params.id, (err) => {
      if (err) {
        req.flash("failed", `Cat delete failed`);
      } else {
        req.flash("success", `Cat deleted successfully`);
        res.redirect("/cats");
      }
    });
  },

  // Sale form
  saleForm: (req, res) => {
    Cats032Model.read_by(req.params.id, (err, rows) => {
      res.render("cats032/cat_sale_032", { data: rows[0] });
    });
  },

  // Sale
  sale: (req, res) => {
    Cats032Model.sale(req.body, req.params.id, (err) => {
      if (err) {
        req.flash("failed", `Cat sale failed`);
      } else {
        req.flash("success", `Cat successfully sold`);
        res.redirect("/cats");
      }
    });
  },

  // Sales form
  sales: (req, res) => {
    Cats032Model.sales((sales) => {
      res.render("cats032/sale_list_032", { sales });
    });
  },

  // get cat sold
  getCatSold: (req, res) => {
    Cats032Model.read_by(req.params.id, (err, row) => {
      if(err) throw err;
      const cat = row[0];
      res.render("cats032/cat_detail_032", { cat });
    });
  }
};

module.exports = Cats032Controller; // export controller
