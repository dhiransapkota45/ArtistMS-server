import { UserController } from "../controllers/userController";
import  express, { NextFunction, Request, Response } from 'express';
import { asyncHandler } from "../utils/asyncHandler";
import { Route } from "../types/route";
import { verifyToken } from "../middleware/verifyToken";
import { userRoutes } from "./routes";
import { authorization } from "../middleware/authorization";

export class UserRoute implements Route {
  private userController: UserController;
  router: express.Router = express.Router();
  path: string = "/user";
  
  constructor() {
    this.userController = new UserController();
    this.setupRoutes();
  }

  setupRoutes() {
    // this.router.post(`${this.path}/create`, asyncHandler(this.userController.createUser.bind(this.userController)));

    // this.router.get(`${this.path}`, asyncHandler(this.userController.getAllUser.bind(this.userController)));

    // this.router.delete(`${this.path}/delete/:id`, asyncHandler(this.userController.deleteUser.bind(this.userController)));

    // this.router.patch(`${this.path}/update/:id`, asyncHandler(this.userController.updateUser.bind(this.userController)));

    // this.router.get(`${this.path}/:id`, asyncHandler(this.userController.getUser.bind(this.userController)));

    userRoutes.forEach((route) => {
      if (route.middleware) {
        (this.router as any)[route.method](`${this.path}${route.path}`, [...route.middleware], 
          (req : Request, res : Response, next : NextFunction) => authorization(req, res, next, route.allowedUsers),
          asyncHandler((this.userController as any)[route.action].bind(this.userController)));
      }
    });
  }
}