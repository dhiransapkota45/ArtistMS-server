import { UserRoles } from "../data/constant";
import { validateArtist } from "../middleware/validation/artistValidation";
import { validateUser } from "../middleware/validation/userValidation";
import { verifyToken } from "../middleware/verifyToken";

export type Route = {
    path : string;
    method : 'get' | 'post' | 'put' | 'delete' | 'patch';
    action : string;
    middleware : any[];
    allowedUsers : string[];
    validation ?: Function
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
    validation : validateUser
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
    validation : validateUser
  },
];


export const artistRoutes : Route[] = [
  {
    path: "/",
    method: "get",
    action: "getAllArtist",
    middleware: [verifyToken],
    allowedUsers: [SUPER_ADMIN],
  },
  {
    path: "/delete/:id",
    method: "delete",
    action: "deleteArtist",
    middleware: [verifyToken],
    allowedUsers: [SUPER_ADMIN],
  },
  {
    path: "/update/:id",
    method: "patch",
    action: "updateArtist",
    middleware: [verifyToken],
    allowedUsers: [SUPER_ADMIN],
    validation : validateArtist
  },
  {
    path: "/:id",
    method: "get",
    action: "getArtist",
    middleware: [verifyToken],
    allowedUsers: [SUPER_ADMIN]
  },
  {
    path: "/create",
    method: "post",
    action: "createArtist",
    middleware: [verifyToken],
    allowedUsers: [SUPER_ADMIN],
    validation : validateArtist
  }
]
