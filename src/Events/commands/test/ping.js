const { SlashCommandBuilder } = require("discord.js");
const { client } = require("../../../util/client");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    try {
      await interaction.reply(`Pong! ${client.ws.ping}ms`);
    } catch (error) {
      console.log(error);
    }
  },
};
