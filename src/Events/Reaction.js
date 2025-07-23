function MessageReaction(react){
    console.log(react.emoji.name);
    switch (react.emoji.name){
        case("🫃"):
            react.message.react("🫃");
            break;
        case("🤯"):
            react.message.reply("https://tenor.com/view/mike-wazowski-mike-pog-pog-gif-154717314566640477");
            break;
        case("💀"):
            react.message.reply("https://tenor.com/view/animals-dance-meme-tik-tok-gif-23397318");
            break
    }}

module.exports = {
    MessageReaction
}

