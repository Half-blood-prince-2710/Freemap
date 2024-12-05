import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path:"./src/.env"
});
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.log('MongoDb connection error', error);
        process.exit(1);
    }
}


export default connectDB; 