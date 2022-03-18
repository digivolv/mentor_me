-- schema/01_create_users.sql
DROP TABLE IF EXISTS users CASCADE;
-- CREATE USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255),
  phone INTEGER,
  city VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  mentor BOOLEAN,
  picture VARCHAR(255) NOT NULL
);