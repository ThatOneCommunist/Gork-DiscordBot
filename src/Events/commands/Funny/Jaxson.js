const { SlashCommandBuilder } = require('discord.js');
const { client } = require('../../client');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jaxson')
		.setDescription("I don't know what this does"),
	async execute(interaction) {
		await client.users.send('890678553304244264','KILLLLLL YOURSELF');
	},
};