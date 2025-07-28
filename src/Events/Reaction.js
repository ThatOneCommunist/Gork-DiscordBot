function MessageReaction(react){
    console.log(react.emoji.name);
    switch (react.emoji.name){
        case("🫃"):
            react.message.react("🫃");
            break;
        case("👅"):
            react.message.react("👅")
            break;
        case("🤯"):
            react.message.reply("https://tenor.com/view/mike-wazowski-mike-pog-pog-gif-154717314566640477");
            break;
        case("💀"):
            react.message.reply("https://tenor.com/view/animals-dance-meme-tik-tok-gif-23397318");
            break;
        case("🤓"):
            react.message.reply("https://tenor.com/view/erm-aksuali-veli-vel-nerd-nerd-emoji-gif-11908435316515627035");
            break;
        case("👲"):
            react.message.reply("https://tenor.com/view/falling-walter-white-pixels-breaking-gif-19050808")
            break;
        case("🕺"):
            react.message.reply("https://tenor.com/view/wolf-dance-dance-wolf-silly-wolf-whats-he-doing-gif-4341778011734075715")
            break;
        case("🥵"):
            react.message.reply("https://tenor.com/view/horny-horny-meter-super-horny-gif-17623996");
            break;
    }}

module.exports = {
    MessageReaction
}

