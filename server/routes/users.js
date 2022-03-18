// // -- routes/users.js
// const router = require("express").Router();

// // mock data
// const data = [
//   {
//     name: "Edwin",
//     hobby: "skateboarding",
//   },
//   {
//     name: "Jaeyoung",
//     url: "playing the piano",
//   },
// ];

// const usersRoutes = () => {
//   router.get("/", (req, res) => {
//     res.json(data);
//   });
//   return router;
// };

// module.exports = usersRoutes;
//////////

// -- routes/users.js
const router = require("express").Router();

module.exports = (db) => {
  // all routes will go here
  router.get("/", (req, res) => {
    const command = "SELECT * FROM users";
    db.query(command).then((data) => {
      res.json(data.rows);
    });
  });

  return router;
};
