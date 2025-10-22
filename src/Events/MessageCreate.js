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

var jaxcount = 1;
const botId = `<@${client.user.id}>`; // Easy way to check for if Gork is @ed

function MessageCreate(msg) {
  const userId = `<@${msg.author.id}>`;
  try {
    SpecialRequest(msg);
    switch (true) {
      case CensorCheck(msg):
        Censor(msg);
        break;
      // Question statement TODO: ADD MORE
      case FactCheck(msg, botId):
        msg.reply(
          questionprompts[getRandomIntInclusive(questionprompts.length - 1)]
        );
        break;
      // WORDLE BOT
      case msg.content.includes(botId) &&
        msg.content.toLowerCase().includes("wordle"):
        let wordInt = `${msg.content.replace(/[^0-9]/gis, "")}`; // Removes anything thats not a number
        Wordle(wordInt.replace(botId, ""), msg, userId); // Removes Gorks ID
        break;
      // Have @GORK above this case
      case msg.content.includes(botId):
        msg.reply(
          generalPrompt[getRandomIntInclusive(generalPrompt.length - 1)]
        );
        break;
      // GORK MISPELL
      case GorkMisspell(msg):
        msg.reply("SAY MY NAME CORRECTLY");
        msg.react("😡");
        break;
      // Special Case
      default:
        if (!msg.author.id.includes(botId)) {
          SpecialCaseSearch(triggers, specialPrompts, msg);
        }
        break;
    }
    // JAXSON SPAM
    if (msg.author.id.includes(JAX_ID)) {
      msg.author.send(`<@${JAX_ID}> ${jaxcount}`);
      jaxcount += 1;
    }
  } catch (error) {
    console.log(error);
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

function Wordle(int, msg, userId) {
  switch (int) {
    case "1":
      msg.reply(`${userId} cheated`);
      break;
    case "2":
      msg.reply(
        `${userId}" Thats How we do https://tenor.com/view/wordle-wordle-win-wordle-in2-wordle-in-two-wordle-easy-gif-24546309`
      );
      break;
    case "3":
      if (msg.author.id === "663106262359080971") {
        msg.reply(
          `Hate on${userId}https://tenor.com/view/wordle-wordle-in3-wordle-in-three-worlde-easy-wordle-win-gif-24560879`
        );
      } else {
        msg.reply(
          `Don't Hate on${userId}https://tenor.com/view/wordle-wordle-in3-wordle-in-three-worlde-easy-wordle-win-gif-24560879`
        );
      }
      break;
    case "4":
      msg.reply(
        `here ${userId}ROAR :wolf: https://tenor.com/view/wordle-wordle-in-four-wordle-in4-wordle-win-gif-24571752`
      );
      break;
    case "5":
      msg.reply(
        `${userId} womp womp https://tenor.com/view/wordle-wordle-in5-wordle-in-five-wordle-meme-wordle-win-gif-24596089`
      );
      break;
    case "6":
      msg.reply(
        `${userId} Dont fall for dem trixs https://tenor.com/view/wordle-wordle-meme-wordle-in6-wordle-in-six-wordle-fail-gif-25053177`
      );
      break;
    default:
      msg.reply(
        `I have been programed to say ${userId} failed in this instance https://tenor.com/view/wordle-wordle-challenging-wordle-fail-wordle-no-dictionary-wordle-hard-gif-24545672`
      );
      break;
  }
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
  //TODO: REMOVE MORE EXTRA THINGS IN THE MESSAGE
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
  if (!msg.content.includes("@")) {
    return false;
  } else if (
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
  if (msg.author.id === botId) return false;
  for (word of censorList) {
    if (msg.content.includes(word)) {
      return true;
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

module.exports = {
  MessageCreate,
};
