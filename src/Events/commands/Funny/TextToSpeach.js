const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { client } = require('../../../util/client');
const util = require('util');
const fs = require('fs')
const TextToSpeech = require('@google-cloud/text-to-speech');
const { AudioPlayer, createAudioPlayer, NoSubscriberBehavior, createAudioResource } = require('@discordjs/voice');
const { joinVoiceChannel } = require('@discordjs/voice');
require('./../../../../serviceaccount.json')

const player = createAudioPlayer({
  behaviors:{
    noSubscriber: NoSubscriberBehavior.Pause,
  }
})


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
			convertTextToMp3(interaction.options.getString("message"),'tts.mp3')
      const resource = createAudioResource('tts.mp3');
      const connection = joinVoiceChannel({
        channelId: interaction.member.voicechannel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });
      player.play(resource)
      connection.subscribe(player)
			await interaction.reply({content:`${interaction.options.getString("message")}`,flags:MessageFlags.Ephemeral});
		} catch (error) {
			console.log(error);
      interaction.reply("I want to kill myself");
		}
	},
};

async function convertTextToMp3(text, outputPath) {
    const ttsclient = new TextToSpeech.TextToSpeechClient
    const request = {
      input: { text: text },
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    };
  
    const [response] = ttsclient.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputPath, response.audioContent, 'binary');
    console.log(`Audio content written to file: ${outputPath}`);
}



