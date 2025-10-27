const { expect } = require("chai");
const {
  GeneralCheck,
} = require("../src/util/MessageComponents/booleanChecks/GeneralCheck");
const botID = "<@1393814433473757255>";
describe("General Check boolean function", function () {
  describe("#Gork ID in message", function () {
    it("should return true", function () {
      expect(GeneralCheck(`<@1393814433473757255> kys`, botID)).to.equal(true);
    });
  });
  describe("#Gork ID not in message", function () {
    it("should return false", function () {
      expect(GeneralCheck(`whats going on`, botID)).to.equal(false);
    });
  });
});
