import request from "supertest";
import connection from "../db/connection";
import app from "../index";

afterAll(async () => {
  await connection.close();
});

describe("GET /health", () => {
  it("should return a 200 status and healthy message", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("status");
  });
});
