client.on(Events.Error, error =>{
    console.log(error);
    client.users.send("746772138731765820", error);
});// May not work
message = `${msg.createdAt.getHours()}:${msg.createdAt.getMinutes()} ${msg.author.username} ${msg.content}`
if (msg.channelId!="1394019812015079495"){
    if(!msg.inGuild()){
        client.users.send("746772138731765820", message)};// Logs to my DM
        console.log(message);
    }
if(interaction.isChatInputCommand()){
    console.log(`${interaction.user.tag} used ${interaction.commandName} `)
}