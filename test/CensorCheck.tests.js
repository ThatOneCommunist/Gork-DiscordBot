const {
  CensorCheck,
} = require("../src/util/MessageComponents/booleanChecks/CensorCheck");
const { expect } = require("chai");
const botID = "1393814433473757255";
describe("Censor Check boolean function", function () {
  describe("#Gork ID censor", function () {
    it("should return false", function () {
      expect(
        CensorCheck(
          `i am having a fun time at my job`,
          `1393814433473757255`,
          botID
        )
      ).to.equal(false);
    });
  });
  describe("Gork ID not censor", function () {
    it("should return false", function () {
      expect(
        CensorCheck(`hello how are you today`, `1393814433473757255`, botID)
      ).to.equal(false);
    });
  });
  describe("random ID not censor", function () {
    it("should return true", function () {
      expect(
        CensorCheck(`i am having a fun time at my job`, `5`, botID)
      ).to.equal(true);
    });
  });
  describe("random ID not censor", function () {
    it("should return false", function () {
      expect(CensorCheck(`hello how are you today`, `5`, botID)).to.equal(
        false
      );
    });
  });
});
