const { token } = require('./util/config.json');
const { client } = require('./util/client.js');
const { Events } = require('discord.js');
const { MessageReaction } = require('./Events/Reaction.js');
const { Ready } = require('./Events/Ready.js');
const { MessageCreate } = require('./Events/MessageCreate.js');
const { CommandDeploy } = require('./Events/Command.js');

global.self = global;
Ready();
client.on(Events.Error, error =>{
    console.log(error);
    client.users.send("746772138731765820", error);
});
client.on(Events.MessageReactionAdd, react=>{
    MessageReaction(react);
});
client.on(Events.MessageCreate, msg =>{
    message = msg.createdAt.getHours()+":"+msg.createdAt.getMinutes()+" "+msg.author.username+" "+msg.content// Bad way to log timestamp
    if (msg.channelId!="1394019812015079495"){// Logs to my DM
        if(!msg.inGuild()){
        client.users.send("746772138731765820", message)};
        console.log(message);
    }
    MessageCreate(msg);
});
client.on(Events.InteractionCreate, interaction =>{
    CommandDeploy(interaction)
    if(interaction.isChatInputCommand()){
        console.log(interaction.commandName+" "+interaction.user.tag)
    }
});
client.login(token);