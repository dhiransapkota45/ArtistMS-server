CREATE TYPE Gender AS ENUM ('m', 'f', 'o');
CREATE TYPE Genre AS ENUM ('rnb', 'country', 'classic', 'rock', 'jazz');
CREATE TYPE Role AS ENUM ('super_admin' , 'artist_manager', 'artist');

-- Create the User table
CREATE TABLE IF NOT EXISTS "User" (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(500) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  dob TIMESTAMP NOT NULL,
  gender Gender NOT NULL,
  address VARCHAR(255) NOT NULL,
  role Role NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email)
);

-- Create the Artist table
CREATE TABLE IF NOT EXISTS "Artist" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  dob TIMESTAMP NOT NULL,
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

  FOREIGN KEY (artist_id) REFERENCES "User"(id)
);

ALTER TABLE IF EXISTS public."Artist"
  ADD COLUMN user_id integer;

ALTER TABLE public."Artist"
  ADD CONSTRAINT "fk_artist_user_id"
  FOREIGN KEY (user_id)
  REFERENCES public."User" (id);

ALTER TABLE IF EXISTS public."User"
  ADD COLUMN created_by integer;


ALTER TABLE public."User"
  ADD CONSTRAINT "fk_user_created_by"
  FOREIGN KEY (created_by)
  REFERENCES public."User" (id);


ALTER TABLE public."Music"
  ADD CONSTRAINT "fk_music_user_id"
  FOREIGN KEY (artist_id)
  REFERENCES public."User" (id);