import * as request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("User", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Test User function create", async () => {
    const response = await request(app).post("/users").send({
      email: "user2@example.com",
      name: "User2 example",
    });

    expect(response.status).toBe(201);
  });

  it("Test User function create exist email", async () => {
    const response = await request(app).post("/users").send({
      email: "user2@example.com",
      name: "User2 example",
    });

    expect(response.status).toBe(400);
  });
});
