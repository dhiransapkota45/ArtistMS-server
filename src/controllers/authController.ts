import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { ApiResponse } from "../utils/ApiResponse";
import { generateToken } from "../utils/generateToken";
import { hashPassword, verifyPassword } from "../utils/hashPassword";
import { UserRequest } from "../types/types";

export class AuthController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async login(req: Request, res: Response): Promise<any> {
    const isUserExists = await this.userService.getUserByEmail(req.body.email);
    if (!isUserExists) {
      return ApiResponse.error(res, 401, "Invalid Credentials");
    }

    const isPasswordMatch = await verifyPassword(
      req.body.password,
      isUserExists.password
    );
    if (!isPasswordMatch) {
      return ApiResponse.error(res, 401, "Invalid Credentials");
    }

    // generate access and refresh token
    const accessToken = generateToken(isUserExists, "access");
    const refreshToken = generateToken(isUserExists, "refresh");

    // add accesstoken and refresh token to user response
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    return ApiResponse.success(res, "Login success", { accessToken });
  }

  async register(req: Request, res: Response): Promise<any> {
    const { password } = req.body;

    const userExist = await this.userService.getUserByEmail(req.body.email);
    if (userExist) {
      return ApiResponse.error(res, 409, "User with that email already exist");
    }

    const hashedPassword = await hashPassword(password);
    const user = await this.userService.createUser({
      ...req.body,
      password: hashedPassword,
    });
    return ApiResponse.success(res, "User created successfully", user, 201);
  }

  async validateToken(req: UserRequest, res: Response): Promise<any> {
    let userToSend;
    if (req?.user) {
      const { password, ...userResponse } = req?.user;
      userToSend = userResponse;
    }
    return ApiResponse.success(res, "Token is valid", { user: userToSend });
  }
}
