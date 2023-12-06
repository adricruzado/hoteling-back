import { type NextFunction, type Response } from "express";
import { hotelMock } from "../../mocks/hotelMock";
import { type HotelRequestWithoutId } from "../../types";
import type HotelsMongooseRepository from "../../repository/HotelsMongooseRepository";
import HotelsController from "../HotelsController";
import type CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an HotelsController addHotel method", () => {
  describe("When it receives a request with a hotel without id", () => {
    const req: Pick<HotelRequestWithoutId, "body"> = {
      body: hotelMock,
    };
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const hotelRepository: HotelsMongooseRepository = {
      getHotels: jest.fn(),
      deleteHotel: jest.fn(),
      addHotel: jest.fn().mockResolvedValue({ hotelMock }),
    };
    const next: NextFunction = jest.fn();

    test("Then it should call its status method with 201", async () => {
      const expectedStatusCode = 201;
      const hotelsController = new HotelsController(hotelRepository);

      await hotelsController.addHotel(
        req as HotelRequestWithoutId,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with 'Four Seasons Hotel George V' hotel", async () => {
      const expectedHotel = { hotelMock };
      const hotelsController = new HotelsController(hotelRepository);

      await hotelsController.addHotel(
        req as HotelRequestWithoutId,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ hotel: expectedHotel });
    });

    test("Then it should call his next function with an status code 400 and the message 'Couldn't add hotel' if the request is not valid", async () => {
      const hotelRepository: HotelsMongooseRepository = {
        getHotels: jest.fn(),
        deleteHotel: jest.fn(),
        addHotel: jest.fn().mockRejectedValue(undefined),
      };
      const expectedErrorMessage = "Couldn't add hotel";
      const expectedStatusCode = 400;
      const expectedError: Pick<CustomError, "statusCode" | "message"> = {
        statusCode: expectedStatusCode,
        message: expectedErrorMessage,
      };

      const hotelController = new HotelsController(hotelRepository);

      await hotelController.addHotel(
        req as HotelRequestWithoutId,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
