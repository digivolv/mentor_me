DROP TABLE IF EXISTS mentors CASCADE;
-- CREATE URLS
CREATE TABLE mentors (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  job_title VARCHAR(255),
  years_of_experience INTEGER NOT NULL,
  price INTEGER NOT NULL
);