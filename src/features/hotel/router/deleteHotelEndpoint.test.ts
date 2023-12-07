import request from "supertest";
import app from "../../../server/app";
import "../../../server/index";

describe("Given a DELETE /hotels/656492250f2c29b159453185 endpoint", () => {
  describe("When it receives a request with a valid id '656492250f2c29b159453185'", () => {
    test("Then it should respond with status 200 and an empty object", async () => {
      const path = "/hotels/656492250f2c29b159453185";
      const expectedStatusCode = 200;

      const response = await request(app)
        .delete(path)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual({});
    });
  });
});

describe("Given a DELETE /hotels/1234567 endpoint", () => {
  describe("When it receives a request with an invalid id '1234567'", () => {
    test("Then it should respond with status 500 and a message 'An error occurred while deleting the hotel.'", async () => {
      const path = "/hotels/1234567";
      const expectedStatusCode = 500;
      const expectedErrorMessage =
        "An error occurred while deleting the hotel.";

      const response = await request(app)
        .delete(path)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
