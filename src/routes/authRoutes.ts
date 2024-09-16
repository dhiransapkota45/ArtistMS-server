import { UserController } from "../controllers/userController";
import  express from 'express';
import { asyncHandler } from "../utils/asyncHandler";
import { Route } from "../types/route";
import { AuthController } from "../controllers/authController";
import { verifyToken } from "../middleware/verifyToken";

export class AuthRoute implements Route {
  private authController: AuthController;
  router: express.Router = express.Router();
  path: string = "/auth";
  
  constructor() {
    this.authController = new AuthController();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post(`${this.path}/login`, asyncHandler(this.authController.login.bind(this.authController)));
    this.router.post(`${this.path}/register`, asyncHandler(this.authController.register.bind(this.authController)));
    this.router.get(`${this.path}/validate-token`, verifyToken, asyncHandler(this.authController.validateToken.bind(this.authController)));
  }
}