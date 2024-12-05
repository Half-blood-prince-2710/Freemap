import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";



dotenv.config({
    path: "./src/.env",
});


export const protectRoute = asyncHandler(async (req, res, next) => {

    console.log("i entered protect route");
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json(new ApiError(401, "unauthorized: no token"));
    }
    const verify =  jwt.verify(token, process.env.JWT_SECRET);
    console.log("id:", verify.userId);

    if (!verify) {
      return res.status(401).json(new ApiError(401, "unauthorized: invalid token"));
    }
    const user = await User.findById(verify.userId);
    if (!user) {
      return res.status(401).json(new ApiError(401, "unauthorized: user not found"));
    }
    // console.log(user)
    req.user = user._id;
    // console.log('req.user:', req.user)
    next();
  
});
