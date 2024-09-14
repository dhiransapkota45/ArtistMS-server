import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../utils/ApiResponse';
import env from '../config/env';
import { UserRequest } from '../types/types';
import { UserService } from '../services/userService';

export const verifyToken = async(req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return ApiResponse.error(res, 403, 'No token provided', []);
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as string);
    const userService = new UserService()
    const user =  typeof decoded !== "string" && await userService.getUserById(decoded?.userid)
    if(!user){
      return ApiResponse.error(res, 401, 'Authentication failed')
    }
    req.user = user;
    next();
  } catch (error : unknown) {
    if(error instanceof jwt.JsonWebTokenError){
        return ApiResponse.error(res, 401, error.message, []);
    }else{
        return ApiResponse.error(res, 401, 'Authentication failed', []);
    }
  }
};