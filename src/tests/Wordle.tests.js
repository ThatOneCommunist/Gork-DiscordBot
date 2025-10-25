import { describe, expect, it } from "vitest";
import { Wordle } from "../util/Wordle";

describe("Wordle function", () => {
  it("should say user cheated", () => {
    expect(Wordle(1, "user").toBe(`<@user> cheated`));
  });
});
