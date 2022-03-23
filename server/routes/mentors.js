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

  router.put("/:id", async(req, res) => {
    const { id } = req.params;
    const { job_title, price, years_of_experience } = req.body;
    console.log(req.body);
    db.query(
      // update users table
      // if it succeeds, update mentors table
      // if update mentor table succeeds, select from mentors table and return data to front end
      // user_id must be maintained
      // `UPDATE job_title, price, city, country
      // FROM mentors
      // JOIN users ON users.id = user_id
      // SET job_title = $1, price = $2, city = $3, country = $4
      //   WHERE mentors.id = $5
      //   RETURNING *`,
      `UPDATE mentors
      SET job_title = $1, price = $2, years_of_experience = $3
      WHERE mentors.id = $4
      RETURNING *`,
      [job_title, price, years_of_experience, id]
    ).then((data) => {
      res.json(data.rows);
    });
  }
  );
  return router;
};
