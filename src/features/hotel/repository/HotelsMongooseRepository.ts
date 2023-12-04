import Hotel from "../model/Hotel.js";
import { type HotelStructure } from "../types";
import { type HotelsRepository } from "./types";

class HotelsMongooseRepository implements HotelsRepository {
  public async getHotels(): Promise<HotelStructure[]> {
    const hotels = await Hotel.find().limit(10);

    return hotels;
  }

  public async deleteHotel(hotelId: string): Promise<void> {
    await Hotel.deleteOne({ _id: hotelId });
  }
}

export default HotelsMongooseRepository;
