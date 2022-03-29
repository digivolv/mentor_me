const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const queryStr = `INSERT INTO users (username, name, email, password, city, country, picture) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;

    const { username, name, email, password, city, country, picture } =
      req.body;

    const values = [username, name, email, password, city, country, picture];

    db.query(queryStr, values)
      .then((data) => {
        // console.log("Added new user to database!");
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  });

  return router;
};
