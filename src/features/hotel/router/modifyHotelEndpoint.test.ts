import request from "supertest";
import "../../../server/index";
import app from "../../../server/app";
import Hotel from "../model/Hotel";
import { modifiedHotelMock } from "../mocks/modifiedHotelMock";
import { type HotelStructure } from "../types";

describe("Given a PATCH /hotels/656492010f2c29b15944b0d8 endpoint", () => {
  describe("When it receives a request with a valid id '656492010f2c29b15944b0d8'", () => {
    test("Then it should respond with status 200 and the favourite status of the 'Four Seasons Hotel George V' hotel modified", async () => {
      const path = "/hotels/656492010f2c29b15944b0d8";
      const expectedStatusCode = 200;
      const expectedFavouriteStatus = false;

      await Hotel.create(modifiedHotelMock);

      const response = await request(app)
        .patch(path)
        .expect(expectedStatusCode);

      const responseBody = response.body as { hotel: HotelStructure };

      expect(responseBody.hotel).toHaveProperty(
        "isFavourite",
        expectedFavouriteStatus,
      );
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with a status code 400 and a 'Couldn't modify the hotel.' error", async () => {
      const path = "/hotels/1234";
      const expectedStatusCode = 400;
      const expectedError = { error: "Couldn't modify the hotel." };

      const response = await request(app)
        .patch(path)
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: HotelStructure };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
