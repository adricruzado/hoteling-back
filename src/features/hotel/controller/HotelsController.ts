import { type Request, type Response } from "express";
import { type HotelsRepository } from "../repository/types";

class HotelsController {
  constructor(private readonly hotelsRepository: HotelsRepository) {}

  getHotels = async (_req: Request, res: Response): Promise<void> => {
    const hotels = await this.hotelsRepository.getHotels();

    res.status(200).json({ hotels });
  };
}

export default HotelsController;
