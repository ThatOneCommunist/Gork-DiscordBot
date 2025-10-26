const { Wordle } = require("../src/util/MessageComponents/Wordle.js");
const { expect } = require("chai");

describe("Wordle function", function () {
  it("should say user cheated", function () {
    expect(Wordle("1", "user")).to.equal(`<@user> cheated`);
  });
  it("should give response for 2", function () {
    expect(Wordle("2", "user")).to.equal(
      `<@user>" Thats How we do https://tenor.com/view/wordle-wordle-win-wordle-in2-wordle-in-two-wordle-easy-gif-24546309`
    );
  });
  it("should give response for 3", function () {
    expect(Wordle("3", "user")).to.equal(
      `Don't Hate on<@user>https://tenor.com/view/wordle-wordle-in3-wordle-in-three-worlde-easy-wordle-win-gif-24560879`
    );
  });
  it("should give response for 3 hate", function () {
    expect(Wordle("3", "663106262359080971")).to.equal(
      `Hate on<@663106262359080971>https://tenor.com/view/wordle-wordle-in3-wordle-in-three-worlde-easy-wordle-win-gif-24560879`
    );
  });
  it("should give response for 4", function () {
    expect(Wordle("4", "user")).to.equal(
      `here <@user>ROAR :wolf: https://tenor.com/view/wordle-wordle-in-four-wordle-in4-wordle-win-gif-24571752`
    );
  });
  it("should give response for 5", function () {
    expect(Wordle("5", "user")).to.equal(
      `<@user> womp womp https://tenor.com/view/wordle-wordle-in5-wordle-in-five-wordle-meme-wordle-win-gif-24596089`
    );
  });
  it("should give response for 6", function () {
    expect(Wordle("6", "user")).to.equal(
      `<@user> Dont fall for dem trixs https://tenor.com/view/wordle-wordle-meme-wordle-in6-wordle-in-six-wordle-fail-gif-25053177`
    );
  });
  it("should give response for fail", function () {
    expect(Wordle("10", "user")).to.equal(
      `I have been programed to say <@user> failed in this instance https://tenor.com/view/wordle-wordle-challenging-wordle-fail-wordle-no-dictionary-wordle-hard-gif-24545672`
    );
  });
});
