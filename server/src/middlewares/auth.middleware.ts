import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/APIError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: any; // You can type this properly with a User interface if needed
    }
  }
}

export const verifyJWT = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized Token");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload & { _id?: string };

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error: any) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
