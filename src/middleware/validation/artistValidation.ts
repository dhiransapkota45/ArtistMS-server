import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { TArtistPayload } from "../../types/types";

export const validateArtist = () => {
  return function (req: Request, res: Response, next: NextFunction) {
    const { name, dob, address, first_release_year, no_of_albums_released } =
      req.body as TArtistPayload;
    if (req.method.toUpperCase() === "POST") {
      if (!name || typeof name !== "string") {
        return ApiResponse.error(
          res,
          400,
          "Name is required and must be a string"
        );
      }

      if (!dob || typeof dob !== "string") {
        return ApiResponse.error(
          res,
          400,
          "Date of birth is required"
        );
      }

      if (!address || typeof address !== "string") {
        return ApiResponse.error(
          res,
          400,
          "Address is required and must be a string"
        );
      }

      if (!first_release_year || typeof first_release_year !== "string") {
        return ApiResponse.error(
          res,
          400,
          "First release year is required"
        );
      }

      if (
        no_of_albums_released &&
        (typeof no_of_albums_released !== "string" || Number(no_of_albums_released) < 0)
      ) {
        return ApiResponse.error(
          res,
          400,
          "Number of albums released must be a positive number"
        );
      }
    } else {
      if (name && typeof name !== "string") {
        return ApiResponse.error(res, 400, "Name must be a string");
      }

      if (dob && typeof dob !== "string") {
        return ApiResponse.error(res, 400, "Date of birth must be a string");
      }

      if (address && typeof address !== "string") {
        return ApiResponse.error(res, 400, "Address must be a string");
      }

      if (first_release_year && typeof first_release_year !== "number") {
        return ApiResponse.error(
          res,
          400,
          "First release year must be a number"
        );
      }

      if (
        no_of_albums_released &&
        (typeof no_of_albums_released !== "number" || no_of_albums_released < 0)
      ) {
        return ApiResponse.error(
          res,
          400,
          "Number of albums released must be a positive number"
        );
      }
    }
    console.log("validation passed");
    next();
  };
};
