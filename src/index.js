const { token } = require("./util/config.json");
const { client } = require("./util/client.js");
const { Events } = require("discord.js");
const { MessageReaction } = require("./Events/Reaction.js");
const { Ready } = require("./Events/Ready.js");
const { MessageCreate, SpecialRequest } = require("./Events/MessageCreate.js");
const { CommandDeploy } = require("./Events/Command.js");
const { killVC } = require("./Events/commands/VoiceChat/killVC.js");
const { DM_USER, DM_CHANNEL_ID } = require("./util/constants.js");

global.self = global;
Ready();
client.on(Events.Error, async (error) => {
  client.users.send(DM_USER, error);
  console.error(error);
}); // May not work

client.on(Events.MessageReactionAdd, async (react) => {
  MessageReaction(react);
});
client.on(Events.MessageCreate, async (msg) => {
  try {
    message = `${msg.createdAt.getHours()}:${msg.createdAt.getMinutes()} ${
      msg.author.username
    } ${msg.content}`;
    if (msg.channelId != DM_CHANNEL_ID) {
      if (!msg.inGuild()) {
        client.users.send(DM_USER, message);
      } // Logs to my DM
      console.log(message);
    }
  } catch (error) {
    console.error(`Error with logging: ${error}`);
  }
  MessageCreate(msg);
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
