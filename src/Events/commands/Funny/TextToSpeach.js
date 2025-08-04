const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { client } = require('../../../util/client');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const util = require('util');
const fs = require('fs')

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
			convertTextToMp3(interaction.options.getString("message"),'placeholder')
			await interaction.reply({content:`${interaction.options.getString("message")}`,flags:MessageFlags.Ephemeral});
		} catch (error) {
			console.log(error);
		}
	},
};

    async function convertTextToMp3(text, outputPath) {
      const ttsclient = new TextToSpeechClient();

      const request = {
        input: { text: text },
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
      };
	  
      const [response] = await ttsclient.synthesizeSpeech(request);
      const writeFile = util.promisify(fs.writeFile);
      await writeFile(outputPath, response.audioContent, 'binary');
      console.log(`Audio content written to file: ${outputPath}`);
    }