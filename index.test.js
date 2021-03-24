const { generateWordGrid, wordExistsWithinStr } = require("./");

describe("Word grid", () => {
  describe("generateWordGrid", () => {
    it("should output the correct wordgrid for n=4", () => {
      expect(generateWordGrid("4 eeeeddoonnnsssrv")[0]).toEqual([
        "rose",
        "oven",
        "send",
        "ends",
      ]);
    });

    it.only("should output the correct wordgrid for n=5", () => {
      expect(generateWordGrid("5 aaaeeeefhhmoonssrrrrttttw")[1]).toEqual([
        "feast",
        "earth",
        "armor",
        "stone",
        "threw",
      ]);
    });

    it("should output the correct wordgrid for n=7", () => {
      generateWordGrid("7 aaaaaaaaabbeeeeeeedddddggmmlloooonnssssrrrruvvyyy");
    });

    /* it("should output the correct wordgrid for n=5", () => {
      expect(generateWordGrid("5 aaaeeeefhhmoonssrrrrttttw")).toEqual([
        "feast",
        "earth",
        "armor",
        "stone",
        "threw",
      ]);
    }); */
  });

  describe("wordExistsWithinStr", () => {
    it("should pass when word exists within a string", () => {
      expect(wordExistsWithinStr("hello", "oohhllee")).toBe(true);
      expect(wordExistsWithinStr("potato", "ootpoat")).toBe(true);
      expect(
        wordExistsWithinStr(
          "adverbs",
          "aaaaaaaaabbeeeeeeedddddggmmlloooonnssssrrrruvvyyy"
        )
      ).toBe(true);
    });

    it("should return false when word does not exist within a string", () => {
      expect(wordExistsWithinStr("hello", "oleh")).toBe(false);
      expect(wordExistsWithinStr("potato", "poaot")).toBe(false);
    });
  });
});
