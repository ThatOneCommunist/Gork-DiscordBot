const { SlashCommandBuilder } = require('discord.js');
const coin = ["https://tenor.com/view/heads-coinflip-flip-a-coin-coin-coins-gif-21479854","https://tenor.com/view/tails-gif-5172910800602193640"]

module.exports = {
	data: new SlashCommandBuilder()
		.setName("coinflip")
        .setDescription("Flip a coin heads or tails."),
	async execute(interaction) {
		await interaction.reply(coin[Math.random()]);
	},
};