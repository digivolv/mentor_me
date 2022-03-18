DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE sessions (
  mentor_id INTEGER REFERENCES mentors(id) on DELETE CASCADE,
  mentee_id INTEGER REFERENCES users(id) on DELETE CASCADE,
  date DATE,
  duration INTEGER NOT NULL
);