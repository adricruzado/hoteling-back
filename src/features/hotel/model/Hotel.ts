import { Schema, model } from "mongoose";
import { type HotelStructure } from "../types";

const hotelSchema = new Schema<HotelStructure>({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isFavourite: {
    type: Boolean,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Hotel = model("Hotel", hotelSchema, "hotels");

export default Hotel;
