DROP TABLE IF EXISTS users_favorites CASCADE;

CREATE TABLE users_favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NULL REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE

);