import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/types";
import { ApiResponse } from "../utils/ApiResponse";

export const authorization = (req : UserRequest, res : Response, next : NextFunction, allowedUsers : string[]) => {
    if(allowedUsers.includes("bypass")){
        next()
    }else{
        if(req.user && allowedUsers.includes(req?.user?.role)){
            next()
        }else{
            return ApiResponse.error(res, 401, "Unauthorized")
        }
    }
}