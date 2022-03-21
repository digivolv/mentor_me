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

  router.get("/:user_id/sessions/", (req, res) => {
    const { user_id } = req.params;
    db.query(
      `SELECT sessions.*, users.name as mentor_name FROM sessions 
      JOIN mentors on mentors.id = sessions.mentor_id 
      JOIN users ON users.id = mentors.user_id 
      WHERE mentee_id = $1`,
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

  router.post("/:user_id/sessions/:session_id", async (req, res) => {
    const { user_id, session_id } = req.params;
    const { rating, message } = req.body;
    console.log(req.body);
    db.query(
      `INSERT INTO mentor_reviews (user_id, rating, message) VALUES($1, $2, $3)`,
      [user_id, rating, message]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  return router;
};
