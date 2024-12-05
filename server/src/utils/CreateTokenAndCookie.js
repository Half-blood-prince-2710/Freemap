import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "./src/.env",
});


const createTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const cookieOptions = {
    maxAge: process.env.JWT_COOKIE_EXPIRES,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
  res.cookie("jwt", token, cookieOptions);
};

export { createTokenAndCookie };
