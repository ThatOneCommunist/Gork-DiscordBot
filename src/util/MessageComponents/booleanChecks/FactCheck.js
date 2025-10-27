function FactCheck(msg, botId) {
  return (
    msg.includes(botId) &&
    (msg.includes("fake") || msg.includes("false") || msg.includes("true"))
  );
}
module.exports = {
  FactCheck,
};
