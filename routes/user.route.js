const express = require("express");
const memberController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/qrcode", verifyToken, memberController.generateQR);
router.get("/purchase_histories", verifyToken, memberController.purchaseHistory);


module.exports = router;
