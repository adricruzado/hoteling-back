import { type HotelStructureWithoutId, type HotelStructure } from "../types";

export interface HotelsRepository {
  getHotels: () => Promise<HotelStructure[]>;
  deleteHotel: (hotelId: string) => Promise<void>;
  addHotel: (hotel: HotelStructureWithoutId) => Promise<HotelStructure>;
  getHotelById: (id: string) => Promise<HotelStructure>;
}
