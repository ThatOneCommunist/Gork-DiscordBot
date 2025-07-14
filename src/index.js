const { generalPrompt } =  require('./generalPrompts.js');
const { questionprompts } = require('./questionPrompts.js');
const { Client, IntentsBitField } = require('discord.js');
var botId = new String();
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
    console.log(c.user.tag+' is gooning');
    botId = '<@1393814433473757255>'; // Easy way to check for if Gork is @ed
    timing = 2147483646;
});

// random message if he is @ed and asked is this true
client.on('messageCreate', (msg)=>{
    console.log(msg.content);
    switch (true){
        case(msg.content.toLowerCase().includes((botId+" is this true"))) || 
        (msg.content.toLowerCase().includes(botId+" is this fake")) || 
        (msg.content.toLowerCase().includes(botId+" is this false")) :
            msg.reply(questionprompts[Math.floor(Math.random()*questionprompts.length)]);
            timing = 2147483646
            break;
        
        case(msg.content.includes("WHAT DID I SACRIFICE")):
            msg.reply("https://tenor.com/view/luthen-rael-luthen-rael-star-wars-andor-gif-5644261169390854326");
            timing = 2147483646
            break;
        
        case(msg.content.toLowerCase().includes("gabe is a furry")):
            msg.reply("ON MY MOMMA THATS TRUE");
            timing = 2147483646
            break;
            
        case(msg.content.includes(botId)):
            msg.reply(generalPrompt[Math.floor(Math.random()*generalPrompt.length)]);
            timing = 2147483646
            break;

        default:
             break;
    }
});

client.on('messageReactionAdd', (react)=>{
    console.log(react.emoji.name);
    switch (react.emoji.name){
        case(react.emoji.name):
        break;
    }
})

// Where to put the Token
client.login("");
