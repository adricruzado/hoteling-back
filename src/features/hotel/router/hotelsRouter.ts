import { Router } from "express";
import HotelsMongooseRepository from "../repository/HotelsMongooseRepository.js";
import { type HotelsRepository } from "../repository/types";
import HotelsController from "../controller/HotelsController.js";
import hotelValidation from "../schema/hotelSchema.js";

const hotelsRouter = Router();

const hotelsRepository: HotelsRepository = new HotelsMongooseRepository();

const hotelsController = new HotelsController(hotelsRepository);

hotelsRouter.get("/", hotelsController.getHotels);

hotelsRouter.delete("/:hotelId", hotelsController.deleteHotel);

hotelsRouter.post("/create", hotelValidation, hotelsController.addHotel);

hotelsRouter.get("/:hotelId", hotelsController.getHotelById);

export default hotelsRouter;
