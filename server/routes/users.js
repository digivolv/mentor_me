const router = require("express").Router();

module.exports = (db) => {
  // all routes will go here
  router.get("/", (req, res) => {
    const command = "SELECT * FROM users";
    db.query(command).then((data) => {
      res.json(data.rows);
    });
  });

  // All sessions/reviews of a specifid "user"
  router.get("/:user_id/sessions/", (req, res) => {
    const { user_id } = req.params;
    db.query(
      `SELECT sessions.*, users.name as mentor_name 
      FROM sessions 
      JOIN users ON users.id = sessions.mentor_id 
      JOIN mentors ON mentors.user_id = users.id
      WHERE mentee_id = $1`,
      [user_id]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  // //route for specific session
  // router.get("/:user_id/sessions/:session_id", (req, res) => {
  //   const { user_id, session_id } = req.params;

  //   db.query(
  //     `SELECT sessions.*, users.name as mentor_name FROM sessions
  //     JOIN mentors on mentors.id = sessions.mentor_id
  //     JOIN users ON users.id = mentors.user_id
  //     WHERE mentee_id = $1
  //     AND sessions.id = $2`,
  //     [user_id, session_id]
  //   ).then((data) => {
  //     res.json(data.rows);
  //   });
  // });

  //Route for a specific session
  router.get(
    "/:user_id/mentors/:mentor_id/sessions/:session_id",
    (req, res) => {
      const { user_id, mentor_id, session_id } = req.params;
      //Example http://localhost:8080/users/4/mentors/1/sessions/1
      db.query(
        `SELECT sessions.*, users.name as name, users.mentor
        FROM sessions
        JOIN users ON users.id = sessions.mentor_id
        JOIN mentors ON mentors.user_id = users.id
        WHERE sessions.mentee_id = $1
        AND mentor_id = $2
        AND sessions.id = $3 UNION
        SELECT sessions.*, users.name as name , users.mentor
        FROM sessions
        JOIN users ON users.id = sessions.mentee_id
        AND sessions.id = $3`,
        [user_id, mentor_id, session_id]
      ).then((data) => {
        let result = data.rows[0];
        data.rows.map((item) => {
          if (item.mentor) {
            result.mentor_name = item.name;
          } else {
            result.mentee_name = item.name;
          }
        });
        res.json([result]);
      });
    }
  );

  // `SELECT sessions.*, users.name as mentor_name
  // FROM sessions
  // JOIN users ON users.id = sessions.mentor_id
  // JOIN mentors ON mentors.user_id = users.id
  // WHERE sessions.mentee_id = $1
  // AND mentor_id = $2
  // AND sessions.id = $3`,

  // SELECT sessions.*, users.name as name, users.mentor
  // FROM sessions
  // JOIN users ON users.id = sessions.mentor_id
  // JOIN mentors ON mentors.user_id = users.id
  // WHERE sessions.mentee_id = $1
  // AND mentor_id = $2
  // AND sessions.id = $3 UNION
  // SELECT sessions.*, users.name as name , users.mentor
  // FROM sessions
  // JOIN users ON users.id = sessions.mentee_id
  // AND sessions.id = $3

  //old query
  // `SELECT sessions.*, users.name as mentor_name
  // FROM sessions
  // JOIN users ON users.id = sessions.mentor_id
  // JOIN mentors ON mentors.user_id = users.id
  // WHERE sessions.mentee_id = $1
  // AND mentor_id = $2
  // AND sessions.id = $3`,

  //new query
  // SELECT sessions.*, users.name as name, users.mentor
  // FROM sessions
  // JOIN users ON users.id = sessions.mentor_id
  // JOIN mentors ON mentors.user_id = users.id
  // WHERE sessions.mentee_id = 4
  // AND mentor_id = 1
  // AND sessions.id = 1 UNION
  // SELECT sessions.*, users.name as name , users.mentor
  // FROM sessions
  // JOIN users ON users.id = sessions.mentee_id
  // AND sessions.id = 1

  //Route for adding a review and rating to a session
  router.post(
    "/:user_id/mentors/:mentor_id/sessions/:session_id",
    async (req, res) => {
      const { user_id, mentor_id, session_id } = req.params;
      const { rating, message } = req.body;
      console.log(req.body);
      db.query(
        `UPDATE sessions
        SET mentee_id = $1, mentor_id = $2, rating = $3, description = $4
        WHERE sessions.id = $5  
        RETURNING *`,
        [user_id, mentor_id, rating, message, session_id]
      ).then((data) => {
        res.json(data.rows);
      });
    }
  );

  return router;
};
