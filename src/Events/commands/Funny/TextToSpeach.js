const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { client } = require('../../../util/client');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tts')
		.setDescription('Joins the vc and says your message')
        .addStringOption(msg => 
            msg.setDescription("message to Send")
            .setRequired(true)
            .setName("message")
        ),
	async execute(interaction) {
		try {
			await interaction.reply({content:`${interaction.options.getString("message")}`,flags:MessageFlags.Ephemeral});
		} catch (error) {
			console.log(error);
		}
	},
};