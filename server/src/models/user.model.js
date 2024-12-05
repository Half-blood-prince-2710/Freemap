import { Schema, model } from "mongoose";
import { MIN_LENGTH, MAX_LENGTH } from "../constants.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (name) =>
          name.length >= MIN_LENGTH && name.length <= MAX_LENGTH,
        message: `Name must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      validate: {
        validator: (email) => {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegex.test(email);
        },
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: true,
      
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);
