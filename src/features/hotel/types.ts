import { type Request } from "express";

export interface HotelStructureWithoutId {
  name: string;
  country: string;
  city: string;
  rating: number;
  price: number;
  isFavourite: boolean;
  picture: string;
  description: string;
}

export interface HotelStructure extends HotelStructureWithoutId {
  _id: string;
  name: string;
  country: string;
  city: string;
  rating: number;
  price: number;
  isFavourite: boolean;
  picture: string;
  description: string;
}

export type HotelRequestWithoutId = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  HotelStructureWithoutId
>;

export type HotelRequestById = Request<{ hotelId: string }>;
