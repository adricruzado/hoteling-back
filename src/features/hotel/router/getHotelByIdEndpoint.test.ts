import request from "supertest";
import "../../../server/index";
import app from "../../../server/app";
import { type HotelStructure } from "../types";
import Hotel from "../model/Hotel";

import { hotelsMock } from "../mocks/hotelsMock";

describe("Given a GET /hotels/656492250f2c29b159453185 endpoint", () => {
  describe("When it receives a request with a valid id '656492250f2c29b159453185'", () => {
    test("Then it should respond with status 200 and the 'The Ritz-Carlton' hotel", async () => {
      const path = "/hotels/656492250f2c29b159453185";
      const expectedStatusCode = 200;
      const expectedHotelName = "The Ritz-Carlton";

      await Hotel.create(hotelsMock[1]);

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { hotel: HotelStructure };

      expect(responseBody.hotel).toHaveProperty("name", expectedHotelName);
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with a status code 400 and a 'Couldn't find the hotel.' error", async () => {
      const path = "/hotels/1234";
      const expectedStatusCode = 400;
      const expectedError = { error: "Couldn't find the hotel." };

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { error: HotelStructure };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
