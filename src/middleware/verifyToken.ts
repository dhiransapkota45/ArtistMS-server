import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../utils/ApiResponse';
import env from '../config/env';
import { UserRequest } from '../types/types';

export const verifyToken = async(req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log("verifyToken", token);
  if (!token) {
    return ApiResponse.error(res, 403, 'No token provided', []);
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as string);
    req.user = typeof decoded !== "string" ? decoded?.user : undefined;
    next();
  } catch (error : unknown) {
    if(error instanceof jwt.JsonWebTokenError){
        return ApiResponse.error(res, 401, error.message, []);
    }else{
        return ApiResponse.error(res, 401, 'Authentication failed', []);
    }
  }
};