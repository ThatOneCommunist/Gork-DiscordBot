const { client } = require("../../client");
const { censorList } = require("../../Content/prompts/cesorList");
function CensorCheck(msg, userId, botId) {
  if (userId.includes(botId)) {
    return false;
  }
  for (word of censorList) {
    if (msg.includes(word)) {
      return true;
    }
  }
  return false;
}
exports.CensorCheck = CensorCheck;
