import { before, describe, afterEach, it } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
const Db=()=>{
 return mongoose.connect("mongodb://127.0.0.1:27017/userData").then(()=>{
  console.log("DB CONNECTED")
 });
}
// TEST_CASES_FOR_API
chai.use(chaiHttp);
const body = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  phone: faker.phone.number(),
  userName: faker.internet.userName(),
};
describe("Checking user API test cases", () => {
  before("DB connection", () => {
    Db()
  });

  it("User is saved", (done) => {
    chai
      .request(app)
      .post("/signup")
      .send(body)
      .end((err, res) => {
        chai.expect(res).to.be.status(200);
      });
    done();
  });
  it("user already exist", () => {
    chai
      .request(app)
      .post("/signup")
      .send(body)
      .end((err, res) => {
        chai.expect(res).to.be.status(500);
      });
  });
});

// TEST_CASES_FOR_OTP
describe("OTP test cases", () => {
  before("DB CONNECTED",()=>{
    Db();
  })
  it("Please check your email id", (done) => {
    chai
      .request(app)
      .post("/emailsend")
      .send(body)
      .end(async (err, res) => {
        await chai.expect(res).to.be.status(200);
      });
    done();
  });
})

// TEST_CASES_FOR_LOGIN                                              +/7
describe("Login test cases", () => {
  before("DB CONNECTED",()=>{
    Db();
  })
  it("Logged in successfully", (done) => {
    chai
      .request(app)
      .post("/login")
      .send(body)
      .end(async (err, res) => {
        await chai.expect(res).to.be.status(200);
      });
    done();
  });

  it("User not found", (done) => {
    const body2 = {
      email: "demo@gmail.com",
      password: "demoPass",
      phone: "54465465456",
      userName: "demoUser",
    };
    chai
      .request(app)
      .post("/login")
      .send(body2)
      .end(async (err, res) => {
        await chai.expect(res).to.be.status(500);
      });
    done();
  });
});
