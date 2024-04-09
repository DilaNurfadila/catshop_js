const db = require("./../config/db"); // call and execute db
const bcrypt = require("bcrypt"); // call bcrypt library

// Create model
const Auth032Model = {
  // Get by id
  getuser: (username, callback) => {
    db.query(`SELECT * FROM users032 WHERE username_032 = '${username}'`, callback);
  },

  // Edit
  changepass: async (data, username, callback) => {
    const newpassword = await bcrypt.hash(data, 10)
    db.query(
      `UPDATE users032 SET 
      password_032 = '${newpassword}'
      WHERE username_032 = '${username}'`,
      callback
    );
  },

  // Delete
  delete: (id, callback) => {
    db.query(`DELETE FROM users032 WHERE userid_032 = ${id}`, callback)
  }
};

module.exports = Auth032Model; // export model
