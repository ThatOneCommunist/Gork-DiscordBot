const { Wordle } = require("../src/util/MessageComponents/Wordle.js");
const { expect } = require("chai");

describe("Wordle function", function () {
  it("should say user cheated", function () {
    expect(Wordle("1", "user")).to.equal({ content: `<@user> cheated` });
  });
  it("should give response for 2", function () {
    expect(Wordle("2", "user")).to.equal({
      content: `<@user> Thats How we do `,
      files: [file],
    });
  });
  it("should give response for 3", function () {
    expect(Wordle("3", "user")).to.equal({
      content: `Don't Hate on<@user>`,
      files: [file],
    });
  });
  it("should give response for 3 hate", function () {
    expect(Wordle("3", "663106262359080971")).to.equal({
      content: `Hate on<@663106262359080971>`,
      files: [file],
    });
  });
  it("should give response for 4", function () {
    expect(Wordle("4", "user")).to.equal({
      content: `here <@user>ROAR :wolf: `,
      files: [file],
    });
  });
  it("should give response for 5", function () {
    expect(Wordle("5", "user")).to.equal({
      content: `<@user> womp womp `,
      files: [file],
    });
  });
  it("should give response for 6", function () {
    expect(Wordle("6", "user")).to.equal({
      content: `<@user> womp womp `,
      files: [file],
    });
  });
  it("should give response for fail", function () {
    expect(Wordle("10", "user")).to.equal({
      content: `I have been programed to say <@user> failed in this instance `,
      files: [file],
    });
  });
});
