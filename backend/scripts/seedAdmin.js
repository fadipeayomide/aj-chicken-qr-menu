require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aj-chicken-qr-menu');
    console.log('Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: 'admin@ajchicken.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      await mongoose.disconnect();
      return;
    }

    // Create default admin
    const admin = new Admin({
      email: 'admin@ajchicken.com',
      password: 'Admin@123',
      name: 'AJ Chicken Admin',
      restaurantId: 'aj-chicken-main',
    });

    await admin.save();
    console.log('Admin created successfully');
    console.log('Email: admin@ajchicken.com');
    console.log('Password: Admin@123');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();