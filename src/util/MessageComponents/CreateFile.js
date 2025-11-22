const { AttachmentBuilder } = require("discord.js");
const fs = require("node:fs");
function CreateFile(dirname, fileName) {
  return (file = new AttachmentBuilder(
    fs.readFileSync(
      `./src/util/MessageComponents/Content/${dirname}/${fileName}`
    ),
    { name: `${fileName}` }
  ));
}

module.exports = {
  CreateFile,
};
