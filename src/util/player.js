const { createAudioPlayer, NoSubscriberBehavior } = require("@discordjs/voice");

module.exports.player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
  },
});
