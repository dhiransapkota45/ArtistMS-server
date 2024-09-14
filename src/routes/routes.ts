import { UserRoles } from "../data/constant";
import { verifyToken } from "../middleware/verifyToken";

type Route = {
    path : string;
    method : 'get' | 'post' | 'put' | 'delete' | 'patch';
    action : string;
    middleware : any[];
    allowedUsers : string[];
}

const { ARTIST, ARTIST_MANAGER, SUPER_ADMIN } = UserRoles
export const userRoutes : Route[] = [ 
  {
    path: "/",
    method: "get",
    action: "getAllUser",
    middleware: [verifyToken],
    allowedUsers: [SUPER_ADMIN],
  },
  {
    path: "/delete/:id",
    method: "delete",
    action: "deleteUser",
    middleware: [verifyToken],
    allowedUsers: [SUPER_ADMIN],
  },
  {
    path: "/update/:id",
    method: "patch",
    action: "updateUser",
    middleware: [verifyToken],
    allowedUsers: [SUPER_ADMIN],
  },
  {
    path: "/:id",
    method: "get",
    action: "getUser",
    middleware: [verifyToken],
    allowedUsers: [SUPER_ADMIN]
  },
  {
    path: "/create",
    method: "post",
    action: "createUser",
    middleware: [verifyToken],
    allowedUsers: [SUPER_ADMIN],
  },
];
