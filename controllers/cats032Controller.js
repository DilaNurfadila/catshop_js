const Cats032Model = require("../models/cats032_model"); // call cat model
const Categories032Model = require("../models/categories032_model"); // call category model

const {
  successAddCat,
  successUpdateCat,
  successDeleteCat,
  successSoldCat,
  successPhoto
} = require("../public/template/js/alertSuccess")
const {
  failedAddCat,
  failedUpdateCat,
  failedDeleteCat,
  failedSaleCat,
  failedFill,
  failedPhoto,
  failedUpload
} = require("../public/template/js/alertFailed")

// Multer
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/uploads/cats/'); // path lokasi gambar yang akan disimpan
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname); // nama file gambar yang akan disimpan
  }
});
const upload = multer({ storage: storage });

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
        const endIndex = Math.min(totalItems, totalPages * limit);
  
        if (req.session && req.session.user) {
          res.render("cats032/cat_list_032", {
            cats,
            currentPage: page,
            totalPages,
            totalItems,
            endIndex,
            user: req.session.user,
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
            user: req.session.user,
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
      req.flash("failed", failedFill);
      return res.redirect("/cats/add");
    }


    Cats032Model.create(req.body, (err) => {
      if (err) {
        req.flash("failed", failedAddCat);
      } else {
        req.flash("success", successAddCat);
        res.redirect("/cats?page=1");
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
            user: req.session.user,
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
      req.flash("failed", failedFill);
      return res.redirect(`/cats/edit/${id}`);
    }

    Cats032Model.update(req.body, req.params.id, (err) => {
      if (err) {
        req.flash("failed", failedUpdateCat);
      } else {
        req.flash("success", successUpdateCat);
        res.redirect("/cats?page=1");
      }
    });
  },

  // render form edit file
  changePhotoForm: (req, res) => {
      Cats032Model.read_by(req.params.id, (err, rows) => {
        if (req.session && req.session.user) {
          res.render("cats032/cat_form_photo_032", { 
            data: rows[0],
            success: req.flash('success'),
            user: req.session.user,
            failed: req.flash("failed"),
          });
        } else {
          res.redirect("/auth/login")
        }
      });
  },

  // upload proccess
  changePhoto: (req, res) => {
    const photo_032 = req.body;
    upload.single('photo')(req, res, (err) => {
      if(err) {
        console.log(err);
        req.flash("failed", failedUpload);
        return res.redirect(`/cats/changephoto/${req.params.id}`);
      }

      if(!photo_032) {
        req.flash("failed", failedFill);
        return res.redirect(`/cats/changephoto/${req.params.id}`);
      }

      Cats032Model.read_by(req.params.id, (err, rows) => {
        cat = rows[0];
        Cats032Model.changephoto(req.params.id, req.file.originalname, cat.photo_032, (err) => {
          if (err) {
            req.flash("failed", failedPhoto);
          } else {
            req.flash("success", successPhoto);
          }
        res.redirect(`/cats/changephoto/${req.params.id}`);
        })
      });
    });
  },

  // proccess delete cat
  delete: (req, res) => {
    Cats032Model.delete(req.params.id, (err) => {
      if (err) {
        req.flash("failed", failedDeleteCat);
      } else {
        req.flash("success", successDeleteCat);
        res.redirect("/cats?page=1");
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
            user: req.session.user,
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
      req.flash("failed", failedFill);
      return res.redirect(`/cats/sale/${id}`);
    }
    Cats032Model.sale(req.body, req.params.id, (err) => {
      if (err) {
        req.flash("failed", failedSaleCat);
      } else {
        req.flash("success", successSoldCat);
        res.redirect("/cats?page=1");
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
          res.render("cats032/cat_detail_032", { cat, user: req.session.user, });
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
