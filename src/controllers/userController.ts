import { UserService } from "../services/userService";
import type { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { hashPassword } from "../utils/hashPassword";
import { DEFAULT_LIMIT, UserRoles } from "../data/constant";
import { TUser, UserRequest } from "../types/types";

export class UserController {
  private userService: UserService = new UserService();

  async createUser(req: UserRequest, res: Response): Promise<any> {
    const { password } = req.body;

    if (req.body.role !== UserRoles.ARTIST_MANAGER) {
      return ApiResponse.error(
        res,
        400,
        "Not allowed to create user with that role"
      );
    }

    const userExist = await this.userService.getUserByEmail(req.body.email);
    if (userExist) {
      return ApiResponse.error(res, 409, "User with that email already exist");
    }

    const hashedPassword = await hashPassword(password);
    const user = await this.userService.createUser({
      ...req.body,
      password: hashedPassword,
      created_by: req?.user?.id ?? null,
    });
    return ApiResponse.success(res, "User created successfully", user, 201);
  }

  async getAllUser(req: UserRequest, res: Response): Promise<any> {
    const user = await this.userService.getAllUser({
      limit: parseInt((req?.query?.limit as string) ?? DEFAULT_LIMIT),
      offset: parseInt((req?.query?.offset as string) ?? 0),
      user: req?.user || {} as TUser,
    });
    return ApiResponse.success(res, "Users retrieved successfully", user, 200);
  }

  async deleteUser(req: Request, res: Response): Promise<any> {
    
    const user = await this.userService.deleteUserById(Number(req.params.id));
    return ApiResponse.success(res, "User deleted successfully", user, 200);
  }

  async updateUser(req: Request, res: Response): Promise<any> {
    const userExist = await this.userService.getUserById(Number(req.params.id));
    if (!userExist) {
      return ApiResponse.error(res, 404, "User not found");
    }

    const user = await this.userService.updateUserById(
      Number(req.params.id),
      req.body
    );
    return ApiResponse.success(res, "User updated successfully", user, 200);
  }

  async getUser(req: Request, res: Response): Promise<any> {
    const user = await this.userService.getUserById(Number(req.params.id));
    return ApiResponse.success(res, "User retrieved successfully", user, 200);
  }
  
}
