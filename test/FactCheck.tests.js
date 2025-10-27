const {
  FactCheck,
} = require("../src/util/MessageComponents/booleanChecks/FactCheck");
const { expect } = require("chai");

describe("FactCheck boolean function", function () {
  it("should return true", function () {
    expect(
      FactCheck(`<@1393814433473757255> is true`, `<@1393814433473757255>`)
    ).to.equal(true);
  });
  it("should return false", function () {
    expect(
      FactCheck(`<@1393814433473757255> hello`, `<@1393814433473757255>`)
    ).to.equal(false);
  });
});
