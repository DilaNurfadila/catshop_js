const Cats032Model = require("../models/cats032_model"); // call cat model
const Categories032Model = require("../models/categories032_model"); // call cat model

// Create controller
const Cats032Controller = {
  // get all cats
  getAll: (req, res) => {
    const page = parseInt(req.query.page);
    const limit = 10;

    // console.log(page);
    Cats032Model.read((data) => {
      const totalItems = data.length;
      
      Cats032Model.pagination(page, limit, (cats) => {
        const totalPages = Math.ceil(totalItems / limit);
  
        if (req.session && req.session.user) {
          res.render("cats032/cat_list_032", {
            cats,
            currentPage: page,
            totalPages,
            success: req.flash("success"),
            failed: req.flash("failed"),
          });
        } else {
          res.redirect("/auth/login")
        }
      });
    })
    
  },

  // render form add file
  addForm: (req, res) => {
    Cats032Model.read((data) => {
      Categories032Model.read((categories) => {
        if (req.session && req.session.user) {
          res.render("cats032/cat_form_032", { 
            data, 
            categories,
            failed: req.flash("failed"),
          });
        } else {
          res.redirect("/auth/login")
        }
      });
    })
    
    // res.render("cats032/cat_form_add_032");
  },

  // proccess add cat
  add: (req, res) => {
    const { name_032, type_032, gender_032, age_032, price_032 } = req.body;

    if(!name_032 || !type_032 || !gender_032 || !age_032 || !price_032) {
      req.flash("failed", "Please fill in all fields");
      return res.redirect("/cats/add");
    }


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
    Categories032Model.read((categories) => {
      Cats032Model.read_by(req.params.id, (err, rows) => {
        if (req.session && req.session.user) {
          res.render("cats032/cat_form_032", { 
            data: rows[0],
            categories,
            failed: req.flash("failed"),
          });
        } else {
          res.redirect("/auth/login")
        }
      });
    });
    
  },

  // proccess edit cat
  update: (req, res) => {
    const { name_032, type_032, gender_032, age_032, price_032 } = req.body;
    const id = req.params.id;

    if(!name_032 || !type_032 || !gender_032 || !age_032 || !price_032) {
      req.flash("failed", "Please fill in all fields");
      return res.redirect(`/cats/edit/${id}`);
    }

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
      if (req.session && req.session.user) {
        if(req.session.user.usertype === 'Manager') {
          res.render("cats032/cat_sale_032", {
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

  // Sale
  sale: (req, res) => {
    const { customer_name_032, customer_address_032, customer_phone_032 } = req.body;
    const id = req.params.id;

    if(!customer_name_032 || !customer_address_032 || !customer_phone_032) {
      req.flash("failed", "Please fill in all fields");
      return res.redirect(`/cats/sale/${id}`);
    }
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
      if (req.session && req.session.user) {
        if(req.session.user.usertype === 'Manager') {
          res.render("cats032/sale_list_032", { sales });
        } else {
          res.redirect("/")
        }
      } else {
        res.redirect("/auth/login")
      }
    });
  },

  // get cat sold
  getCatSold: (req, res) => {
    Cats032Model.read_by(req.params.id, (err, row) => {
      if (err) throw err;
      const cat = row[0];
      if (req.session && req.session.user) {
        if(req.session.user.usertype === 'Manager') {
          res.render("cats032/cat_detail_032", { cat });
        } else {
          res.redirect("/")
        }
      } else {
        res.redirect("/auth/login")
      }
    });
  },
};

module.exports = Cats032Controller; // export controller
