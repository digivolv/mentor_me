const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", function (req, res) {
    const username = req.body.username;
    console.log("accessing backend");
    console.log("USERNAME", username);

    db.query(`SELECT * FROM users WHERE username = $1`, [username])
      .then((data) => {
        console.log("DATA:", data.rows);
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
