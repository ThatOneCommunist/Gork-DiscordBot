const { CreateFile } = require("./CreateFile");
function Wordle(int, userId) {
  if (int == "" || int.valueOf() > 6 || int.valueOf <= 0) {
    int = "Fail";
  }
  switch (int) {
    case "1":
      return { content: `<@${userId}> cheated` };
    case "2":
      return {
        content: `<@${userId}> Thats How we do `,
        files: [CreateFile("Wordle", `wordleIn${int}.gif`)],
      };
    case "3":
      if (
        userId.includes("663106262359080971") ||
        userId.includes("626531197484269578")
      ) {
        return {
          content: `Hate on<@${userId}>`,
          files: [CreateFile("Wordle", `wordleIn${int}.gif`)],
        };
      } else {
        return {
          content: `Don't Hate on<@${userId}>`,
          files: [CreateFile("Wordle", `wordleIn${int}.gif`)],
        };
      }
    case "4":
      return {
        content: `here <@${userId}>ROAR :wolf: `,
        files: [CreateFile("Wordle", `wordleIn${int}.gif`)],
      };
    case "5":
      return {
        content: `<@${userId}> womp womp `,
        files: [CreateFile("Wordle", `wordleIn${int}.gif`)],
      };
    case "6":
      return {
        content: `<@${userId}> Dont fall for dem trixs `,
        files: [CreateFile("Wordle", `wordleIn${int}.gif`)],
      };
    default:
      return {
        content: `I have been programed to say <@${userId}> failed in this instance `,
        files: [CreateFile("Wordle", `wordleIn${int}.gif`)],
      };
  }
}
module.exports = { Wordle };
