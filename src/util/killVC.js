const fs = require("fs");
const path = require("path");
const { player } = require("./player");

async function killVC() {
  player.stop();
  const filepath = path.join(__dirname, "tts_mp3");
  await fs.readdir(filepath, async (err, files) => {
    if (err) throw err;

    for (const file of files) {
      if (!file.includes(".gitkeep")) {
        await fs.unlink(path.join(filepath, file), (err) => {
          if (err) return;
        });
      }
    }
  });
}

module.exports = {
  killVC,
};
