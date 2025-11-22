const { SlashCommandBuilder } = require("discord.js");
const { getRandomIntInclusive } = require("../../../util/randomValues");
const fs = require("node:fs");
const { CreateFile } = require("../../../util/MessageComponents/CreateFile");
const files = fs.readdirSync("./src/util/MessageComponents/Content/trilobite");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("trilobite")
    .setDescription("no description needed"),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      var number = getRandomIntInclusive(files.length) + 1;
      await interaction.followUp({
        content: `🦧`,
        files: [CreateFile("trilobite", `Trilobite${number}.webp`)],
      });
    } catch (error) {
      console.error(`Something went wrong in trilobite${error}`);
    }
  },
};
