import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
//  Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//  Health Check Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//  404 Handler (Route not found)
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

export default app;