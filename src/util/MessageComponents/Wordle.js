function Wordle(int, userId) {
  switch (int) {
    case "1":
      return `<@${userId}> cheated`;
    case "2":
      return `<@${userId}>" Thats How we do https://tenor.com/view/wordle-wordle-win-wordle-in2-wordle-in-two-wordle-easy-gif-24546309`;
    case "3":
      if (
        userId.includes("663106262359080971") ||
        userId.includes("626531197484269578")
      ) {
        return `Hate on<@${userId}>https://tenor.com/view/wordle-wordle-in3-wordle-in-three-worlde-easy-wordle-win-gif-24560879`;
      } else {
        return `Don't Hate on<@${userId}>https://tenor.com/view/wordle-wordle-in3-wordle-in-three-worlde-easy-wordle-win-gif-24560879`;
      }
    case "4":
      return `here <@${userId}>ROAR :wolf: https://tenor.com/view/wordle-wordle-in-four-wordle-in4-wordle-win-gif-24571752`;
    case "5":
      return `<@${userId}> womp womp https://tenor.com/view/wordle-wordle-in5-wordle-in-five-wordle-meme-wordle-win-gif-24596089`;
    case "6":
      return `<@${userId}> Dont fall for dem trixs https://tenor.com/view/wordle-wordle-meme-wordle-in6-wordle-in-six-wordle-fail-gif-25053177`;
    default:
      return `I have been programed to say <@${userId}> failed in this instance https://tenor.com/view/wordle-wordle-challenging-wordle-fail-wordle-no-dictionary-wordle-hard-gif-24545672`;
  }
}
module.exports = { Wordle };
