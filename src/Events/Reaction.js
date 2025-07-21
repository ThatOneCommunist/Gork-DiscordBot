function MessageReaction(react){
    console.log(react.emoji.name);
    switch (react.emoji.name){
        case("🫃"):
        react.message.react("🫃")
        break;
        case("🤯"):
        react.message.reply("https://tenor.com/view/mike-wazowski-mike-pog-pog-gif-154717314566640477");
    }}

module.exports = {
    MessageReaction
}

