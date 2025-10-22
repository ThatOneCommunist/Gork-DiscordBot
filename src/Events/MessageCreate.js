const { client } = require("../util/client.js");
const {
  JAX_ID,
  ORANGE_SERVER_ID,
  ORANGE_TXTCHANEL_ID,
} = require("../util/constants.js");
const { getRandomIntInclusive } = require("../util/randomValues.js");
const { censorList } = require("./prompts/cesorList.js");
const { generalPrompt } = require("./prompts/generalPrompts.js");
const { questionprompts } = require("./prompts/questionPrompts.js");
const { specialPrompts, triggers } = require("./prompts/specialPrompts.js");
const { Wordle } = require("../util/Wordle.js");

var jaxcount = 1;

async function MessageCreate(msg) {
  // Only reply in this function
  var botId = `<@${client.user.id}>`; // Easy way to check for if Gork is @ed
  var cleanMessage = CleanMessage(msg); //gives promise not string
  var userId = `<@${msg.author.id}>`;
  try {
    // JAXSON SPAM
    if (msg.author.id.includes(JAX_ID)) {
      msg.author.send(`<@${JAX_ID}> ${jaxcount}`);
      jaxcount += 1;
    }
    SpecialRequest(msg);
    switch (true) {
      case CensorCheck(msg):
        Censor(msg);
        return;
      // Question statement TODO: ADD MORE
      case FactCheck(msg, botId):
        msg.reply(
          questionprompts[getRandomIntInclusive(questionprompts.length - 1)]
        );
        return;
      // WORDLE BOT
      case msg.content.includes(botId) &&
        msg.content.toLowerCase().includes("wordle"):
        let wordInt = `${msg.content.replace(/[^0-9]/gis, "")}`; // Removes anything thats not a number
        msg.reply(Wordle(wordInt.replace(client.user.id, ""), msg, userId)); // Removes Gorks ID
        return;
      // Have @GORK above this case
      case msg.content.includes(botId):
        msg.reply(
          generalPrompt[getRandomIntInclusive(generalPrompt.length - 1)]
        );
        return;
      // GORK MISPELL
      case GorkMisspell(msg):
        msg.reply("SAY MY NAME CORRECTLY");
        msg.react("😡");
        return;
      // Special Case
      default:
        if (!msg.author.id.includes(botId)) {
          SpecialCaseSearch(triggers, specialPrompts, msg);
        }
        return;
    }
  } catch (error) {
    console.error(
      `Something went wrong in the message creation section ${error}`
    );
  }
}

function FactCheck(msg, botId) {
  return (
    msg.content.toLowerCase().includes(botId) &&
    (msg.content.toLowerCase().includes("fake") ||
      msg.content.toLowerCase().includes("false") ||
      msg.content.toLowerCase().includes("true"))
  );
}

function SpecialRequest(msg) {
  if (
    msg.guildId === ORANGE_SERVER_ID &&
    msg.channelId === ORANGE_TXTCHANEL_ID
  ) {
    msg.react("🍊");
  }
}

// Searches if the message contains the trigger
function SpecialCaseSearch(trigger, prompt, msg) {
  for (let i = 0; i < trigger.length; i++) {
    if (msg.content.toLowerCase().includes(trigger[i])) {
      try {
        msg.reply(prompt[i]);
        return;
      } catch (error) {
        console.error(error);
        return;
      }
    }
  }
}

function GorkMisspell(msg) {
  if (
    // returns -1 if not included
    msg.content.search(/@[a-z]ork/gis) > -1 ||
    msg.content.search(/@[a-z]rok/gis) > -1
  ) {
    return true;
  } else {
    return false;
  }
}

function CensorCheck(msg) {
  if (msg.author.id === client.user.id) return false;
  for (word of censorList) {
    if (msg.content.includes(word)) {
      return word;
    }
  }
  return false;
}

async function Censor(msg) {
  await msg.reply(
    `How dare you your language disgusts me!😡\n\nRead at your own risk ||${msg.content}||`
  );
  if (msg.deletable) {
    msg.delete();
  }
  return;
}
// Not Implemented
function CleanMessage(msg) {
  var cleanMessage = msg.content.toLowerCase();
  return cleanMessage.replace(/['-_]/g, "");
}

module.exports = {
  MessageCreate,
};
