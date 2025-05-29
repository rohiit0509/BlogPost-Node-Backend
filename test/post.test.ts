import { before, describe, afterEach, it } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src";
import mongoose from "mongoose";
import {faker} from "@faker-js/faker"

// TEST_CASES_FOR_POST_API
chai.use(chaiHttp);
describe("Checking post API test cases", () => {
before("DB connection", (done) => {
  mongoose.connect("mongodb://127.0.0.1:27017/userData");
  done();
});
const body={
  title: faker.name.jobTitle(),
  description: faker.commerce.productDescription(),
  images: faker.datatype.string(),
}
it("Your POST is created.", (done) => {
  chai
    .request(app)
    .post("/createpost")
   .set("token","eyJhbGciOiJIUzI1NiJ9.NjQxZGE0YTYwNGQ2YTQ5N2I1YWZlODBm.srwQRkvhzSd0M9x2_o3Q9XsZdCj3Ug3eBLQE-999foU")
    .send(body)
    .end((err, res) => {

      chai.expect(res).to.be.status(200);
    });
  done();
});
});
