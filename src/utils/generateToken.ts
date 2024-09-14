import jwt from "jsonwebtoken";
import env from "../config/env";

export const generateToken = (payload: number, type : "access" | "refresh") => {
    return jwt.sign({ userid: payload }, env.JWT_SECRET as string, {
      expiresIn: type === "access" ? "2h" : "7d",
    });
}