const request = require("supertest");
import { app } from "../index.js";
import { request } from "express";

describe("Operarciones CRUD de cafes", () => {
  const cafesId = 5;

  describe("GET/ cafes", () => {
    it("devuelve un status code 200", async () => {
      const response = await request(app).get("/api/cafes");

      expect(response.status).toBe(200);
    });

    it("The type of data received is an arrangement", async () => {
      const response = await request(app).get("/api/cafes");

      expect(Array.isArray(response.body)).toBe(true);
    });

    it("The received data type is an array with at least 1 object", async () => {
      const response = await request(app).get("/api/cafes");

      expect(response.body.lenght).toBeGreaterThan(0);
      expect(response.body[0]).toBeInstanceOf(Object);
    });
  });

  describe("POST/cafes", () => {
    it("ruta POST/cafes devuelve un status code 201", async () => {
      const response = await request(app);
      post("/api/cafes");

      expect(response.status).toBe(201);
    });

    it("Prueba que la ruta POST/cafes agrega un cafe y devuelve codigo 201", async () => {
      const response = await request(app).post("/api/cafes").send({
        id: cafeId,
        nombre: "cafe echo en chile",
      });

      expect(response.status).toBe(201);
    });
  });

  describe("PUT/cafes/:id", () => {
    it("Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
      const invalidCafeId = 8;

      const response = await request(app)
        .put(`/api/cafes/${invalidCafeId}`)
        .send({
          id: cafeId,
          nombre: "cafe echo en chile",
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "El id del parametro no coincide con el id del cafe recibido ",
      });
    });
  });
});
