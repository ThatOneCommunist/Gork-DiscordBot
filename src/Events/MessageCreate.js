const { getRandomIntInclusive } = require('./randomValues.js');
const { generalPrompt } =  require('./prompts/generalPrompts.js');
const { questionprompts } = require('./prompts/questionPrompts.js');
const { specialPrompts , triggers } = require('./prompts/specialPrompts.js');
var botId = '<@1393814433473757255>'; // Easy way to check for if Gork is @ed
var jaxcount = 1
var userId = ""

// random message if he is @ed and asked is this true
function MessageCreate(msg){
    var userId = "<@"+msg.author.id+">";
    switch (true){
        // Question statement TODO: ADD MORE
        case(msg.content.toLowerCase().includes((botId+" is this true"))) || 
        (msg.content.toLowerCase().includes(botId+" is this fake")) || 
        (msg.content.toLowerCase().includes(botId+" is this false")) :
            msg.reply(questionprompts[getRandomIntInclusive(questionprompts)]);
            break;
        // WORDLE BOT TODO: ADD A REGEX DOES NOT WORK
        case(msg.content.includes(botId) && msg.content.toLowerCase().includes('wordle')):
            let wordInt = msg.content.replace(/[^1-6]/gis ,"");// Removes anything thats not a number
            Wordle(wordInt.replace('13314433435255',''),msg, userId);// Removes Gorks ID
            break;
        // Have @GORK above this case
        case(msg.content.includes(botId)):
            msg.reply(generalPrompt[getRandomIntInclusive(generalPrompt)]);
            break;
        // GORK MISPELL
        case(msg.content.includes("@hork") || msg.content.includes('@grok')):
            msg.reply("SAY MY NAME CORRECTLY")
            msg.react('😡')
            break;
        // Special Case
        case(msg.author.id != '1393814433473757255'):
            SpecialCaseSearch(triggers,specialPrompts,msg);
            break;
        // JAXSON SPAM
        case(msg.author.id.includes('890678553304244264')):
            msg.author.send("<@890678553304244264> "+jaxcount);
            jaxcount += 1;
            break;

    }
};



function Wordle(int,msg, userId){
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
            msg.reply(userId+"womp womp https://tenor.com/view/wordle-wordle-in5-wordle-in-five-wordle-meme-wordle-win-gif-24596089")
            break;
        case '6':
            msg.reply(userId+"Dont fall for dem trixs https://tenor.com/view/wordle-wordle-meme-wordle-in6-wordle-in-six-wordle-fail-gif-25053177")
            break;
        default:
            msg.reply("I have been programed to say "+userId+" failed in this instance https://tenor.com/view/wordle-wordle-challenging-wordle-fail-wordle-no-dictionary-wordle-hard-gif-24545672");
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

module.exports = {
    MessageCreate
}