import { Request, Response, NextFunction } from "express";
import { EMAIL_REGEX } from "../../data/constant";
import { ApiResponse } from "../../utils/ApiResponse";

const validGenders = ["m", "f", "o"];
const validRoles = ["super_admin", "artist_manager", "artist"];

export const validateUser = () => {
  return function (req: Request, res: Response, next: NextFunction) {
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      dob,
      gender,
      address,
      role,
    } = req.body;
    if (req.method.toUpperCase() === "POST") {
      if (!first_name || typeof first_name !== "string") {
        return ApiResponse.error(
          res,
          400,
          "First name is required and must be a string"
        );
      }

      if (!last_name || typeof last_name !== "string") {
        return ApiResponse.error(
          res,
          400,
          "Last name is required and must be a string"
        );
      }

      if (!email || !EMAIL_REGEX.test(email)) {
        return ApiResponse.error(res, 400, "Invalid email format");
      }

      if (!password || password.length < 8) {
        return ApiResponse.error(
          res,
          400,
          "Password must be at least 8 characters long"
        );
      }

      if (
        !phone ||
        typeof phone !== "string" ||
        phone.length < 10 ||
        phone.length > 20
      ) {
        return ApiResponse.error(
          res,
          400,
          "Phone number must be between 10 and 20 characters"
        );
      }

      const dateOfBirth = new Date(dob);
      if (isNaN(dateOfBirth.getTime())) {
        return ApiResponse.error(res, 400, "Invalid date of birth");
      }

      if (!gender || !validGenders.includes(gender)) {
        return ApiResponse.error(
          res,
          400,
          `Gender must be one of: ${validGenders.join(", ")}`
        );
      }

      if (!address || typeof address !== "string") {
        return ApiResponse.error(
          res,
          400,
          "Address is required and must be a string"
        );
      }

      if (!role || !validRoles.includes(role)) {
        return ApiResponse.error(
          res,
          400,
          `Role must be one of: ${validRoles.join(", ")}`
        );
      }
    } else {
      if (first_name && typeof first_name !== "string") {
        return ApiResponse.error(res, 400, "First name must be a string");
      }

      if (last_name && typeof last_name !== "string") {
        return ApiResponse.error(res, 400, "Last name must be a string");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        return ApiResponse.error(res, 400, "Invalid email format");
      }

      if (password && password.length < 8) {
        return ApiResponse.error(
          res,
          400,
          "Password must be at least 8 characters long"
        );
      }

      if (
        phone &&
        (typeof phone !== "string" || phone.length < 10 || phone.length > 20)
      ) {
        return ApiResponse.error(
          res,
          400,
          "Phone number must be between 10 and 20 characters"
        );
      }

      if (dob) {
        const dateOfBirth = new Date(dob);
        if (isNaN(dateOfBirth.getTime())) {
          return ApiResponse.error(res, 400, "Invalid date of birth");
        }
      }

      if (gender && !validGenders.includes(gender)) {
        return ApiResponse.error(
          res,
          400,
          `Gender must be one of: ${validGenders.join(", ")}`
        );
      }

      if (address && typeof address !== "string") {
        return ApiResponse.error(res, 400, "Address must be a string");
      }

      if (role && !validRoles.includes(role)) {
        return ApiResponse.error(
          res,
          400,
          `Role must be one of: ${validRoles.join(", ")}`
        );
      }
    }

    next();
  };
};
