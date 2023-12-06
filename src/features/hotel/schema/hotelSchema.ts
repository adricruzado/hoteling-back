import { Joi, validate } from "express-validation";
import { type HotelStructureWithoutId } from "../types";

const hotelSchema = {
  body: Joi.object<HotelStructureWithoutId>({
    name: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    rating: Joi.number().required(),
    price: Joi.number().required(),
    isFavourite: Joi.boolean().strict().required(),
    picture: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const hotelValidation = validate(hotelSchema, {}, { abortEarly: false });

export default hotelValidation;
