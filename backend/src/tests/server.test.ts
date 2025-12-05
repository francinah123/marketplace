import request from "supertest";
import express from "express";
import apiRoutes from "../routes";
import { config } from "../config";

// Create a lightweight test app
const app = express();
app.use(express.json());
app.use("/api", apiRoutes);

describe("API Health Check", () => {
  it("should return status ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("environment", config.nodeEnv);
  });
});

describe("Posts Routes", () => {
  it("should return posts array", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("posts");
    expect(Array.isArray(res.body.posts)).toBe(true);
  });

  it("should create a text post", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({ author: "TestUser", content: "Hello world!" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("post");
    expect(res.body.post).toMatchObject({
      author: "TestUser",
      content: "Hello world!",
    });
  });
});
