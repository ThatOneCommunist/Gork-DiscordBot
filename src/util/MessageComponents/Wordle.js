const { AttachmentBuilder } = require("discord.js");
const fs = require("node:fs");
const files = fs.readdirSync("./src/util/MessageComponents/Content/trilobite");
function Wordle(int, userId) {
  if (int == "" || int.valueOf() > 6 || int.valueOf <= 0) {
    int = "Fail";
  }
  var file = new AttachmentBuilder(
    fs.readFileSync(
      `./src/util/MessageComponents/Content/Wordle/wordleIn${int}.gif`
    ),
    { name: `WordleIn${int}.gif` }
  );
  switch (int) {
    case "1":
      return { content: `<@${userId}> cheated` };
    case "2":
      return {
        content: `<@${userId}> Thats How we do `,
        files: [file],
      };
    case "3":
      if (
        userId.includes("663106262359080971") ||
        userId.includes("626531197484269578")
      ) {
        return {
          content: `Hate on<@${userId}>`,
          files: [file],
        };
      } else {
        return {
          content: `Don't Hate on<@${userId}>`,
          files: [file],
        };
      }
    case "4":
      return {
        content: `here <@${userId}>ROAR :wolf: `,
        files: [file],
      };
    case "5":
      return {
        content: `<@${userId}> womp womp `,
        files: [file],
      };
    case "6":
      return {
        content: `<@${userId}> Dont fall for dem trixs `,
        files: [file],
      };
    default:
      return {
        content: `I have been programed to say <@${userId}> failed in this instance `,
        files: [file],
      };
  }
}
module.exports = { Wordle };
