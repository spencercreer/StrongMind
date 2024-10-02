import request from "supertest";
import mongoose from "mongoose";
import connection from "../db/connection";
import app from "../index";
import Pizza from "../models/Pizza";

beforeAll(async () => {
  const newPizza = await Pizza.create({
    name: "Seeded Pizza",
  });
});

afterAll(async () => {
  await Pizza.deleteMany({ name: "Seeded Pizza" });
  await connection.close();
});

describe("Pizza schema", () => {
  it("should not create a pizza with a duplicate name", async () => {
    try {
      const newPizza = await Pizza.create({
        name: "Seeded Pizza",
      });
      throw new Error("Test failed: Duplicate pizza name was allowed");
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toContain("duplicate key error");
    }
  });
});

describe("GET /pizza", () => {
  it("should return a list of pizzas", async () => {
    const response = await request(app).get("/pizza");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("GET /pizza/:id", () => {
  it("should retrieve a pizza by ID", async () => {
    const pizza = await Pizza.findOne({ name: "Seeded Pizza" });

    if (!pizza) {
      throw new Error('Test failed: No "Seeded Pizza" found in the database');
    }

    const response = await request(app).get(`/pizza/${pizza._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body._id).toBe(pizza._id.toString());
    expect(response.body.name).toBe("Seeded Pizza");
  });

  it("should return 404 for a non-existent pizza ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/pizza/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Pizza not found");
  });
});

describe("POST /pizza", () => {
  beforeAll(async () => {
    await Pizza.deleteMany({
      name: "The best pizza ever",
    });
  });

  afterAll(async () => {
    await Pizza.deleteMany({
      name: "The best pizza ever",
    });
  });

  it("should create a new pizza successfully", async () => {
    const newPizza = {
      name: "The best pizza ever",
    };

    const response = await request(app)
      .post("/pizza")
      .send(newPizza)
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body.name).toBe(newPizza.name);

    const pizzaInDb = await Pizza.findById(response.body._id);
    expect(pizzaInDb).not.toBeNull();
    expect(pizzaInDb?.name).toBe(newPizza.name);
  });

  it("should fail to create a pizza without a name", async () => {
    const invalidPizza = {};

    const response = await request(app)
      .post("/pizza")
      .send(invalidPizza)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Pizza name is required");
  });
});
