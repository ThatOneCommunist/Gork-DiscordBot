const { token } = require('./Events/config.json');
const { client } = require('./Events/client.js');
const { Events } = require('discord.js');
const { MessageReaction } = require('./Events/Reaction.js');
const { Ready } = require('./Events/Ready.js');
const { MessageCreate } = require('./Events/MessageCreate.js');
const { CommandDeploy } = require('./Events/Command.js');

Ready();
client.on(Events.MessageReactionAdd, react=>{
    MessageReaction(react);
});
client.on(Events.MessageCreate, msg =>{
    message = msg.createdAt.getHours()+":"+msg.createdAt.getMinutes()+" "+msg.author.username+" "+msg.content// Bad way to log timestamp
    if (!msg.inGuild()&&msg.channelId!="1394019812015079495")
        client.users.send("746772138731765820", message);
    console.log(message);
    MessageCreate(msg)
});
client.on(Events.InteractionCreate, interaction =>{
    CommandDeploy(interaction)
});
client.login(token);