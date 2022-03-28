const router = require("express").Router();

module.exports = (db) => {
  // all routes will go here
  router.get("/", (req, res) => {
    const command = "SELECT * FROM users";
    db.query(command).then((data) => {
      res.json(data.rows);
    });
  });

  // GRAB ALL MENTORS FROM USERS TABLE
  router.get("/mentors", (req, res) => {
    const { user_id } = req.params;
    db.query(
      `SELECT * 
      FROM users
      WHERE mentor IS TRUE`
    ).then((data) => {
      res.json(data.rows);
    });
  });

  // All information of a specifid "user", sort by ID
  router.get("/:user_id/", (req, res) => {
    const { user_id } = req.params;
    db.query(
      `SELECT * 
      FROM users
      WHERE id = $1`,
      [user_id]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  // router.get("/:user_id/mentor/:mentor_id/form", (req, res) => {
  //       const { user_id } = req.params;
  //       db.query(
  //         `SELECT *
  //         FROM users
  //         WHERE id = $1`,
  //         [user_id]
  //       ).then((data) => {
  //         res.json(data.rows);
  //       });
  //     });

  // router.post("/:user_id/form/new", (req, res) => {
  //   const { user_id } = req.params;
  //   db.query(
  //     `SELECT *
  //   FROM users
  //   WHERE id = $1`,
  //     [user_id]
  //   ).then((data) => {
  //     res.json(data.rows);
  //   });
  // });

  // All sessions/reviews of a specifid "user" MENTEE, sort by ID
  router.get("/:user_id/sessions/", (req, res) => {
    const { user_id } = req.params;
    db.query(
      `SELECT sessions.*, users.name as mentor_name, users.picture as picture
      FROM sessions 
      JOIN users ON users.id = sessions.mentor_id 
      JOIN mentors ON mentors.user_id = users.id
      WHERE mentee_id = $1`,
      [user_id]
    ).then((data) => {
      let sortedDataById = data.rows.sort(function (a, b) {
        return b.id - a.id;
      });
      res.json(sortedDataById);
    });
  });

  /// ALL SESSIONS FOR MENTOR TEMPORARY ROUTE NAME *** *****************
  router.get("/:user_id/mentors/sessions/", (req, res) => {
    const { user_id } = req.params;
    db.query(
      `SELECT sessions.*, users.name as mentee_name, users.picture as picture
      FROM sessions 
      JOIN users ON users.id = sessions.mentee_id 
      JOIN mentors ON mentors.user_id = sessions.mentor_id
      WHERE mentor_id = $1`,
      [user_id]
    ).then((data) => {
      let sortedDataById = data.rows.sort(function (a, b) {
        return b.id - a.id;
      });
      res.json(sortedDataById);
    });
  });

  router.post("/:user_id/sessions/new", (req, res) => {
    const { user_id } = req.params;
    const { mentor_id, mentee_id, mentor_confirmed, date, duration, time } =
      req.body;
    db.query(
      ` INSERT INTO sessions (mentor_id, mentee_id, mentor_confirmed, date, duration, time)
        VALUES
      ($1, $2, $3, $4, $5, $6)`,
      [mentor_id, mentee_id, mentor_confirmed, date, duration, time]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  router.put("/:user_id/sessions/confirm", (req, res) => {
    const { mentor_confirmed, session_id } = req.body;
    db.query(
      `UPDATE sessions
        SET mentor_confirmed = $1
        WHERE sessions.id = $2  
        RETURNING *`,
      [mentor_confirmed, session_id]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  router.delete("/:user_id/sessions/delete", (req, res) => {
    const { session_id } = req.body;
    db.query(
      `DELETE FROM sessions
        WHERE sessions.id = $1 `,
      [session_id]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  // router.post("/:user_id/sessions/new", (req, res) => {
  //   const { user_id } = req.params;
  //   const { mentor_id, mentor_confirmed, duration } = req.body;
  //   db.query(
  //     ` INSERT INTO sessions (mentor_id, mentor_confirmed, duration)
  //       VALUES
  //     ($1, $2, $3)  `,
  //     [mentor_id, mentor_confirmed, duration]
  //   ).then((data) => {
  //     res.json(data.rows);
  //   });
  // });

  // // All sessions/reviews of a specifid "user", sort by ID
  // router.get("/:user_id/sessions/pending", (req, res) => {
  //   const { user_id } = req.params;
  //   db.query(
  //     `SELECT sessions.*, users.name as mentor_name, users.picture as picture
  //       FROM sessions
  //       JOIN users ON users.id = sessions.mentor_id
  //       JOIN mentors ON mentors.user_id = users.id
  //       WHERE mentee_id = $1
  //       AND `,
  //     [user_id]
  //   ).then((data) => {
  //     let sortedDataById = data.rows.sort(function(a, b) {
  //       return b.id - a.id;
  //     });
  //     res.json(sortedDataById);
  //   });
  // });

  //session review page for a specific session
  router.get("/:user_id/sessions/:session_id", (req, res) => {
    const { user_id, session_id } = req.params;
    db.query(
      `SELECT sessions.*, users.name as name, users.mentor, picture
      FROM sessions
      JOIN users ON users.id = sessions.mentor_id
      JOIN mentors ON mentors.user_id = users.id
      WHERE sessions.mentee_id = $1
      AND sessions.id = $2
      UNION
      SELECT sessions.*, users.name as name , users.mentor
      FROM sessions
      JOIN users ON users.id = sessions.mentee_id
      AND sessions.id = $2
`,
      [user_id, session_id]
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
  });

  //Route for MENTEE adding a review and rating to a session +++++
  router.put("/:user_id/sessions/:session_id", async (req, res) => {
    // const { user_id, mentor_id, session_id } = req.params;
    const { user_id } = req.params;
    const { mentor_id, rating, description, id } = req.body;
    console.log(req.body);
    db.query(
      `UPDATE sessions
        SET mentee_id = $1, mentor_id = $2, rating = $3, description = $4
        WHERE sessions.id = $5  
        RETURNING *`,
      [user_id, mentor_id, rating, description, id]
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

  //session review page for a specific session with mentor id in the params
  router.get(
    "/:user_id/mentors/:mentor_id/sessions/:session_id",
    (req, res) => {
      const { user_id, mentor_id, session_id } = req.params;
      //Example http://localhost:8080/users/4/mentors/1/sessions/1
      db.query(
        `SELECT sessions.*, users.name as name, users.mentor, picture
        FROM sessions
        JOIN users ON users.id = sessions.mentor_id
        JOIN mentors ON mentors.user_id = users.id
        WHERE sessions.mentee_id = $1
        AND mentor_id = $2
        AND sessions.id = $3 UNION
        SELECT sessions.*, users.name as name , users.mentor, picture
        FROM sessions
        JOIN users ON users.id = sessions.mentee_id
        AND sessions.id = $3`,
        [user_id, mentor_id, session_id]
      ).then((data) => {
        let result = data.rows[0];
        data.rows.map((item) => {
          if (item.mentor) {
            result.mentor_name = item.name;
            result.picture = item.picture;
          } else {
            result.mentee_name = item.name;
          }
        });
        res.json([result]);
      });
    }
  );

  //Route for adding a review and rating to a session
  router.put(
    "/:user_id/mentors/:mentor_id/sessions/:session_id",
    async (req, res) => {
      const { user_id, mentor_id, session_id } = req.params;
      const { rating, description } = req.body;
      console.log(req.body);
      db.query(
        `UPDATE sessions
        SET mentee_id = $1, mentor_id = $2, rating = $3, description = $4
        WHERE sessions.id = $5  
        RETURNING *`,
        [user_id, mentor_id, rating, description, session_id]
      ).then((data) => {
        res.json(data.rows);
      });
    }
  );

  // RK - Route for updating if user is a mentor boolean
  router.patch("/:user_id", async (req, res) => {
    const { user_id } = req.params;
    const mentor = req.body.mentor;
    // console.log("accessing BE");
    db.query(`UPDATE users SET mentor = $1 WHERE id = $2 RETURNING *`, [
      mentor,
      user_id,
    ])
      .then((data) => {
        // console.log("Success updated user table");
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //COUNT of all sessions where mentor_confirmed
  router.get("/:user_id/mentor_confirmed", (req, res) => {
    const { user_id } = req.params;
    db.query(
      `SELECT COUNT(*)
      FROM sessions
      WHERE mentor_id = $1
      AND mentor_confirmed IS FALSE
     `,
      [user_id]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  return router;
};
