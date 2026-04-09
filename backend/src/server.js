import "dotenv/config"; 

import app from "./app.js";
import connectDB from "./config/db.js";

//connected Database
connectDB();

//start server
const PORT = process.env.PORT || 6090;

app.listen(PORT, ()=>{
    console.log(`server runnig on ${PORT}`)
});
