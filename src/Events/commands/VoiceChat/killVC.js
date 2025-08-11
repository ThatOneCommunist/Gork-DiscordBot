const { VoiceConnectionStatus } = require("@discordjs/voice");
const { connection } = require("./TextToSpeach");
const fs = require("fs");
const path = require("path");
const { player } = require("../../../util/player");

async function killVC() {
  player.stop();
  const filepath = path.join(__dirname, "tts_mp3");
  await fs.readdir(filepath, async (err, files) => {
    if (err) throw err;

    for (const file of files) {
      await fs.unlink(path.join(filepath, file), (err) => {
        if (err) return;
      });
    }
  });
}

module.exports = {
  killVC,
};
