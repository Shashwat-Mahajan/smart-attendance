const crypto = require("crypto");
const QRCodeModel = require("../models/QrCode.js");

module.exports.generateDynamicQR = async (className, subject) => {
  const token = crypto.randomBytes(16).toString("hex");
  const expiresAt = new Date(Date.now() + 10 * 1000); // still 10 seconds

  const qrDoc = new QRCodeModel({ className, subject, token, expiresAt });
  await qrDoc.save();

  return { className, subject, token };
};

module.exports.validateToken = async (token) => {
  // Find token even if just expired — allow 5 second grace period
  // to account for network delay between scan and POST reaching backend.
  // The QR still rotates every 10s so security is maintained.
  const qr = await QRCodeModel.findOne({
    token,
    expiresAt: { $gt: new Date(Date.now() - 5000) }, // 5s grace only
  });

  if (!qr) {
    console.log("❌ Token not found or expired:", token);
    return null;
  }

  console.log("✅ Token valid:", qr.token, qr.className, qr.subject);
  return qr;
};
