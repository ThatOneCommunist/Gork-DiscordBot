const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const fs = require('fs')
const { AudioPlayer, createAudioPlayer, NoSubscriberBehavior, createAudioResource } = require('@discordjs/voice');
const { joinVoiceChannel } = require('@discordjs/voice');
const { join } = require('path');
const path = require('path');
const tts = require('google-tts-api');
const axios = require('axios');

const player = createAudioPlayer({
  behaviors:{
    noSubscriber: NoSubscriberBehavior.Pause,
  }
})
const filepath = path.join(__dirname,'tts.mp3')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tts')
		.setDescription('Joins the vc and says your message')
        .addStringOption(msg => 
            msg.setDescription("message to Send")
            .setRequired(true)
            .setName("message")
            .setMaxLength(200)
        ),
	async execute(interaction) {
		try {
			textToSpeech(interaction.options.getString("message"),'en',filepath)
      const resource = await createAudioResource(filepath);
      const connection = joinVoiceChannel({
        channelId: interaction.member.voice.channel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });
      connection.subscribe(player)
      player.play(resource)
			await interaction.reply({content:`message recieved`,flags:MessageFlags.Ephemeral});
		} catch (error) {
			console.log(error);
      interaction.reply("I want to kill myself");
		}
	},
};


// Function to convert text to speech and save as an audio file
async function textToSpeech(text, language, outputFile) {
  try {
    const url = await tts.getAudioUrl(text, {
      lang: language || 'en',
      slow: false,
      host: 'https://translate.google.com',
    });
    console.log(url);
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    fs.writeFileSync(outputFile, Buffer.from(response.data));
  } catch (error) {
    console.error('Error converting text to speech:', error);
  }
}

