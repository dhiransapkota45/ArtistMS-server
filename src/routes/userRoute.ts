import { UserController } from "../controllers/userController";
import  express from 'express';
import { asyncHandler } from "../utils/asyncHandler";
import { Route } from "../types/route";
import { verifyToken } from "../middleware/verifyToken";

export class UserRoute implements Route {
  private userController: UserController;
  router: express.Router = express.Router();
  path: string = "/user";
  
  constructor() {
    this.userController = new UserController();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post(`${this.path}/create`, verifyToken, asyncHandler(this.userController.createUser.bind(this.userController)));

    this.router.get(`${this.path}`, verifyToken, asyncHandler(this.userController.getAllUser.bind(this.userController)));

    this.router.delete(`${this.path}/delete/:id`, verifyToken, asyncHandler(this.userController.deleteUser.bind(this.userController)));

    this.router.patch(`${this.path}/update/:id`, verifyToken, asyncHandler(this.userController.updateUser.bind(this.userController)));

    this.router.get(`${this.path}/:id`, verifyToken, asyncHandler(this.userController.getUser.bind(this.userController)));
  }
}