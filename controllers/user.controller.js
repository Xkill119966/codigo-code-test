const qrcode = require("qrcode");
const db = require("../models");
const { PurchaseHistories, User } = db;
class MemberController {
  async generateQR(req, res, next) {
    try {
      await PurchaseHistories.bulkCreate([
        {
          member_id: 1,
          purchase_date: new Date("2023-07-30"),
          total_amount: 100.0,
          items: JSON.stringify([
            { name: "Item 1", price: 50.0 },
            { name: "Item 2", price: 50.0 },
          ]),
        },
        // Add more default data as needed
      ]);
      const { userPhoneNumber } = req;
      const memberQRCodeData = {
        userPhoneNumber,
      };

      const qrCodeData = JSON.stringify(memberQRCodeData);

      const qrCode = await qrcode.toDataURL(qrCodeData);

      return res.json({
        success: true,
        message: "QR Code generate successfully",
        qrCode,
      });
    } catch (error) {
      next(error);
    }
  }

  async purchaseHistory(req, res, next) {
    try {
      const { userPhoneNumber } = req;
      const userPurchaseHistory = await User.findOne({
        where: {
          phoneNumber: userPhoneNumber,
        },
        include: ["purchase_histories"],
      });

      return res.status(200).json({
        success: true,
        message: "Get PurchaseHistory successfully",
        data: userPurchaseHistory,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MemberController();
