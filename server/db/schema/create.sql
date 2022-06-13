DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS users_favorites CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;



CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE users_favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NULL REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR(255) NOT NULL
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER NULL REFERENCES categories(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  ingredient TEXT,
  directions TEXT,
  image TEXT,
  prep_time VARCHAR(255) NOT NULL,
  portion_size VARCHAR(255) NOT NULL,
  difficulty VARCHAR(255) NOT NULL
);