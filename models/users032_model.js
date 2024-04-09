const db = require("./../config/db"); // call and execute db
const bcrypt = require("bcrypt"); // call bcrypt library

// Create model
const Users032Model = {
  // Get all
  read: (callback) => {
    db.query("SELECT * FROM users032", (err, result) => {
      if (err) throw err;
      callback(result);
    });
  },

  // Get by id
  read_by: (id, callback) => {
    db.query(`SELECT * FROM users032 WHERE userid_032 = ${id}`, callback);
  },

  // Add
  create: async (data, callback) => {
    const password = await bcrypt.hash(data.usertype_032, 10)
    db.query(
      `INSERT INTO users032 SET
      username_032 = '${data.username_032}',
      password_032 = '${password}',
      usertype_032 = '${data.usertype_032}',
      fullname_032 = '${data.fullname_032}'`,
      callback
    );
  },

  // Edit
  update: function (data, id, callback) {
    db.query(
      `UPDATE users032 SET 
      username_032 = '${data.username_032}',
      usertype_032 = '${data.usertype_032}',
      fullname_032 = '${data.fullname_032}'
      WHERE userid_032 = ${id}`,
      callback
    );
  },

  // Delete
  delete: (id, callback) => {
    db.query(`DELETE FROM users032 WHERE userid_032 = ${id}`, callback)
  },

  // reset password
  resetpass: async (data, id, callback) => {
    const newpassword = await bcrypt.hash(data, 10)
    db.query(
      `UPDATE users032 SET 
      password_032 = '${newpassword}'
      WHERE userid_032 = '${id}'`,
      callback
    );
  }
};

module.exports = Users032Model; // export model
