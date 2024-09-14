import { UserService } from "../services/userService";
import type {Request, Response}  from "express"
import { ApiResponse } from "../utils/ApiResponse";
import { hashPassword } from "../utils/hashPassword";

export class UserController {
    private userService: UserService = new UserService();

    async createUser (req: Request, res: Response): Promise<any> {
        const { password } = req.body;

        const userExist = await this.userService.getUserByEmail(req.body.email);
        if (userExist) {
            return ApiResponse.error(res, 409, "User with that email already exist");
        }

        const hashedPassword = await hashPassword(password);
        const user = await this.userService.createUser({...req.body, password: hashedPassword});
        return ApiResponse.success(res, "User created successfully", user, 201);
    }

    async getAllUser (req: Request, res: Response): Promise<any> {
        const user = await this.userService.getAllUser();
        return ApiResponse.success(res, "Users retrieved successfully", user, 200);
    }

    async deleteUser (req: Request, res: Response): Promise<any> {
        const user = await this.userService.deleteUserById(Number(req.params.id));
        return ApiResponse.success(res, "User deleted successfully", user, 200);
    }

    async updateUser (req: Request, res: Response): Promise<any> {

        const userExist = await this.userService.getUserById(Number(req.params.id));
        if (!userExist) {
            return ApiResponse.error(res, 404, "User not found");
        }

        const user = await this.userService.updateUserById(Number(req.params.id), req.body);
        return ApiResponse.success(res, "User updated successfully", user, 200);
    }

    async getUser (req: Request, res: Response): Promise<any> {
        const user = await this.userService.getUserById(Number(req.params.id));
        return ApiResponse.success(res, "User retrieved successfully", user, 200);
    }
}