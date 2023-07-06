const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

describe("Household Endpoints", () => {
   // User Token For Authorization Header
   let token = "";

   // Household ID for certain tests
   let householdID = "";

   // Get auth token used in requests
   beforeAll(async () => {
      try {
         const res = await request(app).post("/api/auth/register").send({
            name: "Test",
            email: "test3@gmail.com",
            password: "test1234",
         });
         token = res.body.token;
      } catch (err) {
         const res = await request(app).post("/api/auth/login").send({
            email: "test3@gmail.com",
            password: "test1234",
         });
         token = res.body.token;
      }
   });

   // Close database connection after tests complete
   afterAll(() => {
      mongoose.connection.close();
   });

   it("Create Household", async () => {
      const res = await request(app)
         .post("/api/households/create")
         .set("Authorization", `Bearer ${token}`)
         .send({
            name: "Test Household",
            greeting: "Hi",
         });
      householdID = res.body._id;
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("_id");
   });
});
