import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

//connected Database
connectDB();

//start server
const PORT = process.env.PORT || 6090;

app.listen(PORT, ()=>{
    console.log(`server runnig on ${PORT}`)
});
