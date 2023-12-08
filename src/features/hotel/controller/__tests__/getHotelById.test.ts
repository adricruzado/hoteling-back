import { type NextFunction, type Request, type Response } from "express";
import type HotelsMongooseRepository from "../../repository/HotelsMongooseRepository";
import { hotelMock } from "../../mocks/hotelMock";
import HotelsController from "../HotelsController";
import { type HotelRequestById } from "../../types";
import type CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a HotelsController getHotelById method", () => {
  const req: Pick<Request, "params"> = {
    params: { hotelId: "123456" },
  };
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();

  describe("When it receives a request with an hotel id and a response", () => {
    const hotelsRepository: Pick<HotelsMongooseRepository, "getHotelById"> = {
      getHotelById: jest.fn().mockResolvedValue(hotelMock),
    };
    test("Then it should call its response's status method with 200", async () => {
      const expectedStatusCode = 200;

      const hotelsController = new HotelsController(
        hotelsRepository as HotelsMongooseRepository,
      );

      await hotelsController.getHotelById(
        req as HotelRequestById,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with the 'Four Seasons Hotel George V' hotel", async () => {
      const hotelsController = new HotelsController(
        hotelsRepository as HotelsMongooseRepository,
      );

      await hotelsController.getHotelById(
        req as HotelRequestById,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ hotel: hotelMock });
    });
  });

  describe("When it receives a request with an hotel id and a response and there is an error", () => {
    test("Then it should call its next function with a custom error 'Couldn't find the hotel.'", async () => {
      const expectedStatusCode = 400;
      const expectedErrorMessage = "Couldn't find the hotel.";
      const expectedError: Pick<CustomError, "statusCode" | "message"> = {
        statusCode: expectedStatusCode,
        message: expectedErrorMessage,
      };

      const hotelsRepository: Pick<HotelsMongooseRepository, "getHotelById"> = {
        getHotelById: jest.fn().mockRejectedValue(null),
      };

      const hotelsController = new HotelsController(
        hotelsRepository as HotelsMongooseRepository,
      );

      await hotelsController.getHotelById(
        req as HotelRequestById,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
