import { ArtistController } from "../controllers/artistController";
import express, { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Route } from "../types/route";
import { verifyToken } from "../middleware/verifyToken";
import { artistRoutes } from "./routes";
import { authorization } from "../middleware/authorization";
import { emptyNext } from "../middleware/emptyNext";
import { UserRoles } from "../data/constant";
import { validateArtist } from "../middleware/validation/artistValidation";

const { ARTIST, ARTIST_MANAGER, SUPER_ADMIN } = UserRoles

export class ArtistRoute implements Route {
  private artistController: ArtistController;
  router: express.Router = express.Router();
  path: string = "/artist";

  constructor() {
    this.artistController = new ArtistController();
    this.setupRoutes();
  }

  setupRoutes() {
    // // this.router.post(`${this.path}/create`, asyncHandler(this.userController.createUser.bind(this.userController)));
    // artistRoutes.forEach((route) => {
    //   (this.router as any)[route.method](
    //     `${this.path}${route.path}`,
    //     // route.middleware ? [...route.middleware] : emptyNext,
    //     // authorization(route.allowedUsers),
    //     route.validation ? route.validation() : emptyNext,
    //     asyncHandler(
    //       (this.artistController as any)[route.action].bind(this.artistController)
    //     )
    //   );
    // });

    this.router.get(`${this.path}/`, verifyToken, authorization([SUPER_ADMIN, ARTIST_MANAGER]),  asyncHandler(this.artistController.getAllArtist.bind(this.artistController)));

    this.router.post(`${this.path}/create`, verifyToken, authorization([ARTIST_MANAGER]), validateArtist(), asyncHandler(this.artistController.createArtist.bind(this.artistController)));

    this.router.get(`${this.path}/:id`, verifyToken, authorization([SUPER_ADMIN, ARTIST_MANAGER, ARTIST]), asyncHandler(this.artistController.getArtist.bind(this.artistController)));

    this.router.patch(`${this.path}/update/:id`, verifyToken, authorization([ARTIST_MANAGER]), validateArtist(), asyncHandler(this.artistController.updateArtist.bind(this.artistController)));

    this.router.delete(`${this.path}/delete/:id`, verifyToken, authorization([ARTIST_MANAGER]), asyncHandler(this.artistController.deleteArtist.bind(this.artistController)));
  }
}
