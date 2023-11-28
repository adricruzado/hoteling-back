import Hotel from "../model/Hotel.js";
import { type HotelStructure } from "../types";
import { type HotelsRepository } from "./types";

class HotelsMongooseRepository implements HotelsRepository {
  public async getHotels(): Promise<HotelStructure[]> {
    const hotels = Hotel.find().limit(10);

    return hotels;
  }
}

export default HotelsMongooseRepository;
