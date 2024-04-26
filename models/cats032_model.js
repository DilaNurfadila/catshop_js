const db = require("./../config/db"); // call and execute db

const fs = require("fs");
const path = require("path");

// Create model
const Cats032Model = {
  // Get all
  read: (callback) => {
    db.query("SELECT * FROM cats032 where sold_032 = 0", (err, result) => {
      if (err) throw err;
      callback(result);
    });
  },

  // Get by id
  read_by: (id, callback) => {
    db.query(`SELECT * FROM cats032 WHERE id_032 = ${id}`, callback)
  },

  // Pagination
  pagination: (page, limit, callback) => {
    const offset = (page - 1) * limit

    db.query(`SELECT * FROM cats032 where sold_032 = 0 limit ${limit} offset ${offset}`, (err, result) => {
      if (err) throw err;
      callback(result);
    });
  },

  // Add
  create: (data, callback) => {
    db.query(
      `INSERT INTO cats032 SET
      name_032 = '${data.name_032}',
      type_032 = '${data.type_032}',
      gender_032 = '${data.gender_032}',
      age_032 = '${data.age_032}',
      price_032 = '${data.price_032}',
      sold_032 = '0'`,
      callback
    );
  },

  // Change Photo
  changephoto: (id, photo, oldphoto, callback) => {
    const fullPath = path.join(__dirname, "../", "public", "uploads", "cats", oldphoto);

    if(oldphoto !== "default.png") {
      fs.unlink(fullPath, (err) => {
        if (err) throw err;
        console.log("File deleted successfully");
      })
    }

    db.query(`UPDATE cats032 set photo_032='${photo}' where id_032='${id}'`, callback);


    // console.log(fullPath);
  },

  // Edit
  update: function (data, id, callback) {
    db.query(
      `UPDATE cats032 SET 
      name_032 = '${data.name_032}', 
      type_032 = '${data.type_032}',
      gender_032 = '${data.gender_032}',
      age_032 = '${data.age_032}',
      price_032 = '${data.price_032}'
      WHERE id_032 = ${id}`,
      callback
    );
  },

  // Delete
  delete: (id, callback) => {
    db.query(`DELETE FROM cats032 WHERE id_032 = ${id}`, callback)
  },

  // sale
  sale: (data, id, callback) => {
    const addSales = `INSERT INTO catsales032 SET
    customer_name_032 = '${data.customer_name_032}',
    customer_address_032 = '${data.customer_address_032}',
    customer_phone_032 = '${data.customer_phone_032}',
    cat_id_032 = ${id}`;

    const updateCatSold = `UPDATE cats032 SET 
    sold_032 = '1'
    WHERE id_032 = ${id}`;

    // Eksekusi pernyataan pertama
db.query(addSales, (err, result) => {
  if (err) {
    console.error('Error adding sales:', err);
    callback(err);
  } else {
    // Pernyataan pertama berhasil, lanjutkan dengan pernyataan kedua
    db.query(updateCatSold, (err, result) => {
      if (err) {
        console.error('Error updating cat sold status:', err);
        callback(err);
      } else {
        // Kedua pernyataan SQL berhasil dieksekusi secara berurutan
        callback(null);
      }
    });
  }
});
  },

  // Sales
  sales: (callback) => {
    const catsJoin = `SELECT * FROM cats032 INNER JOIN catsales032 ON cats032.id_032 = catsales032.cat_id_032`
    // db.query(catsJoin, callback);
    db.query(catsJoin, (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }
};

module.exports = Cats032Model; // export model
