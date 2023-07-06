const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

describe("Bank Account Endpoints", () => {
   // User Token For Authorization Header
   let token = "";

   // Bank Account ID for certain tests
   let bankAccountID = "";

   // Get auth token used in requests
   beforeAll(async () => {
      // Register or if theres an error with that login (since user already exists)
      try {
         const res = await request(app).post("/api/auth/register").send({
            name: "Test",
            email: "test2@gmail.com",
            password: "test1234",
         });
         token = res.body.token;
      } catch (err) {
         const res = await request(app).post("/api/auth/login").send({
            email: "test2@gmail.com",
            password: "test1234",
         });
         token = res.body.token;
      }
   });

   // Close database connection after tests complete
   afterAll(() => {
      mongoose.connection.close();
   });

   it("Create Bank Account", async () => {
      const res = await request(app)
         .post("/api/bankaccounts/create")
         .set("Authorization", `Bearer ${token}`)
         .send({
            name: "Test Account",
            type: "savings",
            balance: 5000,
            lowBalanceAlert: 1000,
         });
      bankAccountID = res.body._id;
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("_id");
   });

   it("Gets All Bank Accounts", async () => {
      const res = await request(app)
         .get("/api/bankaccounts")
         .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
   });

   it("Get Bank Account By ID", async () => {
      const res = await request(app)
         .get(`/api/bankaccounts/${bankAccountID}`)
         .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("_id");
   });

   it("Link Household To Bank Account", async () => {
      const res = await request(app)
         .put(`/api/bankaccounts/${bankAccountID}/link`)
         .set("Authorization", `Bearer ${token}`)
         .send({
            householdId: "TestID",
         });
      expect(res.statusCode).toEqual(200);
      expect(res.body.linkedTo).toEqual("TestID");
   });

   it("Edit Bank Account", async () => {
      const res = await request(app)
         .put(`/api/bankaccounts/${bankAccountID}`)
         .set("Authorization", `Bearer ${token}`)
         .send({
            name: "New Account Name",
            type: "savings",
            balance: 5000,
            lowBalanceAlert: 1000,
         });
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual("New Account Name");
   });

   it("Delete Bank Account", async () => {
      const res = await request(app)
         .delete(`/api/bankaccounts/${bankAccountID}`)
         .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("_id");
   });
});
