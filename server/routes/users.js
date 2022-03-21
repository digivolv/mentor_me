const router = require("express").Router();

module.exports = (db) => {
  // all routes will go here
  router.get("/", (req, res) => {
    const command = "SELECT * FROM users";
    db.query(command).then((data) => {
      res.json(data.rows);
    });
  });

  //route for all sessions for specific user
  // router.get("/:user_id/sessions/", (req, res) => {
  //   const { user_id } = req.params;
  //   db.query(
  //     `SELECT sessions.* FROM sessions
  //   JOIN users ON users.id = sessions.mentee_id
  //   WHERE users.id = $1`,
  //     [user_id]
  //   ).then((data) => {
  //     res.json(data.rows);
  //   });
  // });

  // -- users/:id/sessions/:session_id
  // -- users/:id/mentors/:mentor_id/sessions/:session_id
  // -- users/:id/mentees/:mentee_id/sessions/:session_id

  // router.get("/:user_id/sessions/", (req, res) => {
  //   const { user_id } = req.params;
  //   db.query(
  //     `SELECT sessions.*, users.name as mentor_name, mentor_reviews.rating as rating, mentor_reviews.message as review FROM sessions
  //     JOIN mentors on mentors.id = sessions.mentor_id
  //     JOIN users ON users.id = mentors.user_id
  //     JOIN mentor_reviews ON mentor_reviews.mentor_id = mentors.user_id
  //     WHERE mentee_id = $1`,
  //     [user_id]
  //   ).then((data) => {
  //     res.json(data.rows);
  //   });
  // });
  // le name "users" specified more than on
  router.get("/:user_id/sessions/", (req, res) => {
    const { user_id } = req.params;
    db.query(
      `SELECT sessions.*, users.name as mentor_name, mentor_reviews.rating as rating, mentor_reviews.message as review 
      FROM sessions 
      JOIN users ON users.id = sessions.mentor_id 
      JOIN mentors ON mentors.user_id = users.id
      JOIN mentor_reviews ON mentor_reviews.mentor_id = users.id
      WHERE mentor_reviews.mentee_id = $1`,
      [user_id]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  //route for specific session session id of specific user
  router.get("/:user_id/sessions/:session_id", (req, res) => {
    const { user_id, session_id } = req.params;
    //works for mentee_name
    // db.query("SELECT sessions.*, users.name as mentee_name FROM sessions JOIN users on users.id = sessions.mentee_id WHERE sessions.id = $1", [user_id]).then((data) => {

    // db.query(`SELECT sessions.*, users.name as mentee_name, users.name as mentor_name
    // FROM sessions
    // JOIN users on users.id = sessions.mentee_id
    // JOIN mentors on mentors.id = sessions.mentor_id W
    // HERE users.id = $1 AND sessions.id = $2`, [user_id, session_id]).then((data) => {

    //works for mentor_name
    db.query(
      `SELECT sessions.*, users.name as mentor_name FROM sessions 
      JOIN mentors on mentors.id = sessions.mentor_id 
      JOIN users ON users.id = mentors.user_id 
      WHERE mentee_id = $1 
      AND sessions.id = $2`,
      [user_id, session_id]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  router.get(
    "/:user_id/mentors/:mentor_id/sessions/:session_id",
    (req, res) => {
      const { user_id, mentor_id, session_id } = req.params;
      //Example http://localhost:8080/users/4/mentors/1/sessions/1
      db.query(
        `SELECT sessions.*, users.name as mentor_name 
        FROM sessions 
        JOIN users ON users.id = sessions.mentor_id 
        JOIN mentors ON mentors.user_id = users.id
        WHERE sessions.mentee_id = $1 
        AND mentor_id = $2
        AND sessions.id = $3`,
        [user_id, mentor_id, session_id]
      ).then((data) => {
        res.json(data.rows);
      });
    }
  );

  // router.post("/:user_id/sessions/:session_id", async (req, res) => {
  //   const { user_id, session_id } = req.params;
  //   const { rating, message } = req.body;
  //   console.log(req.body);
  //   db.query(
  //     `INSERT INTO mentor_reviews (mentee_id, mentor_id, rating, message) VALUES(${user_id}, $1, $2, $3)`,
  //     [user_id, rating, message]
  //   ).then((data) => {
  //     res.json(data.rows);
  //   });
  // });

  router.post(
    "/:user_id/mentors/:mentor_id/sessions/:session_id",
    async (req, res) => {
      const { user_id, mentor_id, session_id } = req.params;
      const { rating, message } = req.body;
      console.log(req.body);
      db.query(
        `INSERT INTO mentor_reviews (mentee_id, mentor_id, rating, message) VALUES($1, $2, $3, $4)`,
        [user_id, mentor_id, rating, message]
      ).then((data) => {
        res.json(data.rows);
      });
    }
  );

  return router;
};
