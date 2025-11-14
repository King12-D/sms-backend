import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils";

// Extend Express Request type to include `user` property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

//authorizaton route
export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.headers["authorization"]?.split(" ")[1];

    if (!authToken)
      return res.status(403).json({ message: "Invalid or expired token" });

    //Verify the token provided
    const verify = jwt.verify(authToken, process.env.JWT_SECRET!);

    req.user = verify;

    next();
  } catch (error: any) {
    console.error(error.message, "Token validation error");
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

//Confirm user role
export const checkRole = (...checkRole: String[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //Get user role from the request sent
    const userRole = req.user?.role;

    if (!checkRole.includes(userRole))
      return res
        .status(403)
        .json({ message: "FORBIDDEN, You don't have access to this page" });

    next();
  };
};
