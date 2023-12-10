import { type NextFunction, type Request, type Response } from "express";
import { type HotelsRepository } from "../../repository/types";
import HotelsController from "../HotelsController";
import { hotelsMock } from "../../mocks/hotelsMock";
import type CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a HotelsController's deleteHotel method", () => {
  const hotelsRepository: HotelsRepository = {
    getHotels: jest.fn().mockReturnValue(hotelsMock),
    deleteHotel: jest.fn(),
    addHotel: jest.fn(),
    getHotelById: jest.fn(),
    modifyHotel: jest.fn(),
  };
  const next: NextFunction = jest.fn();

  describe("When it receives a request with a valid id '656492010f2c29b15944b0d8' and a response", () => {
    test("Then it should call the response's status method with 200", async () => {
      const expectedStatusCode = 200;
      const req: Pick<Request, "params"> = {
        params: { _id: "656492010f2c29b15944b0d8" },
      };
      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const hotelsController = new HotelsController(hotelsRepository);

      await hotelsController.deleteHotel(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives an invalid request and a response", () => {
    test("Then it should call its next function with a custom error 'An error occurred while deleting the hotel.'", async () => {
      const expectedError: Pick<CustomError, "message" | "statusCode"> = {
        message: "An error occurred while deleting the hotel.",
        statusCode: 500,
      };
      const req = {};
      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const hotelsController = new HotelsController(hotelsRepository);

      await hotelsController.deleteHotel(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
