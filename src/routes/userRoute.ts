import { UserController } from "../controllers/userController";
import express, { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Route } from "../types/route";
import { verifyToken } from "../middleware/verifyToken";
import { userRoutes } from "./routes";
import { authorization } from "../middleware/authorization";
import { emptyNext } from "../middleware/emptyNext";

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
    userRoutes.forEach((route) => {
      (this.router as any)[route.method](
        `${this.path}${route.path}`,
        route.middleware ? [...route.middleware] : emptyNext,
        authorization(route.allowedUsers),
        route.validation ? route.validation() : emptyNext,
        asyncHandler(
          (this.userController as any)[route.action].bind(this.userController)
        )
      );
    });
  }
}
