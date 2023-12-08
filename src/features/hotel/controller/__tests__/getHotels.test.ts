import { type Request, type Response } from "express";
import { hotelsMock } from "../../mocks/hotelsMock";
import { type HotelsRepository } from "../../repository/types";
import HotelsController from "../HotelsController";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a HotelsController's getHotels method", () => {
  const hotelsRepository: HotelsRepository = {
    getHotels: jest.fn().mockReturnValue(hotelsMock),
    deleteHotel: jest.fn(),
    addHotel: jest.fn(),
    getHotelById: jest.fn(),
  };
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a response", () => {
    test("Then it should call its status method with 200", async () => {
      const expectedStatusCode = 200;

      const hotelsController = new HotelsController(hotelsRepository);
      await hotelsController.getHotels(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with the hotels 'Four Seasons Hotel George V' and 'The Ritz-Carlton'", async () => {
      const expectedHotels = hotelsMock;
      const mockResponse: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const hotelsController = new HotelsController(hotelsRepository);
      await hotelsController.getHotels(
        req as Request,
        mockResponse as Response,
      );

      expect(mockResponse.json).toHaveBeenCalledWith({
        hotels: expectedHotels,
      });
    });
  });
});
