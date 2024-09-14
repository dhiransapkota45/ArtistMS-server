import { NextFunction, Request, Response } from "express";

export const emptyNext = (req : Request, res : Response, next : NextFunction) => {
    next()
}