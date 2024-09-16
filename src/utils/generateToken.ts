import jwt from "jsonwebtoken";
import env from "../config/env";
import { TUser } from "../types/types";

export const generateToken = (payload: TUser, type: "access" | "refresh") => {
  let userToSend;
  if (payload) {
    const { password, ...userResponse } = payload;
    userToSend = userResponse;
  }
  return jwt.sign({ user: userToSend }, env.JWT_SECRET as string, {
    expiresIn: type === "access" ? "2h" : "7d",
  });
};
