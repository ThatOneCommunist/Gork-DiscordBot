const { token } = require('./util/config.json');
const { client } = require('./util/client.js');
const { Events } = require('discord.js');
const { MessageReaction } = require('./Events/Reaction.js');
const { Ready } = require('./Events/Ready.js');
const { MessageCreate } = require('./Events/MessageCreate.js');
const { CommandDeploy } = require('./Events/Command.js');

global.self = global;
Ready();
client.on(Events.MessageReactionAdd, react=>{
    MessageReaction(react);
});
client.on(Events.MessageCreate, msg =>{
    MessageCreate(msg);
});
client.on(Events.InteractionCreate, interaction =>{
    CommandDeploy(interaction)
});
client.login(token);