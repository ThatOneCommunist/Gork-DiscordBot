const { generalPrompt } =  require('./generalPrompts.js');
const { questionprompts } = require('./questionPrompts.js');
const { Client, IntentsBitField, CommandInteraction } = require('discord.js');
var botId = new String();
var jaxcount = 1
var userId = new String();
// What Gork can 
const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildExpressions,
        IntentsBitField.Flags.GuildIntegrations
        
]});
client.on('ready', (c)=> {
    console.log(c.user+' is gooning');
    botId = '<@1393814433473757255>'; // Easy way to check for if Gork is @ed
    timing = 2147483646;
});

// random message if he is @ed and asked is this true
client.on('messageCreate', (msg)=>{
    console.log(msg.content);
    userId = "<@"+msg.author.id+">"
    switch (true){
        case(msg.content.toLowerCase().includes((botId+" is this true"))) || 
        (msg.content.toLowerCase().includes(botId+" is this fake")) || 
        (msg.content.toLowerCase().includes(botId+" is this false")) :
            msg.reply(questionprompts[Math.floor(Math.random()*questionprompts.length)]);
            timing = 2147483646
            break;
        // Tyson Request TODO: ADD SPECIAL PROMPTS IN A SEPERATE FOLDER
        case(msg.content.includes("WHAT DID I SACRIFICE")):
            msg.reply("https://tenor.com/view/luthen-rael-luthen-rael-star-wars-andor-gif-5644261169390854326");
            timing = 2147483646
            break;
        // GABE IS A FURRY
        case(msg.content.toLowerCase().includes("gabe is a furry")):
            msg.reply("ON MY MOMMA THATS TRUE");
            timing = 2147483646
            break;
        // WORDLE BOT TODO: ADD A REGEX
        case(msg.content.includes(botId) && msg.content.toLowerCase().includes('wordle')):
            console.log(msg.content.replace(/^\d+$/, ''))
            Wordle(msg.content.replace(/^\d+$/, '').valueOf,msg)
            break;
            
        case(msg.content.includes(botId)):
            msg.reply(generalPrompt[Math.floor(Math.random()*generalPrompt.length)]);
            timing = 2147483646
            break;
        // GORK MISPELL
        case(msg.content.includes("@hork") || msg.content.includes('@grok')):
            msg.reply("SAY MY NAME CORRECTLY")
            msg.react('😡')
            break;
        // JAXSON SPAM TODO: ADD A YAML FILE OR SMT TO ADD MEMORY SO COUNT DOESNT RESET
        case(msg.author.id.includes('890678553304244264')):
            msg.author.send("<@890678553304244264> "+jaxcount);
            jaxcount += 1;
            break;

        default:
            break;
}
    }
);

client.on('messageReactionAdd', (react)=>{
    console.log(react.emoji.name);
    switch (react.emoji.name){
        case("🫃"):
        react.message.react("🫃")
        break;
    }
})

function Wordle(int,msg){
    switch (int){
        case 1:
            msg.reply(userId+" cheated")
            break;
        case 2:
            msg.reply(userId+" Thats How we do https://tenor.com/view/wordle-wordle-win-wordle-in2-wordle-in-two-wordle-easy-gif-24546309")
            break;
        case 3:
            msg.reply("Don't Hate on"+userId+"https://tenor.com/view/wordle-wordle-in3-wordle-in-three-worlde-easy-wordle-win-gif-24560879")
            break;
        case 4:
            msg.reply("https://tenor.com/view/wordle-wordle-in-four-wordle-in4-wordle-win-gif-24571752")
            break;
        case 5:
            msg.reply("https://tenor.com/view/wordle-wordle-in5-wordle-in-five-wordle-meme-wordle-win-gif-24596089")
            break;
        case 6:
            msg.reply("https://tenor.com/view/wordle-wordle-meme-wordle-in6-wordle-in-six-wordle-fail-gif-25053177")
            break;
        default:
            msg.reply("I have been programed to say you failed in this instance https://tenor.com/view/wordle-wordle-challenging-wordle-fail-wordle-no-dictionary-wordle-hard-gif-24545672");
            break;
    }
}
// Where to put the Token
client.login("");
