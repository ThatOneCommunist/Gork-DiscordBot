const { token } = require("./util/config.json");
const { client } = require("./util/client.js");
const { Events } = require("discord.js");
const { MessageReaction } = require("./Events/Reaction.js");
const { Ready } = require("./Events/Ready.js");
const { MessageCreate, SpecialRequest } = require("./Events/MessageCreate.js");
const { CommandDeploy } = require("./Events/Command.js");
const { killVC } = require("./Events/commands/VoiceChat/killVC.js");
const { player } = require("./util/player.js");

global.self = global;
Ready();
client.on(Events.Error, async (error) => {
  console.log(error);
  client.users.send("746772138731765820", error);
}); // May not work

client.on(Events.MessageReactionAdd, async (react) => {
  MessageReaction(react);
});
client.on(Events.MessageCreate, async (msg) => {
  message = `${msg.createdAt.getHours()}:${msg.createdAt.getMinutes()} ${
    msg.author.username
  } ${msg.content}`;
  if (msg.channelId != "1394019812015079495") {
    if (!msg.inGuild()) {
      client.users.send("746772138731765820", message);
    } // Logs to my DM
    console.log(message);
  }
  MessageCreate(msg);
  SpecialRequest(msg);
});
client.on(Events.InteractionCreate, async (interaction) => {
  CommandDeploy(interaction);
  if (interaction.isChatInputCommand()) {
    console.log(`${interaction.user.tag} used ${interaction.commandName} `);
  }
});

client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
  try {
    if (oldState.member.id === client.user.id && !newState.channel) {
      killVC();
    }
  } catch {
    return;
  }
});

client.login(token);
