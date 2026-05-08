const express = require('express');
const router = express.Router();
const QRCode = require('../models/QRCode');
const { verifyToken } = require('../middleware/auth');
const QRCodeLib = require('qrcode');

// Generate QR code
router.post('/generate', verifyToken, async (req, res) => {
  try {
    const { tableNumber, restaurantId } = req.body;
    const qrData = `${process.env.NEXT_PUBLIC_API_URL}/menu?table=${tableNumber}`;
    
    const qrCode = await QRCodeLib.toDataURL(qrData);
    
    const newQR = new QRCode({
      tableNumber,
      restaurantId,
      qrData,
      qrImage: qrCode,
    });
    
    await newQR.save();
    res.status(201).json(newQR);
  } catch (error) {
    res.status(500).json({ message: 'Error generating QR code', error });
  }
});

// Get all QR codes (admin)
router.get('/', verifyToken, async (req, res) => {
  try {
    const qrCodes = await QRCode.find();
    res.json(qrCodes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching QR codes', error });
  }
});

// Get QR code by table number
router.get('/table/:tableNumber', async (req, res) => {
  try {
    const qr = await QRCode.findOne({ tableNumber: req.params.tableNumber });
    if (!qr) return res.status(404).json({ message: 'QR code not found' });
    res.json(qr);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching QR code', error });
  }
});

// Delete QR code
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await QRCode.findByIdAndDelete(req.params.id);
    res.json({ message: 'QR code deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting QR code', error });
  }
});

module.exports = router;