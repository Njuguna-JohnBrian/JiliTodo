const express = require("express");

const request = require("supertest");
const { health } = require("../../../../routes/health.router");

const testApp = express();

testApp.use(express.json());

const testBaseUrl = "/api/jilitodo";

testApp.use(testBaseUrl, health);

describe("integration test for the health api", () => {
  it("returns 200  status code and success message when there is no error in the request object", async () => {
    const { body, statusCode } = await request(testApp).get(
      `${testBaseUrl}/health`,
    );

    expect(body).toEqual(
      expect.objectContaining({
        success: expect.any(Boolean),
        message: expect.any(String),
      }),
    );

    expect(statusCode).toBe(200);
  });
});
