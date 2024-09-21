import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import {
  TArtistOnlyPayload,
  TArtistPayload,
  TUserPayload,
} from "../../types/types";
import { EMAIL_REGEX } from "../../data/constant";

export const validateArtist = () => {
  return function (req: Request, res: Response, next: NextFunction) {
    const {
      first_name,
      email,
      gender,
      last_name,
      password,
      phone,
      role,
      dob,
      address,
      first_release_year,
      no_of_albums_released,
    } = req.body as TUserPayload & TArtistOnlyPayload;
    if (req.method.toUpperCase() === "POST") {
      if (!first_name || typeof last_name !== "string") {
        return ApiResponse.error(
          res,
          400,
          "Name is required and must be a string"
        );
      }

      if (!email || email.match(EMAIL_REGEX) === null) {
        return ApiResponse.error(res, 400, "Email is required");
      }

      if (!password || typeof password !== "string" || password.length < 8) {
        return ApiResponse.error(
          res,
          400,
          "Password is required and must be a string with at least 8 characters"
        );
      }

      if (!phone || typeof phone !== "string") {
        return ApiResponse.error(res, 400, "Phone is required");
      }

      if (
        !role ||
        (role !== "super_admin" &&
          role !== "artist_manager" &&
          role !== "artist")
      ) {
        return ApiResponse.error(
          res,
          400,
          "Role is required and must be either super_admin, artist_manager or artist"
        );
      }

      if (!gender || !["m", "f", "o"].includes(gender)) {
        return ApiResponse.error(
          res,
          400,
          "gender is required and must be either m, f or o"
        );
      }

      if (!last_name || typeof last_name !== "string") {
        return ApiResponse.error(
          res,
          400,
          "Name is required and must be a string"
        );
      }

      if (!dob || typeof dob !== "string") {
        return ApiResponse.error(res, 400, "Date of birth is required");
      }

      if (!address || typeof address !== "string") {
        return ApiResponse.error(
          res,
          400,
          "Address is required and must be a string"
        );
      }

      if (!first_release_year || typeof first_release_year !== "string") {
        return ApiResponse.error(res, 400, "First release year is required");
      }

      if (
        no_of_albums_released &&
        (typeof no_of_albums_released !== "string" ||
          Number(no_of_albums_released) < 0)
      ) {
        return ApiResponse.error(
          res,
          400,
          "Number of albums released must be a positive number"
        );
      }
    } else {
      if (first_name && typeof first_name !== "string") {
        return ApiResponse.error(res, 400, "First name must be a string");
      }

      if (email && email.match(EMAIL_REGEX) === null) {
        return ApiResponse.error(res, 400, "Email must be a valid email");
      }

      if (phone && typeof phone !== "string") {
        return ApiResponse.error(res, 400, "Phone is required");
      }

      if (role && !["super_admin", "artist_manager", "artist"].includes(role)) {
        return ApiResponse.error(
          res,
          400,
          "Role must be either super_admin, artist_manager or artist"
        );
      }

      if (dob && typeof dob !== "string") {
        return ApiResponse.error(res, 400, "Date of birth must be a string");
      }

      if (address && typeof address !== "string") {
        return ApiResponse.error(res, 400, "Address must be a string");
      }

      if (first_release_year && typeof first_release_year !== "string") {
        return ApiResponse.error(
          res,
          400,
          "First release year must be a number"
        );
      }

      if (
        no_of_albums_released &&
        (typeof no_of_albums_released !== "string" || no_of_albums_released < 0)
      ) {
        return ApiResponse.error(
          res,
          400,
          "Number of albums released must be a positive number"
        );
      }
    }
    next();
  };
};
