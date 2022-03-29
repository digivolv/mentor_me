const router = require("express").Router();

module.exports = (db) => {
 

  router.get("/:id", (req, res) => {
    const command = `
    SELECT DISTINCT * FROM mentors
    JOIN users ON users.id = user_id
    WHERE mentors.id = $1`;

    // const command = `
    // SELECT DISTINCT * FROM users
    // JOIN expertise ON expertise.id = user_id
    // WHERE users.id = $1`;

    const values = [req.params.id];
    db.query(command, values).then((data) => {
      res.json(data.rows);
    });
  });


  router.put("/:id", async(req, res) => {
    const { user_id, session_id } = req.params;
    const { rating, message } = req.body;
    console.log(req.body);
    db.query(
      `INSERT INTO mentor_reviews (mentee_id, mentor_id, rating, message) 
      VALUES(${user_id}, $1, $2, $3)`,
      [user_id, rating, message]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  return router;
};
