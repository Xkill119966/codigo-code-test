const jwtService = require("../services/jwt");
const redisInstance = require("../config/redis");
module.exports = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    token = token.split(" ")[1];
    const jwtDecoded = await jwtService.verify(token);
    const redisClient = await redisInstance.getInstance();
    const redisToken = await redisClient.get(
      `user_session:${jwtDecoded.phoneNumber}`
    );
    if (redisToken !== token) {
      return res
        .status(401)
        .json({ message: "User logged in from another device" });
    }
    req.userPhoneNumber = jwtDecoded.phoneNumber;
    next();
  } catch (error) {
    next(error);
  }
};
