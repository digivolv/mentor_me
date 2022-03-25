DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  mentor_id INTEGER REFERENCES mentors(id) on DELETE CASCADE,
  mentee_id INTEGER REFERENCES users(id) on DELETE CASCADE,
  mentor_confirmed BOOLEAN DEFAULT false,
  rating SMALLINT,
  description VARCHAR(255),
  date DATE,
  date_reviewed DATE,
  duration INTEGER NOT NULL
);

