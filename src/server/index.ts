import morgan from "morgan";
import express from "express";
import cors from "cors";
import app from "./app.js";
import pingRouter from "../features/ping/router/pingRouter.js";

app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "https://adria-cruzado-202309-bcn-back.onrender.com",
      "https://adria-cruzado-202309-bcn-back.onrender.com/hotels",
    ],
  }),
);
app.use(express.json());
app.use("/", pingRouter);
