import { type NextFunction, type Response } from "express";
import { hotelsMock } from "../../mocks/hotelsMock";
import { type HotelRequestWithId } from "../../types";
import type HotelsMongooseRepository from "../../repository/HotelsMongooseRepository";
import { modifiedHotelMock } from "../../mocks/modifiedHotelMock";
import HotelsController from "../HotelsController";
import type CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an HotelsController's modifyHotel method", () => {
  const req: Pick<HotelRequestWithId, "body" | "params"> = {
    body: hotelsMock[0],
    params: { hotelId: "656492010f2c29b15944b0d8" },
  };
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();

  describe("When it receives a request with an hotel id '656492010f2c29b15944b0d8', a 'Four Seasons Hotel George V' hotel and a response", () => {
    const hotelRepository: Pick<HotelsMongooseRepository, "modifyHotel"> = {
      modifyHotel: jest.fn().mockResolvedValue(modifiedHotelMock),
    };

    test("Then it should call the response's status method with 200", async () => {
      const expectedStatusCode = 200;

      const hotelsController = new HotelsController(
        hotelRepository as HotelsMongooseRepository,
      );

      await hotelsController.modifyHotel(
        req as HotelRequestWithId,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with the 'Four Seasons Hotel George V' modified", async () => {
      const hotelsController = new HotelsController(
        hotelRepository as HotelsMongooseRepository,
      );

      await hotelsController.modifyHotel(
        req as HotelRequestWithId,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ hotel: modifiedHotelMock });
    });
  });

  describe("When it receives a request with an hotel id, an hotel and a response and there is an error", () => {
    test("Then it should call its next function with a custom error 'Couldn't modify the hotel.'", async () => {
      const expectedStatusCode = 400;
      const expectedErrorMessage = "Couldn't modify the hotel.";
      const expectedError: Pick<CustomError, "statusCode" | "message"> = {
        statusCode: expectedStatusCode,
        message: expectedErrorMessage,
      };

      const hotelsRepository: Pick<HotelsMongooseRepository, "modifyHotel"> = {
        modifyHotel: jest.fn().mockRejectedValue(null),
      };

      const hotelsController = new HotelsController(
        hotelsRepository as HotelsMongooseRepository,
      );

      await hotelsController.modifyHotel(
        req as HotelRequestWithId,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
