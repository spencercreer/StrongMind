import request from "supertest";
import mongoose from "mongoose";
import connection from "../db/connection";
import app from "../index";
import Topping from "../models/Topping";

beforeAll(async () => {
  await Topping.syncIndexes();
  await Topping.create({
    name: "Seeded Topping",
  });
});

afterAll(async () => {
  await Topping.deleteMany({ name: "Seeded Topping" });
  await connection.close();
});

describe("Topping schema", () => {
  it("should not create a topping with a duplicate name", async () => {
    try {
      const newTopping = await Topping.create({
        name: "Seeded Topping",
      });
      throw new Error("Test failed: Duplicate topping name was allowed");
    } catch (error: any) {
      expect(error.message).toContain("E11000");
    }
  });
});

describe("GET /topping", () => {
  it("should return a list of toppings", async () => {
    const response = await request(app).get("/topping");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    response.body.forEach((topping: any) => {
      expect(topping).toHaveProperty("name");
      expect(typeof topping.name).toBe("string");
    });
  });
});

describe("GET /topping/id", () => {
  it("should retrieve a topping by ID", async () => {
    const topping = await Topping.findOne({ name: "Seeded Topping" });

    if (!topping) {
      throw new Error('Test failed: No "Seeded Topping" found in the database');
    }

    const response = await request(app).get(`/topping/${topping._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body._id).toBe(topping._id.toString());
    expect(response.body.name).toBe("Seeded Topping");
  });

  it("should return 404 for a non-existent topping ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/topping/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Topping not found");
  });
});

describe("POST /topping", () => {
  beforeAll(async () => {
    await Topping.deleteMany({
      name: "The best topping ever",
    });
  });

  afterAll(async () => {
    await Topping.deleteMany({
      name: "The best topping ever",
    });
  });

  it("should create a new topping successfully", async () => {
    const newTopping = {
      name: "The best topping ever",
    };

    const response = await request(app)
      .post("/topping")
      .send(newTopping)
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body.name).toBe(newTopping.name);

    const toppingInDb = await Topping.findById(response.body._id);
    expect(toppingInDb).not.toBeNull();
    expect(toppingInDb?.name).toBe(newTopping.name);
  });

  it("should fail to create a topping without a name", async () => {
    const invalidTopping = {};

    const response = await request(app)
      .post("/topping")
      .send(invalidTopping)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Topping name is required");
  });
});

describe("PUT /topping/:id", () => {
  beforeAll(async () => {
    await Topping.deleteMany({ name: "Updated Topping" });
  });

  afterAll(async () => {
    await Topping.deleteMany({ name: "Updated Topping" });
  });

  it("should update a topping successfully", async () => {
    const topping = await Topping.findOne({ name: "Seeded Topping" });
    const updatedTopping = { name: "Updated Topping" };

    if (!topping) {
      throw new Error('Test failed: No "Seeded Topping" found in the database');
    }

    const response = await request(app)
      .put(`/topping/${topping._id}`)
      .send(updatedTopping)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedTopping.name);

    const toppingInDb = await Topping.findById(topping._id);
    expect(toppingInDb?.name).toBe(updatedTopping.name);
  });

  it("should return 404 for a non-existent topping ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const updatedTopping = { name: "Non-existent topping" };

    const response = await request(app)
      .put(`/topping/${nonExistentId}`)
      .send(updatedTopping)
      .set("Accept", "application/json");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Topping not found");
  });
});

describe("DELETE /topping/:id", () => {
  beforeAll(async () => {
    await Topping.syncIndexes();
    await Topping.create({
      name: "Topping to delete",
    });
  });

  it("should delete a topping successfully", async () => {
    const topping = await Topping.findOne({ name: "Topping to delete" });

    if (!topping) {
      throw new Error(
        'Test failed: No "Topping to delete" found in the database'
      );
    }

    const response = await request(app).delete(`/topping/${topping._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Topping deleted successfully");

    const toppingInDb = await Topping.findById(topping._id);
    expect(toppingInDb).toBeNull();
  });

  it("should return 404 for a non-existent topping ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();

    const response = await request(app).delete(`/topping/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Topping not found");
  });
});
