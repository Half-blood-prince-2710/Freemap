// import packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//import routes
import healthCheckRoutes from "./routes/healthcheck.routes.js";
import userRoutes from "./routes/auth.user.routes.js";

dotenv.config();
 const app = express();
//common middlewares
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
));
app.use(express.json({
    limit: "16kb"
}));

app.use(cookieParser());
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));
app.use(express.static("public"));


//routes
app.use("/api/v1/healthcheck", healthCheckRoutes);
app.use("/api/v1/auth", userRoutes);



export {app}