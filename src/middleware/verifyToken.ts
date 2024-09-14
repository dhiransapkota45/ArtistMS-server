import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../utils/ApiResponse';
import env from '../config/env';
import { UserRequest } from '../types/types';

export const verifyToken = (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return ApiResponse.error(res, 'No token provided', 403, []);
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as string);
    req.userid = typeof decoded !== "string" && decoded?.userid;
    next();
  } catch (error : unknown) {
    if(error instanceof jwt.JsonWebTokenError){
        return ApiResponse.error(res, error.message, 401, []);
    }else{
        return ApiResponse.error(res, 'Authentication failed', 401, []);
    }
  }
};