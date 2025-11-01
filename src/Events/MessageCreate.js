const {
  FactCheck,
} = require("../util/MessageComponents/booleanChecks/FactCheck.js");
const { client } = require("../util/client.js");
const {
  JAX_ID,
  ORANGE_SERVER_ID,
  ORANGE_TXTCHANEL_ID,
} = require("../util/constants.js");
const { getRandomIntInclusive } = require("../util/randomValues.js");
const { generalPrompt } = require("./prompts/generalPrompts.js");
const { questionprompts } = require("./prompts/questionPrompts.js");
const { specialPrompts, triggers } = require("./prompts/specialPrompts.js");
const { Wordle } = require("../util/MessageComponents/Wordle.js");
const {
  GorkMisspell,
} = require("../util/MessageComponents/booleanChecks/GorkMisspell.js");
const {
  CensorCheck,
} = require("../util/MessageComponents/booleanChecks/CensorCheck.js");
const {
  GeneralCheck,
} = require("../util/MessageComponents/booleanChecks/GeneralCheck.js");

var jaxcount = 1;

async function MessageCreate(msg) {
  // Only reply in this function
  var botId = `<@${client.user.id}>`; // Easy way to check for if Gork is @ed
  var cleanMessage = msg.content.toLowerCase(); //gives promise not string
  var userId = `${msg.author.id}`;
  try {
    // JAXSON SPAM
    if (userId.includes(JAX_ID)) {
      msg.author.send(`<@${JAX_ID}> ${jaxcount}`);
      jaxcount += 1;
    }
    SpecialRequest(msg);
    switch (true) {
      case CensorCheck(cleanMessage, userId, client.user.id):
        await msg.reply(
          `How dare you <@${userId}>, your language disgusts me!😡\n\nRead at your own risk: ||${msg.content}||`
        );
        CensorDelete(msg);
        return;
      // Question statement TODO: ADD MORE
      case FactCheck(cleanMessage, botId):
        msg.reply(
          questionprompts[getRandomIntInclusive(questionprompts.length - 1)]
        );
        return;
      // WORDLE BOT
      case WordleCheck(cleanMessage, botId):
        let wordInt = `${msg.content.replace(/[^0-9]/gis, "")}`; // Removes anything thats not a number
        msg.reply(Wordle(wordInt.replace(client.user.id, ""), userId)); // Removes Gorks ID
        return;
      // Have @GORK above this case
      case GeneralCheck(cleanMessage, botId):
        msg.reply(
          generalPrompt[getRandomIntInclusive(generalPrompt.length - 1)]
        );
        return;
      // GORK MISPELL
      case GorkMisspell(cleanMessage):
        msg.reply(
          "https://cdn.discordapp.com/attachments/1319845797713412159/1433298552733433938/image0.gif?ex=6904d78c&is=6903860c&hm=940686f2efd163fa1eeedcce6fa6ddefcb2740673200784438289ef2d5d042d3&"
        );
        msg.react("😡");
        return;
      // Special Case
      case !msg.author.id.includes(client.user.id):
        let prompt = SpecialCaseSearch(triggers, specialPrompts, cleanMessage);
        if (prompt) {
          msg.reply(prompt);
        }
        return;
      default:
        return;
    }
  } catch (error) {
    console.error(
      `Something went wrong in the message creation section ${error}`
    );
  }
}

function WordleCheck(msg, botId) {
  return msg.includes(botId) && msg.includes("wordle");
}

// Searches if the message contains the trigger
function SpecialCaseSearch(trigger, prompt, msg) {
  for (let i = 0; i < trigger.length; i++) {
    if (msg.includes(trigger[i])) {
      try {
        return prompt[i];
      } catch (error) {
        console.error(error);
        return;
      }
    }
  }
  return null;
}

function CensorDelete(msg) {
  if (msg.deletable) {
    msg.delete();
  }
  return;
}

// Add more cleans
function CleanMessage(msg) {
  var cleanMessage = msg.content.toLowerCase();
  return cleanMessage.replace(/['-_]/g, "");
}
// Not important enough to require any updates
function SpecialRequest(msg) {
  if (
    msg.guildId === ORANGE_SERVER_ID &&
    msg.channelId === ORANGE_TXTCHANEL_ID
  ) {
    msg.react("🍊");
  }
}
module.exports = {
  MessageCreate,
};
