import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import { generalError } from "../errorMiddlewares";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middleware", () => {
  const errorMessage = "Error";
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const next: NextFunction = jest.fn();

  describe("When it receives a response's status method with 400", () => {
    test("Then it should call the response's status method with 400", () => {
      const expectedStatusCode = 400;
      const error = new CustomError(errorMessage, expectedStatusCode);

      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a response and an error with status code", () => {
    test("Then it should call the response's status method with 500", () => {
      const expectedStatusCode = 500;
      const error = new Error("Error with status code");

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a response with an error message 'Error'", () => {
    describe("Then it should call the response's json method with 'Private error'", () => {
      const privateErrorMessage = "Private error";
      const expectedStatusCode = 400;
      const error = new CustomError(privateErrorMessage, expectedStatusCode);

      generalError(error, req as Request, res as Response, next);

      const errorBodyResponse = {
        error: privateErrorMessage,
      };

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining(errorBodyResponse),
      );
    });
  });
});
