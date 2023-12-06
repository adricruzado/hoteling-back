import morgan from "morgan";
import express from "express";
import cors from "cors";
import app from "./app.js";
import pingRouter from "../features/ping/router/pingRouter.js";
import {
  generalError,
  notFound,
} from "./middlewares/errors/errorMiddlewares.js";
import hotelsRouter from "../features/hotel/router/hotelsRouter.js";

const frontUrl = process.env.FRONT_URL!;

app.use(morgan("dev"));
app.use(
  cors({
    origin: [frontUrl],
  }),
);
app.use(express.json());

app.use("/", pingRouter);
app.use("/hotels", hotelsRouter);

app.use(notFound);
app.use(generalError);
