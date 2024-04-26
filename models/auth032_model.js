const db = require("./../config/db"); // call and execute db
const bcrypt = require("bcrypt"); // call bcrypt library

// Filesystem
const fs = require("fs");
const path = require("path");



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

  // Change Photo
  changephoto: (username, photo, oldphoto, callback) => {
    const fullPath = path.join(__dirname, "../", "public", "uploads", "users", oldphoto);

    if(oldphoto !== "default.png") {
      fs.unlink(fullPath, (err) => {
        if (err) throw err;
        console.log("File deleted successfully");
      })
    }

    db.query(`UPDATE users032 set photo_032='${photo}' where username_032='${username}'`, callback);


    // console.log(fullPath);
  }
};

module.exports = Auth032Model; // export model
