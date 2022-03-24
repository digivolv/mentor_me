const router = require("express").Router();

module.exports = (db) => {
  // all routes will go here
  router.get("/:id", (req, res) => {
    const command = `
    SELECT DISTINCT * FROM favourites
    JOIN mentors ON mentors.id = mentor_id
    JOIN users ON users.id = mentee_id
    WHERE users.id = $1`;

    // const command = `
    // SELECT DISTINCT * FROM users
    // JOIN expertise ON expertise.id = user_id
    // WHERE users.id = $1`;

    const values = [req.params.id];
    db.query(command, values).then((data) => {
      res.json(data.rows);
    });
  });

  router.post("/:menteeId/:mentorId", (req, res) => {
    const queryStr = `
      INSERT INTO favourites (mentee_id, mentor_id)
      VALUES ($1, $2)
      RETURNING *;`;
    const values = [`${req.session.mentee_id}`, `${req.params.mentorId}`];
    db.query(queryStr, values)
      .then((data) => {
        data.rows[0];
        res.redirect(`/users/${req.session.user_id}/favourites`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};