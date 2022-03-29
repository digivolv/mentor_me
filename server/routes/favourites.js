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