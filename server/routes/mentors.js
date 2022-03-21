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

  return router;
};
