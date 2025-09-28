const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { client } = require("../../../util/client.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jaxson")
    .setDescription("just spam it"),
  async execute(interaction) {
    try {
      await client.users.send(
        "890678553304244264",
        "What are you passionate about?"
      );
      interaction.reply({
        content: `something happened`,
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.log(error);
      interaction.reply({
        content: "Did not send :(",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
