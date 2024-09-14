// -- Create the Music table
// CREATE TABLE IF NOT EXISTS "Music" (
//   id SERIAL PRIMARY KEY,
//   artist_id INT NOT NULL,
//   title VARCHAR(255) NOT NULL,
//   album_name VARCHAR(255) NOT NULL,
//   genre Genre NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

//   FOREIGN KEY (artist_id) REFERENCES "Artist"(id)
// );


// create a middleware function for validating above sql query for create and update
// take a look at the snippet from src/middleware/validation/artistValidation.ts:

import { NextFunction, Request, Response } from "express";
import { TMusicPayload } from "../../types/types";
import { ApiResponse } from "../../utils/ApiResponse";

export const validateMusic = () => {
  return function (req: Request, res: Response, next: NextFunction) {
    const { title, album_name, genre, artist_id } = req.body as TMusicPayload;
    if (req.method.toUpperCase() === "POST") {
      if (!title || typeof title !== "string") {
        return ApiResponse.error(
          res,
          400,
          "Title is required and must be a string"
        );
      }

      if (!album_name || typeof album_name !== "string") {
        return ApiResponse.error(
          res,
          400,
          "Album name is required and must be a string"
        );
      }

      if (!genre || typeof genre !== "string") {
        return ApiResponse.error(
          res,
          400,
          "Genre is required and must be a string"
        );
      }

        if (!artist_id || typeof artist_id !== "number") {
            return ApiResponse.error(
            res,
            400,
            "Artist id is required and must be a number"
            );
        }
    } else {
      if (title && typeof title !== "string") {
        return ApiResponse.error(res, 400, "Title must be a string");
      }

      if (album_name && typeof album_name !== "string") {
        return ApiResponse.error(res, 400, "Album name must be a string");
      }

      if (genre && typeof genre !== "string") {
        return ApiResponse.error(res, 400, "Genre must be a string");
      }
    }
    next();
  };
};
