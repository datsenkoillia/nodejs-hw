import mongoose from "mongoose";
import request from "supertest";
import "dotenv/config";

import app from "../../app.js";

const { PORT, DB_HOST } = process.env;

describe("test login controller", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("response with status code 200", async () => {
    const loginData = {
      email: "datsenko.illia@gmail.com",
      password: "123456",
    };
    const { statusCode, body } = await request(app)
      .post("/api/auth/users/login")
      .send(loginData);

    expect(statusCode).toBe(200);
  });

  test("response with token return", async () => {
    const loginData = {
      email: "datsenko.illia@gmail.com",
      password: "123456",
    };
    const { statusCode, body } = await request(app)
      .post("/api/auth/users/login")
      .send(loginData);

    expect(body).toHaveProperty("token");
  });

  test("response with object user have only email and subscription fields with 'string' data", async () => {
    const loginData = {
      email: "datsenko.illia@gmail.com",
      password: "123456",
    };
    const { statusCode, body } = await request(app)
      .post("/api/auth/users/login")
      .send(loginData);

    expect(body).toHaveProperty("user");
    expect(Object.keys(body.user)).toHaveLength(2);
    expect(body.user).toHaveProperty("email");
    expect(body.user).toHaveProperty("subscription");
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
  });
});
