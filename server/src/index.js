import {app} from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";

dotenv.config(
  {
   path:"./src/.env"
 }
);


const PORT = process.env.PORT || 5001;


connectDB()
    .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
   console.log('MongoDb connection error', error);
});