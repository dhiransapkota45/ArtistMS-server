import { Router } from "express";
import { Route } from "./routes";
import { emptyNext } from "../middleware/emptyNext";
import { authorization } from "../middleware/authorization";
import { asyncHandler } from "../utils/asyncHandler";
import { Route as RouterInterface } from "../types/route";


export class BaseRoute implements RouterInterface {
  routes: Route[];
  router: Router;
  path: string;
  constructor(routes: Route[], router: Router, path: string) {
    this.routes = routes;
    this.router = router;
    this.path = path;
    this.setupRoutes();
  }

  setupRoutes() {
    this.routes.forEach((route) => {
      (this.router as any)[route.method](
        `${this.path}${route.path}`,
        route.middleware ? [...route.middleware] : emptyNext,
        authorization(route.allowedUsers),
        route.validation ? route.validation() : emptyNext,
        asyncHandler((this as any)[route.action].bind(this))
      );
    });
  }
}
