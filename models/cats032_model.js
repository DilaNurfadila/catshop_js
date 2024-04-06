const db = require("./../config/db");

const Cats032Model = {
  getAllCats: (callback) => {
    db.query("SELECT * FROM cats032", (err, result) => {
      if (err) throw err;
      callback(result);
    });
  },
  getCatById: (id, callback) => {
    db.query(`SELECT * FROM cats032 WHERE id_032 = ${id}`, callback);
  },
  addCat: (data, callback) => {
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
  updateCat: function (data, id, callback) {
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
  deleteCat: (id, callback) => {
    db.query(`DELETE FROM cats032 WHERE id_032 = ${id}`, callback)
  }
};

module.exports = Cats032Model;
