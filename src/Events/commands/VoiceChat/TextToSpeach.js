const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const fs = require("fs");
const {
  createAudioResource,
  AudioPlayerStatus,
  entersState,
} = require("@discordjs/voice");
const { joinVoiceChannel } = require("@discordjs/voice");
const path = require("path");
const tts = require("google-tts-api");
const axios = require("axios");
const { player } = require("../../../util/player");
const { console } = require("inspector");
const { setTimeout } = require("timers/promises");
const mp3Duration = require("mp3-duration");
const { ADDED_TIME } = require("../../../util/constants");

const filepath = path.join(__dirname, "tts_mp3");
var durations = 0;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("tts")
    .setDescription("Joins the vc and says your message")
    .addStringOption((msg) =>
      msg.setDescription("message to Send").setRequired(true).setName("message")
    )
    .addStringOption((lang) =>
      lang
        .setName("language")
        .setDescription("the language the voice speaks in")
        .addChoices(
          //shortened List
          { name: "Afrikaans", value: "af" },
          { name: "Amharic", value: "am" },
          { name: "Arabic", value: "ar" },
          { name: "Bulgarian", value: "bg" },
          { name: "Bislama", value: "bi" },
          { name: "Bengali", value: "bn" },
          { name: "Bosnian", value: "bs" },
          { name: "Catalan", value: "ca" },
          { name: "Czech", value: "cs" },
          { name: "Welsh", value: "cy" },
          { name: "Danish", value: "da" },
          { name: "German", value: "de" },
          { name: "Greek", value: "el" },
          { name: "Chinese", value: "zh" },
          { name: "Spanish", value: "es" },
          { name: "Estonian", value: "et" },
          { name: "Basque", value: "eu" },
          { name: "Finnish", value: "fi" },
          { name: "French", value: "fr" },
          { name: "Galician", value: "gl" },
          { name: "Gujarati", value: "gu" },
          { name: "Hausa", value: "ha" },
          { name: "Hebrew", value: "he" },
          { name: "Hindi", value: "hi" },
          { name: "Croatian", value: "hr" }
        )
    ),
  // When the command is called
  async execute(interaction) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    if (AudioPlayerStatus.Playing == player.state.status) {
      interaction.followUp({
        content: `already playing a message`,
        flags: MessageFlags.Ephemeral,
      });
      return;
    }
    await interaction.followUp({
      content: `playing message`,
      flags: MessageFlags.Ephemeral,
    });
    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });
    await textToSpeech(
      interaction.options.getString("message"),
      interaction.options.getString("language")
    );
    // Subscribe the connection to the audio player (will play audio on the voice connection)
    const subscription = await connection.subscribe(player);

    // subscription could be undefined if the connection is destroyed!
    if (!subscription) {
      // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
      await subscription.unsubscribe();
    }
    await fs.readdir(filepath, async (err, files) => {
      if (err) throw err;

      for (let i = 0; i < files.length; i++) {
        try {
          const resource = await createAudioResource(
            path.join(filepath, `tts${i}.mp3`)
          );
          await start(resource);
          await mp3Duration(
            path.join(filepath, `tts${i}.mp3`),
            async (err, duration) => {
              if (err) return console.error(err.message);
              durations = duration + ADDED_TIME;
            }
          );
          await setTimeout(parseInt(durations) * 1000);
        } catch (err) {
          console.error(`Something went wrong in Voicechat: ${err}`);
          return;
        }
      }
      // Does Not Work
      await setTimeout(2000);
      await player.stop();
      while(!connection.disconnect()){}
      connection.destroy()
      return;
    });
  },
};
// Function to convert text to speech and save as an audio file
async function textToSpeech(text, language) {
  try {
    const url = tts.getAllAudioUrls(text, {
      lang: language || "en",
      slow: false,
      host: "https://translate.google.com",
    });
    for (let i = 0; i < url.length; i++) {
      const response = await axios.get(url[i].url, {
        responseType: "arraybuffer",
      });
      fs.writeFileSync(`${filepath}/tts${i}.mp3`, Buffer.from(response.data));
    }
  } catch (error) {
    console.error("Error converting text to speech:", error);
  }
}

async function start(resource) {
  player.play(resource);
  try {
    await entersState(player, AudioPlayerStatus.Playing, 5_000);
    // The player has entered the Playing state within 5 seconds
  } catch (error) {
    // The player has not entered the Playing state and either:
    // 1) The 'error' event has been emitted and should be handled
    // 2) 5 seconds have passed
    console.error("Error with playback", error);
    return;
  }
}
