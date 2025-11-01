const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const { getRandomIntInclusive } = require("../../../util/randomValues");
const { HMOList } = require("../../prompts/HMOList");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("here_me_out")
    .setDescription("Also Nightmare Blunt Rotation"),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      await interaction.followUp(
        HMOList[getRandomIntInclusive(HMOList.length - 1)]
      );
    } catch (error) {
      console.error(`Something went wrong in hereMeOut: ${error}`);
    }
  },
};
