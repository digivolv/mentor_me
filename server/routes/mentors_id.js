const router = require("express").Router();

module.exports = (db) => {
  // all routes will go here
  router.get("/:id", (req, res) => {
    const command = `
    SELECT DISTINCT * FROM mentors
    JOIN users ON users.id = user_id
    WHERE mentors.id = $1`;

    const values = [req.params.id];
    db.query(command, values).then((data) => {
      res.json(data.rows);
    });
  });

  return router;
};