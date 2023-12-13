import request from "supertest";
import app from "../../../server/app";
import "../../../server/index";
import { hotelMock } from "../mocks/hotelMock";
import { type HotelStructure } from "../types";
import { server } from "../../../setupTests";

describe("Given a POST /hotels/create endpoint", () => {
  const path = "/hotels/create";
  describe("When it receives a request with a 'Four Seasons Hotel George V' hotel", () => {
    test("Then it should respond with status 201 and the 'Four Seasons Hotel George V' hotel", async () => {
      const expectedStatusCode = 201;
      const expectedHotelName = "Four Seasons Hotel George V";

      const response = await request(app)
        .post(path)
        .send(hotelMock)
        .expect(expectedStatusCode);

      const responseBody = response.body as { hotel: HotelStructure };

      expect(responseBody.hotel).toHaveProperty("name", expectedHotelName);
    });
  });

  describe("When it receives a request with a 'Four Seasons Hotel George V' hotel and there is an error", () => {
    test("Then it should respond with status 400 and an error message", async () => {
      await server.stop();

      const expectedStatusCode = 400;
      const expectedError = { error: "Couldn't add hotel" };

      const response = await request(app)
        .post(path)
        .send(hotelMock)
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
