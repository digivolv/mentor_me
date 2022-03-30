const router = require("express").Router();

module.exports = (db) => {
  // all routes will go here
  router.get("/", (req, res) => {
    const command = `
    SELECT * FROM favourites`;
    db.query(command).then((data) => {
      res.json(data.rows);
    });
  });

  router.delete("/:mentee_id/:mentor_id", (req, res) => {
    const {mentee_id, mentor_id} = req.params;
    db.query(
      `DELETE FROM favourites
        WHERE mentee_id = $1
        AND mentor_id = $2`, [mentee_id, mentor_id]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const command = `
    SELECT * FROM favourites
    JOIN mentors on mentors.id = mentor_id
    INNER JOIN users on users.id = mentor_id
    WHERE mentee_id = $1`;
    const values = [id];
    db.query(command, values).then((data) => {
      res.json(data.rows);
    });
  });

  router.post("/", (req, res) => {
    const {mentee_id, mentor_id} = req.body;
    
      
    db.query(`
    INSERT INTO favourites (mentee_id, mentor_id)
    VALUES ($1, $2)`, [mentee_id, mentor_id])
      .then((data) => {
        res.json(data.rows);
      });
  });
  // router.post("/:menteeId/:mentorId", (req, res) => {
  //   const queryStr = `
  //     INSERT INTO favourites (mentee_id, mentor_id)
  //     VALUES ($1, $2)
  //     RETURNING *;`;
  //   const values = [req.params.menteeId, req.params.mentorId];
  //   db.query(queryStr, values)
  //     .then((data) => {
  //       data.rows[0];
  //       res.redirect(`/users/${req.session.user_id}/favourites`);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });
  return router;
};