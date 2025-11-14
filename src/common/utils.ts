import type { NextFunction, Request, Response } from "express";

export function asyncWrapper(fn: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res);
    } catch (error: any) {
      console.error(error.message);
      next();
    }
  };
}
