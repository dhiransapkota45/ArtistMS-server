import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { ApiResponse } from "../utils/ApiResponse";
import { generateToken } from "../utils/generateToken";
import { verifyPassword } from "../utils/hashPassword";

export class AuthController {
    private userService : UserService;
    constructor() {
        this.userService = new UserService();
    }
  
    async login(req: Request, res: Response) : Promise<any> {
        const isUserExists = await this.userService.getUserByEmail(req.body.email);
        if(!isUserExists) {
            return ApiResponse.error(res, 404, "Invalid Credentials",);
        }

        const isPasswordMatch = await verifyPassword(req.body.password, isUserExists.password);
        if(!isPasswordMatch) {
            return ApiResponse.error(res, 401, "Invalid Credentials",);
        }

        // generate access and refresh token
        const accessToken = generateToken(isUserExists.id, 'access');
        const refreshToken = generateToken(isUserExists.id, 'refresh');

        // add accesstoken and refresh token to user response
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        return ApiResponse.success(res, "Login success", { accessToken });
    }

    async register(req: Request, res: Response) : Promise<any> {
        const user = await this.userService.createUser(req.body);
        return ApiResponse.success(res, "User created successfully", user)
    }
}