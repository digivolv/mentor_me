const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    db.query(`SELECT * FROM users WHERE username = $1`, [username])
      .then((data) => {
        const id = data.rows[0].id;
        const name = data.rows[0].name;
        console.log("ID", id);
        console.log("NAME", name);
        res.redirect("http://localhost:3000");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
