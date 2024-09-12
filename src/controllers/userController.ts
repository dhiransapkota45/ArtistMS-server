import { UserService } from "../services/userService";
import type {Request, Response}  from "express"

export class UserController {
    private userService: UserService = new UserService();

    async createUser (req: Request, res: Response): Promise<any> {
        const user = await this.userService.createUser(req.body);
        return res.status(201).json(user)
    }
}