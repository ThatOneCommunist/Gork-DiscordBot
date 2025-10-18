const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { client } = require("../../../util/client.js");
const { JAX_ID, JAX_MESSAGE } = require("../../../util/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jaxson")
    .setDescription("just spam it"),
  async execute(interaction) {
    try {
      await client.users.send(JAX_ID, JAX_MESSAGE);
      await interaction.reply({
        content: `something happened`,
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      await interaction.reply({
        content: "Did not send :(",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
