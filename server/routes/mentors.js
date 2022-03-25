// duplicate with JK
const router = require("express").Router();

module.exports = (db) => {
  // all routes will go here
  router.get("/", (req, res) => {
    const command = `SELECT * FROM mentors
    JOIN users ON users.id = user_id`;
    db.query(command).then((data) => {
      res.json(data.rows);
    });
  });

  router.get("/expertise", (req, res) => {
    const command = `
    SELECT * FROM users
    JOIN mentors ON mentors.user_id = users.id
    JOIN expertise ON expertise.user_id = users.id`;
    db.query(command).then((data) => {
      res.json(data.rows);
    });
  });

  router.get("/expertise/:id", (req, res) => {
    const command = `
    SELECT DISTINCT * FROM users
    JOIN mentors ON mentors.user_id = users.id
    JOIN expertise ON expertise.user_id = users.id
    WHERE users.id = $1`;
    const values = [req.params.id];
    db.query(command, values).then((data) => {
      res.json(data.rows);
    });
  });

  router.put("/:id", async (req, res) => {
    const { mentor_id } = req.params;
    const { job_title, price, city, country } = req.body;
    console.log(req.body);
    db.query(
      `UPDATE mentors
        SET job_title = $1, price = $2, city = $3, country = $4
        WHERE mentors.id = $5  
        RETURNING *`,
      [job_title, price, city, country, mentor_id]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  router.post("/", (req, res) => {
    const queryStr = `INSERT INTO mentors (user_id, job_title, years_of_experience, price) VALUES ($1, $2, $3, $4) RETURNING *;`;

    const { user_id, job_title, years_of_experience, price } = req.body;

    const values = [user_id, job_title, years_of_experience, price];

    db.query(queryStr, values)
      .then((data) => {
        console.log("Added new mentors to mentor table!");
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  });

  return router;
};
