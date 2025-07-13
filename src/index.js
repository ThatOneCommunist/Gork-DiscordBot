const { generalPrompt } =  require('./generalPrompts.js');
const { questionprompts} = require('./questionPrompts.js');
const { Client, IntentsBitField } = require('discord.js');
var botId = new String();
const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.MessageContent,
]});
client.on('ready', (c)=> {
    console.log(c.user.tag+' is gooning');
    botId = '<@1393814433473757255>' // Easy way to check for if Gork is @ed
});

// random message if he is @ed and asked is this true
client.on('messageCreate', (msg)=>{
    console.log(msg.content);
    if (msg.content.toLowerCase().includes((botId+" is this true")) || 
    msg.content.toLowerCase().includes((botId+" is this fake")) || msg.content.toLowerCase().includes((botId+" is this false"))){
        msg.reply(questionprompts[Math.floor(Math.random()*questionprompts.length)]);
    }
    // More general whenever gork is @ed
    else if (msg.content.includes(botId)) {
        msg.reply(generalPrompt[Math.floor(Math.random()*generalPrompt.length)]);
    }
});


client.login("");
