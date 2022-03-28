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
  //:id needs to equal the variable set to req.params
  router.put("/:id", async(req, res) => {
    const { id } = req.params;
    const { job_title, price, years_of_experience } = req.body;
    console.log(req.body);
    console.log("id,", req.params);
    db.query(
      `UPDATE mentors
        SET job_title = $1, price = $2, years_of_experience = $3
        WHERE mentors.id = $4  
        RETURNING *`,
      [job_title, price, years_of_experience, id]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  // RK - Route to add user in mentor table, update users table, and expertise table
  router.post("/new", (req, res) => {
    const { user_id, job_title, years_of_experience, price, specialties } =
      req.body;

    // Update mentor table to include user
    const queryMentor = `INSERT INTO mentors (user_id, job_title, years_of_experience, price) VALUES ($1, $2, $3, $4) RETURNING *`;

    db.query(queryMentor, [user_id, job_title, years_of_experience, price])
      .then((data) => {
        console.log("ADDED USER TO MENTOR TABLE.");
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });

    // Update users table (isMentor boolean)
    const queryUser = `UPDATE users SET mentor = true WHERE id = ${user_id} RETURNING *`;

    db.query(queryUser)
      .then((data) => {
        console.log("ADDED USER TO USER TABLE.");
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });

    // Update specialties table
    for (let i = 0; i < specialties.length; i++) {
      const querySkill = `INSERT INTO expertise (user_id, specialty) VALUES ($1, $2) RETURNING *;`;

      db.query(querySkill, [user_id, specialties[i]])
        .then((data) => {
          console.log("ADDED TO EXPERTISE TABLE.");
        })
        .catch((err) => {
          console.log("ERROR:", err);
        });
    }
  });

  router.get("/sessions", (req, res) => {
    db.query(`SELECT * FROM sessions`).then((data) => {
      res.json(data.rows);
    });
  });

  return router;
};
