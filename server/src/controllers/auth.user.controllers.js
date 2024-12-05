//import packages
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

//import files
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { createTokenAndCookie } from "../utils/CreateTokenAndCookie.js";
import { MIN_LENGTH } from "../constants.js";
dotenv.config({
  path: "./src/.env",
});

//POST /api/v1/auth/signup
export const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  //check if password is between 6 to 16 characters
  if (password.length < MIN_LENGTH || password.length > 20) {
    return res.status(400).json(new ApiError(400, "Password must be between 6 to 20 character"));
  }

  //check for password match
  if (password !== confirmPassword) {
    return res.status(400).json(new ApiError(400, "Passwords do not match"));
  }

  //check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json(new ApiError(400, "User already exists"));
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  //save user and create token if user is created
  if (newUser) {
    await newUser.save();
    createTokenAndCookie(newUser._id, res);

    //return success response
    res.status(201).json(
      new ApiResponse(201, "User created successfully", {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      })
    );
  }
  //return error response if user is not created
  else {
    return res.status(400).json(new ApiError(400, "Invalid user data"));
  }
});


//POST /api/v1/auth/login
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //check if user exists by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json(new ApiError(400, "Invalid credentials"));
  }

  //check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json(new ApiError(400, "Invalid credentials"));
  }
  //create token and cookie
  createTokenAndCookie(user._id, res);

  //return success response
  res.status(200).json(
    new ApiResponse(200, "Login successful", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  );
});

//POST /api/v1/auth/logout
export const logout = asyncHandler(async (req, res) => {
  // clear cookie
  console.log("logout");
  res.clearCookie("jwt");
  //return success response
  res.status(200).json(new ApiResponse(200, "Logout successful", {}));
});
