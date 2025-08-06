const { token } = require('./util/config.json');
const { client } = require('./util/client.js');
const { Events } = require('discord.js');
const { MessageReaction } = require('./Events/Reaction.js');
const { Ready } = require('./Events/Ready.js');
const { MessageCreate } = require('./Events/MessageCreate.js');
const { CommandDeploy } = require('./Events/Command.js');
const { AudioPlayerStatus, createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');

const player = createAudioPlayer({
    behaviors:{
        noSubscriber: NoSubscriberBehavior.Pause
    }
})


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
player.on(AudioPlayerStatus.Idle, () =>{
    player.stop();
});
client.login(token);