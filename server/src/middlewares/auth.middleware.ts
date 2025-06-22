import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";
import { ENV } from "../utils/ENV";
import { ApiResponse } from "../utils/APIResponse";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  try {
    if (!token) throw new Error("Access token not provided");

    // Try to verify access token
    const decodedToken = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET!) as JwtPayload & { _id?: string };

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if (!user) {
      return res.status(401).json(new ApiResponse(401, null, "Invalid access token: user not found"));
    }
    console.log("User found:", user);

    req.user = user;
    return next();
  } catch (accessError: any) {
    // console.error("Access token verification failed:", accessError.message);
    // Try refreshing the token if access token is expired
    const refreshToken = req.cookies?.refreshToken || req.header("x-refresh-token");
    // console.log("Refresh token provided:", !!refreshToken);

    if (!refreshToken) {
      return res.status(401).json(new ApiResponse(401, null, "Unauthorized: No refresh token provided"));
    }

    try {
      const decodedRefresh = jwt.verify(refreshToken, ENV.REFRESH_TOKEN_SECRET!) as JwtPayload & { _id?: string };
      // console.log("Refresh token decoded:", decodedRefresh);
      const user = await User.findById(decodedRefresh?._id);
      // console.log("User found for refresh token:", user);

      if (!user || user.refreshToken !== refreshToken) {
        // console.error("Invalid refresh token for user:", refreshToken,"----",user?.refreshToken);
        return res.status(401).json(new ApiResponse(401, null, "Invalid refresh token"));
      }

      // Generate new tokens
      const newAccessToken = user.generateAccessToken();
      const newRefreshToken = user.generateRefreshToken();
      user.refreshToken = newRefreshToken;
      await user.save({ validateBeforeSave: false });
      // console.log("New tokens generated for user:", user._id);

      // Attach user to request
      req.user = user;

      // Set new tokens in cookies
      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "lax" as const,
      };

      res.cookie("accessToken", newAccessToken, options);
      res.cookie("refreshToken", newRefreshToken, options);

      return next();
    } catch (refreshError) {
      return res.status(401).json(new ApiResponse(401, null, "Session expired. Please login again."));
    }
  }
});
