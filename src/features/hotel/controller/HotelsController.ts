import { type NextFunction, type Request, type Response } from "express";
import { type HotelsRepository } from "../repository/types";
import CustomError from "../../../server/CustomError/CustomError";

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
}

export default HotelsController;
