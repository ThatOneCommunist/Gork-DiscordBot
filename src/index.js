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
    console.log(msg.createdAt.getHours()+":"+msg.createdAt.getMinutes()+" "+msg.content)// Bad way to log timestamp
    MessageCreate(msg)
});
client.on(Events.InteractionCreate, interaction =>{
    CommandDeploy(interaction)
});
client.login(token);