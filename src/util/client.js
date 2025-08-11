"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var discord_js_1 = require("discord.js");
exports.client = new discord_js_1.Client({
  intents: [
    discord_js_1.IntentsBitField.Flags.Guilds,
    discord_js_1.IntentsBitField.Flags.GuildMessages,
    discord_js_1.IntentsBitField.Flags.GuildMessageReactions,
    discord_js_1.IntentsBitField.Flags.MessageContent,
    discord_js_1.IntentsBitField.Flags.DirectMessages,
    discord_js_1.IntentsBitField.Flags.GuildMembers,
    discord_js_1.IntentsBitField.Flags.GuildVoiceStates,
    discord_js_1.IntentsBitField.Flags.GuildExpressions,
    discord_js_1.IntentsBitField.Flags.GuildIntegrations,
  ],
});
