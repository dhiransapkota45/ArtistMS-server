import { MusicController } from "../controllers/musicController";
import express, { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Route } from "../types/route";
import { verifyToken } from "../middleware/verifyToken";
import { musicRoutes, userRoutes } from "./routes";
import { authorization } from "../middleware/authorization";
import { emptyNext } from "../middleware/emptyNext";

export class MusicRoute implements Route {
  private musicController: MusicController;
  router: express.Router = express.Router();
  path: string = "/music";

  constructor() {
    this.musicController = new MusicController();
    this.setupRoutes();
  }

  setupRoutes() {
    musicRoutes.forEach((route) => {
      (this.router as any)[route.method](
        `${this.path}${route.path}`,
        route.middleware ? [...route.middleware] : emptyNext,
        authorization(route.allowedUsers),
        route.validation ? route.validation() : emptyNext,
        asyncHandler(
          (this.musicController as any)[route.action].bind(this.musicController)
        )
      );
    });
  }
}
