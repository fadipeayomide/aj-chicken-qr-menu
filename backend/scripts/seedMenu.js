require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');

const seedMenu = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aj-chicken-qr-menu');
    console.log('Connected to MongoDB');

    // Clear existing items
    await MenuItem.deleteMany({});

    const menuItems = [
      { name: 'Fried Chicken', description: 'Crispy fried chicken', price: 3500, category: 'Chicken', emoji: '🍗' },
      { name: 'Grilled Chicken', description: 'Juicy grilled chicken', price: 4000, category: 'Chicken', emoji: '🔥' },
      { name: 'Chicken Shawarma', description: 'Spicy chicken wrap', price: 2500, category: 'Wraps', emoji: '🌯' },
      { name: 'Fries', description: 'Golden crispy fries', price: 1500, category: 'Sides', emoji: '🍟' },
      { name: 'Coleslaw', description: 'Fresh coleslaw', price: 1000, category: 'Sides', emoji: '🥗' },
      { name: 'Chicken Pizza', description: 'Cheesy chicken pizza', price: 3000, category: 'Pizza', emoji: '🍕' },
      { name: 'Pepsi', description: 'Cold refreshing drink', price: 500, category: 'Drinks', emoji: '🥤' },
      { name: 'Sprite', description: 'Lemon-lime soda', price: 500, category: 'Drinks', emoji: '🥤' },
    ];

    await MenuItem.insertMany(menuItems);
    console.log('Menu items seeded successfully');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding menu:', error);
    process.exit(1);
  }
};

seedMenu();