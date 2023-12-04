import request from "supertest";
import app from "../../../server/app";
import "../../../server/index";
import Hotel from "../model/Hotel";
import { hotelsMock } from "../mocks/hotelsMock";

describe("Given a DELETE /hotels/:hotelId endpoint", () => {
  describe("When it receives a request with a valid id", () => {
    test("Then it should respond with status 200 and an empty object", async () => {
      const path = "/hotels/656492250f2c29b159453185";
      const expectedStatusCode = 200;

      await Hotel.deleteOne({ _id: hotelsMock[0]._id });

      const response = await request(app)
        .delete(path)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual({});
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with status 500 and a message 'An error occurred while deleting the hotel.'", async () => {
      const path = "/hotels/1234567";
      const expectedStatusCode = 500;
      const expectedErrorMessage =
        "An error occurred while deleting the hotel.";
      await Hotel.deleteOne({ _id: hotelsMock[0]._id });

      const response = await request(app)
        .delete(path)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
