CREATE TYPE Gender AS ENUM ('m', 'f', 'o');
CREATE TYPE Genre AS ENUM ("rnb", "country", "classic", "rock", "jazz");

-- Create the User table
CREATE TABLE IF NOT EXISTS "User" (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(500) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  dob DATETIME NOT NULL,
  gender Gender NOT NULL,
  address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email)
);

-- Create the Artist table
CREATE TABLE IF NOT EXISTS "Artist" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  dob DATETIME NOT NULL,
  gender Gender,
  address VARCHAR(255) NOT NULL,
  first_release_year INT NOT NULL,
  no_of_albums_released INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Music table
CREATE TABLE IF NOT EXISTS "Music" (
  id SERIAL PRIMARY KEY,
  artist_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  album_name VARCHAR(255) NOT NULL,
  genre Genre NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (artist_id) REFERENCES "Artist"(id)
);
