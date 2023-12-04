import { type HotelStructure } from "../types";

export interface HotelsRepository {
  getHotels: () => Promise<HotelStructure[]>;
  deleteHotel: (hotelId: string) => Promise<void>;
}
