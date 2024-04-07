const db = require("./../config/db"); // call and execute db

// Create model
const Categories032Model = {
  // Get all
  read: (callback) => {
    db.query("SELECT * FROM categories032", (err, result) => {
      if (err) throw err;
      callback(result);
    });
  },

  // Get by id
  read_by: (id, callback) => {
    db.query(`SELECT * FROM categories032 WHERE category_id_032 = ${id}`, callback);
  },

  // Add
  create: (data, callback) => {
    db.query(
      `INSERT INTO categories032 SET
      category_name_032 = '${data.category_name_032}',
      description_032 = '${data.description_032}'`,
      callback
    );
  },

  // Edit
  update: function (data, id, callback) {
    db.query(
      `UPDATE categories032 SET 
      category_name_032 = '${data.category_name_032}', 
      description_032 = '${data.description_032}'
      WHERE category_id_032 = ${id}`,
      callback
    );
  },

  // Delete
  delete: (id, callback) => {
    db.query(`DELETE FROM categories032 WHERE category_id_032 = ${id}`, callback)
  }
};

module.exports = Categories032Model; // export model
