const { SlashCommandBuilder } = require("discord.js");
const { getRandomIntInclusive } = require("../../../util/randomValues");
const {
  diceoptions,
} = require("../../../util/MessageComponents/Content/prompts/diceoptions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("diceroll")
    .setDescription("Roll A Die")
    .addIntegerOption((int) =>
      int
        .setName("number")
        .setDescription("1-100")
        .setMaxValue(100)
        .setRequired(true)
        .setMinValue(1)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      await interaction.followUp(
        `Out of ${interaction.options.getInteger("number")} you got a ${
          diceoptions[
            getRandomIntInclusive(interaction.options.getInteger("number") - 1)
          ]
        }`
      );
    } catch (error) {
      console.error(`Something went wrong in diceroll: ${error}`);
    }
  },
};
