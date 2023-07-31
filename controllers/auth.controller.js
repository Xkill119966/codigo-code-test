const jwtService = require("../services/jwt");
const helpers = require("../helpers");
const db = require("../models");
const redisInstance = require("../config/redis");
const { User, VerificationCode } = db;
class AuthController {
  async login(req, res, next) {
    try {
      const { phoneNumber } = req.body;
      const user = User.findOne({
        where: { phoneNumber },
      });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }
      const token = jwtService.generateToken({ phoneNumber }, "1d");
      user.token = token;
      user.save();
      const redisClient = await redisInstance.getInstance();
      await redisClient.set(`user_session:${phoneNumber}`, token);
      return res.json({
        success: true,
        message: "Login successfully",
        token,
      });
    } catch (error) {
      next(error);
    }
  }
  async register(req, res, next) {
    try {
      const { phoneNumber } = req.body;
      const isUser = await User.findOne({
        where: {
          phoneNumber,
        },
      });
      if (isUser) {
        return res.status(409).json({
          success: false,
          message: "The phone number has been registered",
        });
      }
      const otp = helpers.generateOtp();

      await VerificationCode.upsert({
        phoneNumber,
        code: otp,
      });

      return res.json({
        success: true,
        message: "OTP code sent successfully",
        data: otp,
      });
    } catch (error) {
      next(error);
    }
  }

  // verify the otp
  async verify(req, res, next) {
    try {
      const { phoneNumber, otp } = req.body;
      const verificationCode = await VerificationCode.findOne({
        where: { phoneNumber, code: otp },
      });
      if (!verificationCode) {
        return res
          .status(404)
          .json({ success: false, message: "Mobile number not found" });
      }
      const token = jwtService.generateToken({ phoneNumber }, "1d");

      await User.create({
        phoneNumber,
        refreshToken: token,
      });
      await verificationCode.destroy();
      const redisClient = await redisInstance.getInstance();
      await redisClient.set(`user_session:${phoneNumber}`, token);

      return res.json({
        success: true,
        message: "OTP code verified successfully",
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const token = req.headers["authorization"];

      if (!token) {
        return res.status(401).json({ message: "Token not provided" });
      }
      jwtService.verify(
        token.split(" ")[1],
        "your_secret_key",
        (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: "Invalid token" });
          }

          // Delete the user session token from Redis (logout)
          redisClient.del(`user_session:${decoded.user_id}`);

          res.json({ message: "Logout successful" });
        }
      );
    } catch (error) {
      next(error);
    }
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async hashOTP(otp) {
    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(otp, salt);
    return hashedOTP;
  }
}

module.exports = new AuthController();
