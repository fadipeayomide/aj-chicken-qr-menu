const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  tableNumber: { type: String, required: true, unique: true },
  restaurantId: String,
  qrData: String,
  qrImage: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QRCode', qrCodeSchema);