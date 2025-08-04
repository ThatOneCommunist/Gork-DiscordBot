const { joinVoiceChannel } = require('@discordjs/voice');

module.exports.connection = joinVoiceChannel({
	channelId: channel.id,
	guildId: channel.guild.id,
	adapterCreator: channel.guild.voiceAdapterCreator,
});