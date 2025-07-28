const { SlashCommandBuilder } = require('discord.js');
const { getRandomIntInclusive } = require('../../randomValues');
const coin = ["https://cdn.discordapp.com/attachments/1327803024344616972/1397439185962537020/xr9x7ts2zd.gif?ex=6881ba29&is=688068a9&hm=617c09c0ed1defd633dbf00cef1cef901f8d2c6271fe1749b93c20d95824749e&",
	"https://cdn.discordapp.com/attachments/1327803024344616972/1397440014719123578/spotify.gif?ex=6881baee&is=6880696e&hm=aed0d84e82c907896989aeab0e6ac68d1a0b7c4fe5b20870dd08348cc01f0307&"]

module.exports = {
	data: new SlashCommandBuilder()
		.setName("coinflip")
        .setDescription("Flip a coin heads or tails."),
	async execute(interaction) {
		try {
			await interaction.reply(coin[getRandomIntInclusive(coin)]);
		} catch (error) {
			console.log(error);
		}
	},
};