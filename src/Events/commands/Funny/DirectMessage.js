const { SlashCommandBuilder } = require('discord.js');
const { client } = require('../../client');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('directmessage')
		.setDescription("Gork DM's someone on your behalf privately")
		.addUserOption(user => 
			user.setName("user")
			.setDescription("Which user to send it to")
			.setRequired(true)
		)
		.addStringOption(msg =>
			msg.setName("message")
			.setDescription("The message to send to the user")
			.setRequired(true)
		),
	async execute(interaction) {
		try {
			await client.users.send(interaction.options.getUser('user').id.toString(),interaction.options.getString('message'));
		} catch (error) {
			console.log(error)
			interaction.reply("Did not send :(")
		}
		
	},
};