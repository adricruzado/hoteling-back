import request from "supertest";
import app from "../../../app";

describe("Given a GET /wrong endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status code 404 and a message 'Endpoint not found'", async () => {
      const path = "/wrong";
      const expectedErrorMessage = "Endpoint not found";
      const expectedStatusCode = 404;

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
