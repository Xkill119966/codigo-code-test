exports.generateOtp = (number = 6) => {
  let min = 1;
  let max = 10 ** number;
  let randomNumber = min + Math.random() * (max - min);
  return Math.floor(randomNumber);
};
