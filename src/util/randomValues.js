function getRandomIntInclusive(max) {
  const randomBuffer = new Uint32Array(1);

  self.crypto.getRandomValues(randomBuffer);

  let randomNumber = randomBuffer[0] / (0xffffffff + 1);

  min = Math.ceil(0);
  max = Math.floor(max);
  return Math.floor(randomNumber * (max - min + 1)) + min;
}
module.exports = {
  getRandomIntInclusive,
};
