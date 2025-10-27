const {
  GorkMisspell,
} = require("../src/util/MessageComponents/booleanChecks/GorkMisspell");
const { expect } = require("chai");

describe("GorkMisspell boolean function", function () {
  it("should return true", function () {
    expect(GorkMisspell(`@bork is true`)).to.equal(true);
  });
  it("should return false", function () {
    expect(GorkMisspell(`<@1393814433473757255> hello`)).to.equal(false);
  });
});
