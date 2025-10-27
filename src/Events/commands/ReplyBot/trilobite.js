const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const { getRandomIntInclusive } = require("../../../util/randomValues");
const fs = require("node:fs");
const files = fs.readdirSync("./src/util/trilobite");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("trilobite")
    .setDescription("no description needed"),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      var number = getRandomIntInclusive(files.length);
      var file = new AttachmentBuilder(
        fs.readFileSync(`./src/util/trilobite/Trilobite${number}.webp`),
        { name: `Trilobite${number}.webp` }
      );

      await interaction.followUp({ content: `🦧`, files: [file] });
    } catch (error) {
      console.error(`Something went wrong in trilobite${error}`);
    }
  },
};
