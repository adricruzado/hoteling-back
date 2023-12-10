import { type NextFunction, type Request, type Response } from "express";
import { type HotelsRepository } from "../repository/types";
import CustomError from "../../../server/CustomError/CustomError.js";
import { type HotelRequestWithId, type HotelRequestWithoutId } from "../types";

class HotelsController {
  constructor(private readonly hotelsRepository: HotelsRepository) {}

  getHotels = async (_req: Request, res: Response): Promise<void> => {
    const hotels = await this.hotelsRepository.getHotels();

    res.status(200).json({ hotels });
  };

  deleteHotel = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { hotelId } = req.params;

      await this.hotelsRepository.deleteHotel(hotelId);

      res.status(200).json({});
    } catch {
      const error = new CustomError(
        "An error occurred while deleting the hotel.",
        500,
      );
      next(error);
    }
  };

  addHotel = async (
    req: HotelRequestWithoutId,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const hotel = req.body;

      const newHotel = await this.hotelsRepository.addHotel(hotel);

      res.status(201).json({ hotel: newHotel });
    } catch (error) {
      const customError = new CustomError("Couldn't add hotel", 400);

      next(customError);
    }
  };

  getHotelById = async (
    req: Request<{ hotelId: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { hotelId } = req.params;

      const hotel = await this.hotelsRepository.getHotelById(hotelId);

      res.status(200).json({ hotel });
    } catch {
      const customError = new CustomError("Couldn't find the hotel.", 400);

      next(customError);
    }
  };

  modifyHotel = async (
    req: HotelRequestWithId,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const hotel = req.body;
      const { hotelId } = req.params;

      const modifiedHotel = await this.hotelsRepository.modifyHotel(
        hotelId,
        hotel,
      );

      res.status(200).json({ hotel: modifiedHotel });
    } catch (error) {
      const customError = new CustomError("Couldn't modify the hotel.", 400);

      next(customError);
    }
  };
}

export default HotelsController;
