import { Response } from "express";
import { ApiError } from "./ApiError";

export class ApiResponse {
    static success(res: Response, message: string, data: any = {}, statusCode: number = 200) {
      return res.status(statusCode).json({
        success: true,
        message,
        data,
      });
    }

    static error (res: Response, message: string, statusCode: number = 500, errors : Error[]) {
      return res.status(statusCode).json(new ApiError(statusCode, message, errors));
    }
  
}