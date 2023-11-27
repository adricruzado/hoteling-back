import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../../../CustomError/CustomError";
import { notFound } from "../errorMiddlewares";

describe("Given a notFound middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the next function with a status 404 and an error 'Endpoint not found'", () => {
      const req = {};
      const res = {};
      const next: NextFunction = jest.fn();
      const expectedStatusCode = 404;
      const expectedMessage = "Endpoint not found";

      const expectedError: Pick<CustomError, "statusCode" | "message"> = {
        statusCode: expectedStatusCode,
        message: expectedMessage,
      };

      notFound(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
