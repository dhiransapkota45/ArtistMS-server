
import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => 
  (req: Request, res: Response, next: NextFunction): void => {
    console.log("should reach here first")
    Promise.resolve(fn(req, res, next)).catch(next);
};
