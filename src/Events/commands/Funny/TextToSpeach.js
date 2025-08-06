const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const fs = require('fs')
const { AudioPlayer, createAudioPlayer, NoSubscriberBehavior, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { joinVoiceChannel } = require('@discordjs/voice');
const { join } = require('path');
const path = require('path');
const tts = require('google-tts-api');
const axios = require('axios');
const { Language, LongLanguageArray } = require('../../../util/ISOLanguages');
const { getRandomIntInclusive } = require('../../../util/randomValues');

const player = createAudioPlayer({
    behaviors:{
        noSubscriber: NoSubscriberBehavior.Pause
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
        )
        .addStringOption(lang =>
          lang.setName('language')
          .setDescription('the language the voice speaks in')
          .addChoices( //shortened List
            { name:'Afrikaans', value: 'af' },
            { name:'Amharic', value: 'am' },
            { name:'Arabic', value: 'ar' },
            { name:'Bulgarian', value: 'bg' },
            { name:'Bislama', value: 'bi' },
            { name:'Bengali', value: 'bn' },
            { name:'Bosnian', value: 'bs' },
            { name:'Catalan', value: 'ca' },
            { name:'Czech', value: 'cs' },
            { name:'Welsh', value: 'cy' },
            { name:'Danish', value: 'da' },
            { name:'German', value: 'de' },
            { name:'Greek', value: 'el' },
            { name:'English', value: 'en'},
            { name:'Spanish', value: 'es' },
            { name:'Estonian', value: 'et' },
            { name:'Basque', value: 'eu' },
            { name:'Finnish', value: 'fi' },
            { name:'French', value: 'fr' },
            { name:'Galician', value: 'gl' },
            { name:'Gujarati', value: 'gu' },
            { name:'Hausa', value: 'ha' },
            { name:'Hebrew', value: 'he' },
            { name:'Hindi', value: 'hi' },
            { name:'Croatian', value: 'hr' },
          )
        ),
	async execute(interaction) {
		try {
			textToSpeech(interaction.options.getString("message"),interaction.options.getString("language"),filepath);
      const resource = await createAudioResource(filepath);
      const connection = joinVoiceChannel({
        channelId: interaction.member.voice.channel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });
      connection.subscribe(player)
      player.play(resource)
			await interaction.reply({content:`message recieved`,flags:MessageFlags.Ephemeral});
      player.on(AudioPlayerStatus.Idle, () =>{
        player.stop();
      });
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
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    fs.writeFileSync(outputFile, Buffer.from(response.data));
  } catch (error) {
    console.error('Error converting text to speech:', error);
  }
}

