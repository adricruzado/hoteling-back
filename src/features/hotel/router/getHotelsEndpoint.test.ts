import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { connectToDatabase } from "../../../database";
import mongoose from "mongoose";
import app from "../../../server/app";
import "../../../server/index";
import Hotel from "../model/Hotel.js";
import { hotelsMock } from "../mocks/hotelsMock";
import { type HotelStructure } from "../types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();

  await connectToDatabase(mongoDbUrl);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a GET /hotels endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 200 and the hotels 'Four Seasons Hotel George V' and 'The Ritz-Carlton'", async () => {
      const path = "/hotels";
      const expectedStatusCode = 200;

      await Hotel.create(hotelsMock[0]);
      await Hotel.create(hotelsMock[1]);

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { hotels: HotelStructure[] };

      responseBody.hotels.forEach((hotel, hotelPosition) => {
        expect(hotel).toHaveProperty("name", hotelsMock[hotelPosition].name);
      });
    });
  });
});
