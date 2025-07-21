const { generalPrompt } =  require('./prompts/generalPrompts.js');
const { questionprompts } = require('./prompts/questionPrompts.js');
const { specialPrompts , triggers } = require('./prompts/specialPrompts.js');
const { client } = require('./client.js');
const { botID, token, guildID } = require('./config.json')
const { Events, REST, Routes, Collection  } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
var botId = '<@1393814433473757255>'; // Easy way to check for if Gork is @ed
var jaxcount = 1
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
const commands = []

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
const rest = new REST().setToken(token);
// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${client.commands.size} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(botID, guildID),
			{ body: commands }
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

client.once('ready', (c)=> {
    console.log(c.user.displayName+' is gooning');
});

client.on(Events.InteractionCreate, interaction =>{
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName)

    switch (interaction.commandName) {
        case 'coinflip':
            command.execute(interaction)
            break;
    
        case 'ping':

    }

});

// random message if he is @ed and asked is this true
client.on(Events.MessageCreate, (msg)=>{
    console.log(msg.content);
    let userId = "<@"+msg.author+">"
    switch (true){
        // Question statement TODO: ADD MORE
        case(msg.content.toLowerCase().includes((botId+" is this true"))) || 
        (msg.content.toLowerCase().includes(botId+" is this fake")) || 
        (msg.content.toLowerCase().includes(botId+" is this false")) :
            msg.reply(questionprompts[Math.floor(Math.random()*questionprompts.length)]);
            break;
        // WORDLE BOT TODO: ADD A REGEX DOES NOT WORK
        case(msg.content.includes(botId) && msg.content.toLowerCase().includes('wordle')):
            let wordInt = msg.content.replace(/[^1-6]/gis ,"");// Removes anything thats not a number
            Wordle(wordInt.replace('13314433435255',''),msg);// Removes Gorks ID
            break;
        // Have @GORK above this case
        case(msg.content.includes(botId)):
            msg.reply(generalPrompt[Math.floor(Math.random()*generalPrompt.length)]);
            break;
        // GORK MISPELL
        case(msg.content.includes("@hork") || msg.content.includes('@grok')):
            msg.reply("SAY MY NAME CORRECTLY")
            msg.react('😡')
            break;
        // JAXSON SPAM
        case(msg.author.id.includes('890678553304244264')):
            msg.author.send("<@890678553304244264> "+jaxcount);
            jaxcount += 1;
            break;
        default:
            if (msg.author.id != '1393814433473757255'){
                SpecialCaseSearch(triggers,specialPrompts,msg);
            }
            break;
    }
});

client.on(Events.MessageReactionAdd, (react)=>{
    console.log(react.emoji.name);
    switch (react.emoji.name){
        case("🫃"):
        react.message.react("🫃")
        break;
        case("🤯"):
        react.message.reply("https://tenor.com/view/mike-wazowski-mike-pog-pog-gif-154717314566640477");
    }
});

function Wordle(int,msg){
    switch (int){
        case '1':
            msg.reply(userId+" cheated")
            break;
        case '2':
            msg.reply(userId+" Thats How we do https://tenor.com/view/wordle-wordle-win-wordle-in2-wordle-in-two-wordle-easy-gif-24546309")
            break;
        case '3':
            msg.reply("Don't Hate on"+userId+"https://tenor.com/view/wordle-wordle-in3-wordle-in-three-worlde-easy-wordle-win-gif-24560879")
            break;
        case '4':
            msg.reply("here "+userId+"ROAR :wolf: https://tenor.com/view/wordle-wordle-in-four-wordle-in4-wordle-win-gif-24571752")
            break;
        case '5':
            msg.reply("womp womp https://tenor.com/view/wordle-wordle-in5-wordle-in-five-wordle-meme-wordle-win-gif-24596089")
            break;
        case '6':
            msg.reply(userId+"Dont fall for dem trixs https://tenor.com/view/wordle-wordle-meme-wordle-in6-wordle-in-six-wordle-fail-gif-25053177")
            break;
        default:
            msg.reply("I have been programed to say you failed in this instance https://tenor.com/view/wordle-wordle-challenging-wordle-fail-wordle-no-dictionary-wordle-hard-gif-24545672");
            break;
    }
}

// Searches if the message contains the trigger 
function SpecialCaseSearch(trigger,prompt,msg){
    for (let i = 0; i<trigger.length; i++){
        if (msg.content.toLowerCase().includes(trigger[i])){
            msg.reply(prompt[i]);
        }
    }
}

client.login(token);