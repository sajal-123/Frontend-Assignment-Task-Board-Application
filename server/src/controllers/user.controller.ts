import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/APIError.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ENV } from "../utils/ENV.js";

// Helper for token generation
const generateAccessAndRefereshTokens = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    return null;
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// --------------------------Register---------------------------
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  const existedUser = await User.findOne({ $or: [{ email }] });
  if (existedUser) {
    return res
      .status(409)
      .json(new ApiResponse(409, null, "Username already exists"));
  }

  const user = await User.create({
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Something went wrong while registering"));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

// --------------------------Login---------------------------
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Email and Password are required"));
  }

  const user = await User.findOne({ $or: [{ email }] });
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User does not exist"));
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(401).json(new ApiResponse(401, null, "Invalid credentials"));
  }

  const tokens = await generateAccessAndRefereshTokens(user._id);
  if (!tokens) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Token generation failed"));
  }

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", tokens.accessToken, options)
    .cookie("refreshToken", tokens.refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken },
        "User logged in successfully"
      )
    );
});

// --------------------------Logout---------------------------
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: undefined } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// --------------------------Refresh Token---------------------------
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingrefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingrefreshToken) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Unauthorized request"));
  }

  try {
    const decodedToken = jwt.verify(
      incomingrefreshToken,
      ENV.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user || user.refreshToken !== incomingrefreshToken) {
      return res.status(401).json(
        new ApiResponse(401, null, "Invalid or expired refresh token")
      );
    }

    const tokens = await generateAccessAndRefereshTokens(user._id);
    if (!tokens) {
      return res.status(500).json(
        new ApiResponse(500, null, "Failed to regenerate tokens")
      );
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", tokens.accessToken, options)
      .cookie("refreshToken", tokens.refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, error.message || "Invalid token"));
  }
});

// --------------------------Get Current User---------------------------
const getCurrentUser = asyncHandler(async (req, res) => {
  // console.log("Current User:", req.user);
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

// --------------------------Update Account---------------------------
const updateAccountdetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { fullName, email } },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  updateAccountdetails
};
