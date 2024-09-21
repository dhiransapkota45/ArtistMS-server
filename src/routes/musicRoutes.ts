import { MusicController } from "../controllers/musicController";
import express, { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Route } from "../types/route";
import { verifyToken } from "../middleware/verifyToken";
import { musicRoutes, userRoutes } from "./routes";
import { authorization } from "../middleware/authorization";
import { emptyNext } from "../middleware/emptyNext";
import { UserRoles } from "../data/constant";
import { validateMusic } from "../middleware/validation/musicValidation";

const { ARTIST, ARTIST_MANAGER, SUPER_ADMIN } = UserRoles

export class MusicRoute implements Route {
  private musicController: MusicController;
  router: express.Router = express.Router();
  path: string = "/music";

  constructor() {
    this.musicController = new MusicController();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get(`${this.path}`, verifyToken, authorization([SUPER_ADMIN, ARTIST_MANAGER, ARTIST]), asyncHandler(this.musicController.getAllMusic.bind(this.musicController)))

    this.router.get(`${this.path}/:id`, verifyToken, authorization([SUPER_ADMIN, ARTIST_MANAGER, ARTIST]), asyncHandler(this.musicController.getMusicByArtistId.bind(this.musicController)))

    this.router.post(`${this.path}/create`, verifyToken, authorization([ARTIST]), validateMusic(), this.musicController.createMusic.bind(this.musicController))

    this.router.patch(`${this.path}/update/:id`, verifyToken, authorization([ARTIST]), asyncHandler(this.musicController.updateMusic.bind(this.musicController)))

    this.router.delete(`${this.path}/delete/:id`, verifyToken, authorization([ARTIST]), asyncHandler(this.musicController.deleteMusic.bind(this.musicController)))
    console.log(`${this.path}/artist/:id`)
    this.router.get(`${this.path}/artist/:artist_id`, verifyToken, authorization([SUPER_ADMIN, ARTIST_MANAGER, ARTIST]), asyncHandler(this.musicController.getMusicByArtistId.bind(this.musicController)))
  }
}